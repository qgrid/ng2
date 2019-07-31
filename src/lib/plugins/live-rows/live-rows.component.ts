import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PluginService } from '../plugin.service';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
import { jobLine } from 'ng2-qgrid/core/services/job.line';

@Component({
	selector: 'q-grid-live-rows',
	template: '<ng-content></ng-content>',
	providers: [PluginService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveRowsComponent implements OnInit {

	@Input('duration') duration: number;

	private currentRows: any[];
	private previousRows: any[];
	constructor(private plugin: PluginService) { }

	ngOnInit() {
		const { model } = this.plugin;
		model.animation({
			apply: (memo, context, complete) => {
				this.previousRows = this.currentRows;
				this.currentRows = memo.rows;
				const job = jobLine(this.duration);

				if (!this.previousRows || !this.currentRows) {
					complete(memo);
					return;
				}

				job(() => {
					for (let i = 0; i < this.previousRows.length; i++) {

						const row = model.data().id.row(i, this.previousRows[i]);
						const newRowIndex = this.currentRows.findIndex((x: number) => x === row);
						const rowIndex = this.previousRows.findIndex((x: number) => x === row);

						if (newRowIndex < 0) {
							this.fadeOutRow(rowIndex);
							continue;
						}
						if (newRowIndex !== rowIndex) {
							this.moveRow(rowIndex, newRowIndex);
						}
					}

					setTimeout(() => {
						complete(memo);
					}, this.duration);
				});
			}
		});
	}

	fadeOutRow(index: number) {
		const rowModel = this.plugin.table.body.row(index).model();
		if (!rowModel) {
			return;
		}
		rowModel.tr.element.animate([
			{ opacity: `1` },
			{ opacity: `0` }
		], { duration: this.duration });
	}

	moveRow(indexFrom: number, indexTo: number) {
		const tr = this.plugin.table.body.row(indexFrom);
		const newTr = this.plugin.table.body.row(indexTo);
		if (!tr.model() || !newTr.model()) {
			return;
		}
		tr.addClass(`${GRID_PREFIX}-live-row`);
		tr.model().tr.element.animate([
			{ transform: `translateY(0px)` },
			{ transform: `translateY(${newTr.rect().top - tr.rect().top}px)` }
		], { duration: this.duration, });

		setTimeout(() => {
			tr.removeClass(`${GRID_PREFIX}-live-row`);
		}, this.duration);
	}
}
