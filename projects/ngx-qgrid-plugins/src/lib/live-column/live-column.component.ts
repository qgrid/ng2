import { Component, OnInit, Input, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';
import { Fastdom } from '@qgrid/core/services/fastdom';
import { GRID_PREFIX } from '@qgrid/core/definition';

@Component({
	selector: 'q-grid-live-columns',
	template: '',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveColumnComponent implements OnInit {
	@Input('duration') duration = 100;

	constructor(private plugin: GridPlugin, private zone: NgZone) { }

	ngOnInit() {
		let startPos: number;
		let endPos: number;
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

				startPos = currentColumns.length;
				endPos = 0;

				for (let columnIndex = 0, length = previousColumns.length; columnIndex < length; columnIndex++) {
					const newColumnIndex = currentColumns.findIndex((column, i) =>
						id(i, column.model) === id(columnIndex, previousColumns[columnIndex].model));

					if (newColumnIndex !== columnIndex) {
						startPos = Math.min(Math.min(columnIndex, newColumnIndex), startPos);
						endPos = Math.max(Math.max(columnIndex, newColumnIndex), endPos);
					}
				}

				for (let columnIndex = 0, length = previousColumns.length; columnIndex < length; columnIndex++) {
					const newColumnIndex = currentColumns.findIndex((column, i) =>
						id(i, column.model) === id(columnIndex, previousColumns[columnIndex].model));

					if (newColumnIndex !== columnIndex) {
						animations.push(this.moveColumn(columnIndex, newColumnIndex, startPos, endPos));
					}
				}

				this.zone.runOutsideAngular(() => {
					Promise.all(animations)
						.then(complete);
				});
			})
		});
	}

	private moveColumn(from: number, to: number, startPos: number, endPos: number) {
		const { table } = this.plugin;

		return new Promise((resolve, reject) => {
			const oldColumn = table.body.column(from);
			const newColumn = table.body.column(to);
			const startColumn = table.body.column(startPos);
			const endColumn = table.body.column(endPos);

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
					offset = (Math.abs(from - to) > 1) ? newRect.left - oldRect.right + endRect.width : endRect.width;
				} else {
					offset = (Math.abs(from - to) > 1) ? newRect.left - oldRect.left : -1 * startRect.width;
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
