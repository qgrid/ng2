import { Component, OnInit, Input, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';
import { Fastdom } from '@qgrid/core/services/fastdom';
import { GRID_PREFIX } from '@qgrid/core/definition';

@Component({
	selector: 'q-grid-live-rows',
	template: '',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveRowComponent implements OnInit {
	@Input('duration') duration = 100;

	constructor(private plugin: GridPlugin, private zone: NgZone) { }

	ngOnInit() {
		const { model } = this.plugin;
		let currentRows: any[];

		model.animation({
			apply: model.animation().apply.concat((memo, context, complete) => {
				const previousRows = currentRows;
				currentRows = memo.rows ? memo.rows : currentRows;

				if (!previousRows || !currentRows) {
					complete();
					return;
				}

				const id = model.data().id.row;
				const animations = [];

				for (let rowIndex = 0, length = previousRows.length; rowIndex < length; rowIndex++) {
					const newRowIndex = currentRows.findIndex((row, i) => id(i, row) === id(rowIndex, previousRows[rowIndex]));
					if (newRowIndex < 0) {
						animations.push(this.fadeOutRow(rowIndex));
					} else if (newRowIndex !== rowIndex) {
						animations.push(this.moveRow(rowIndex, newRowIndex));
					}
				}

				this.zone.runOutsideAngular(() => {
					Promise.all(animations)
						.then(complete);
				});
			})
		});
	}

	private fadeOutRow(index: number) {
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

	private moveRow(from: number, to: number) {
		const { table } = this.plugin;

		return new Promise((resolve, reject) => {
			const oldTr = table.body.row(from);
			const newTr = table.body.row(to);

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
