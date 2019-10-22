import { Component, OnInit, Input, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { PluginService } from '../plugin.service';
import { Fastdom } from '../../../core/services/fastdom';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';

@Component({
	selector: 'q-grid-live-column',
	template: '<ng-content></ng-content>',
	providers: [PluginService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveColumnComponent implements OnInit {
	private startPos: number;
	private endPos: number;
	@Input('duration') duration = 200;

	constructor(private plugin: PluginService, private zone: NgZone) { }

	ngOnInit() {
		const { model } = this.plugin;
		let currentColumns: any[];

		model.animation({
			apply: model.animation().apply.concat((memo, context, complete) => {
				const previousColumns = currentColumns;
				currentColumns = memo.columns ? memo.columns[0] : currentColumns;

				if (!previousColumns || !memo.columns) {
					complete();
					return;
				}

				const id = model.data().id.column;
				const animations = [];

				this.startPos = currentColumns.length;
				this.endPos = 0;

				for (let colId = 0, length = previousColumns.length; colId < length; colId++) {
					const newColId = currentColumns.findIndex((col, i) => id(i, col.model) === id(colId, previousColumns[colId].model));
					if (newColId !== colId) {
						this.startPos = Math.min(Math.min(colId, newColId), this.startPos);
						this.endPos = Math.max(Math.max(colId, newColId), this.endPos);
					}
				}

				for (let colId = 0, length = previousColumns.length; colId < length; colId++) {
					const newColId = currentColumns.findIndex((col, i) => id(i, col.model) === id(colId, previousColumns[colId].model));

					if (newColId !== colId) {
						animations.push(this.moveColumn(colId, newColId));
					}
				}

				this.zone.runOutsideAngular(() => {
					Promise.all(animations)
						.then(complete);
				});
			})
		});
	}

	moveColumn(from: number, to: number) {
		const { table } = this.plugin;

		return new Promise((resolve, reject) => {
			const oldColumn = table.body.column(from);
			const newColumn = table.body.column(to);
			const startColumn = table.body.column(this.startPos);
			const endColumn = table.body.column(this.endPos);

			if (!oldColumn.model() || !newColumn.model()) {
				const errorIndex = oldColumn.model() ? to : from;
				reject(`Can't find model for column ${errorIndex}`);
				return;
			}

			Fastdom.measure(() => {
				const newRect = newColumn.cells()[0].rect();
				const oldRect = oldColumn.cells()[0].rect();
				const startRect = startColumn.cells()[0].rect();
				const endRect = endColumn.cells()[0].rect();
				let offset = 0;

				if (from < to) {
					if (Math.abs(from - to) > 1) {
						offset = newRect.left - oldRect.right + endRect.width;
					} else { offset = endRect.width; }
				} else {
					if (Math.abs(from - to) > 1) {
						offset = newRect.left - oldRect.left;
					} else { offset = -1 * startRect.width; }
				}

				Fastdom.mutate(() => {
					const animatedCells = [];
					oldColumn.addClass(`${GRID_PREFIX}-live-column`);
					oldColumn.cells().forEach(cell => animatedCells.push(
						new Promise(res => {
							const animation = cell.model().element.animate([
								{ transform: `translateX(0px)` },
								{ transform: `translateX(${offset}px)` }],
								{ duration: this.duration }
							);

							animation.onfinish = () => Fastdom.mutate(() => {
								oldColumn.removeClass(`${GRID_PREFIX}-live-column`);
								oldColumn.removeClass(`${GRID_PREFIX}-drag`);
								res();
							});
						})));

					Promise.all(animatedCells).finally(() => resolve());
				});
			});
		});
	}
}
