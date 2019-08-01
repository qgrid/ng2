import { Component, OnInit, Input, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { PluginService } from '../plugin.service';
import { Fastdom } from '../../../core/services/fastdom';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';

@Component({
	selector: 'q-grid-live-rows',
	template: '<ng-content></ng-content>',
	providers: [PluginService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveRowComponent implements OnInit {
	private currentRows: any[];
	private animations = [];

	@Input('duration') duration: number;

	constructor(private plugin: PluginService, private zone: NgZone) { }

	ngOnInit() {
		const { model } = this.plugin;
		model.animation({
			apply: (memo, context, complete) => {

				if (!this.currentRows || !memo.rows) {
					this.currentRows = memo.rows;
					complete(memo);
					return;
				}
				this.zone.runOutsideAngular(() => {
					for (let rowIndex = 0, length = this.currentRows.length; rowIndex < length; rowIndex++) {
						const oldRow = model.data().id.row(rowIndex, this.currentRows[rowIndex]);
						const newRowIndex = memo.rows.findIndex((x: number) => x === oldRow);

						if (newRowIndex < 0) {
							this.animations.push( this.fadeOutRow(rowIndex) );
							continue;
						}
						if (newRowIndex !== rowIndex) {
							this.animations.push( this.moveRow(rowIndex, newRowIndex) );
						}
					}
					Promise.all(this.animations)
					.then(() => complete(memo));
				});
				this.currentRows = memo.rows;
			}
		});
	}

	fadeOutRow(index: number) {
		return new Promise( (resolve, reject) => {
			const rowModel = this.plugin.table.body.row(index).model();
			if (!rowModel) {
				reject(`Can't find model for row ${index}`);
			}

			Fastdom.mutate(() => {
				rowModel.tr.element.animate([
					{ opacity: `1` },
					{ opacity: `0` }],
					{ duration: this.duration }
				).onfinish = () => resolve();
			});
		});
	}

	moveRow(from: number, to: number) {
		return new Promise( (resolve, reject) => {
			const oldTr = this.plugin.table.body.row(from);
			const newTr = this.plugin.table.body.row(to);
			if (!oldTr.model() || !newTr.model()) {
				const errorIndex = oldTr.model() ? to : from;
				reject(`Can't find model for row ${errorIndex}`);
			}

			Fastdom.measure(() => {
				const offset = newTr.rect().top - oldTr.rect().top;

				Fastdom.mutate(() => {
					oldTr.addClass(`${GRID_PREFIX}-live-row`);
					oldTr.model().tr.element.animate([
						{ transform: `translateY(0px)` },
						{ transform: `translateY(${offset}px)` }],
						{ duration: this.duration}
					).onfinish = () => Fastdom.mutate(() => {
						oldTr.removeClass(`${GRID_PREFIX}-live-row`);
						resolve();
					});
				});
			});
		});
	}
}
