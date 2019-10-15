import { Component, OnInit, Input, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { PluginService } from '../plugin.service';
import { Fastdom } from 'ng2-qgrid/core/services/fastdom';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';

@Component({
	selector: 'q-grid-live-rows',
	template: '<ng-content></ng-content>',
	providers: [PluginService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveRowComponent implements OnInit {
	private currentRows: any[];

	@Input('duration') duration = 200;

	constructor(private plugin: PluginService, private zone: NgZone) { }

	ngOnInit() {
		const { model } = this.plugin;
		model.animation().apply.push((memo, context, complete) => {
			const previousRows = this.currentRows;
			const currentRows = memo.rows ? memo.rows : this.currentRows;
			this.currentRows = currentRows;

			if (!previousRows || !currentRows) {
				complete();
				return;
			}

			this.zone.runOutsideAngular(() => {
				const id = model.data().id.row;
				const animations = [];

				for (let rowId = 0, length = previousRows.length; rowId < length; rowId++) {
					const newRowId = currentRows.findIndex((row, i) => id(i, row) === id(rowId, previousRows[rowId]));
					if (newRowId < 0) {
						animations.push(this.fadeOutRow(rowId));
					} else if (newRowId !== rowId) {
						animations.push(this.moveRow(rowId, newRowId));
					}
				}

				Promise.all(animations)
					.then(complete);
			});
		});
	}

	fadeOutRow(index: number) {
		return new Promise((resolve, reject) => {
			const tr = this.plugin.table.body.row(index);
			if (!tr.model()) {
				reject(`Can't find model for row ${index}`);
				return;
			}

			Fastdom.mutate(() => {
				const animation = tr.model().tr.element.animate([
					{ opacity: `1` },
					{ opacity: `0` }],
					{ duration: this.duration }
				);

				animation.onfinish = () => resolve();
			});
		});
	}

	moveRow(from: number, to: number) {
		return new Promise((resolve, reject) => {
			const oldTr = this.plugin.table.body.row(from);
			const newTr = this.plugin.table.body.row(to);

			if (!oldTr.model() || !newTr.model()) {
				const errorIndex = oldTr.model() ? to : from;
				reject(`Can't find model for row ${errorIndex}`);
				return;
			}

			Fastdom.measure(() => {
				const offset = newTr.rect().top - oldTr.rect().top;

				Fastdom.mutate(() => {
					const animatedRows = [];
					oldTr.addClass(`${GRID_PREFIX}-live-row`);
					(oldTr.getElement() as any).elements.forEach(rowElement => animatedRows.push(
						new Promise(res => {
							const animation = rowElement.animate([
								{ transform: `translateY(0px)` },
								{ transform: `translateY(${offset}px)` }],
								{ duration: this.duration }
							);

							animation.onfinish = () => Fastdom.mutate(() => {
								oldTr.removeClass(`${GRID_PREFIX}-live-row`);
								oldTr.removeClass(`${GRID_PREFIX}-drag`);
								res();
							});
						})));

					Promise.all(animatedRows).finally(() => resolve());
				});
			});
		});
	}
}
