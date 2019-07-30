import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { GridModel } from '../../plugins/plugin.service';
import { PluginService } from '../plugin.service';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
@Component({
	selector: 'q-grid-live-rows',
	template: '<ng-content></ng-content>',
	providers: [PluginService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveRowsComponent implements OnInit {

	@Input('duration') duration = 1000;

	model: GridModel;
	currentValues = [];
	previousValues = [];
	isAnimating = false;

	constructor(private plugin: PluginService) {}

	ngOnInit() {

		const { model } = this.plugin;

		model.animation({
			apply: (memo, context, complete) => {

				this.previousValues = this.currentValues || [];
				this.currentValues = memo.rows;

				if (!this.previousValues.length || !this.currentValues.length || this.isAnimating) {
					complete(memo);
					return;
				}

				this.isAnimating = true;

				for (const i in this.previousValues) {
					if (!this.previousValues[i]) {
						continue;
					}

					const rowId = model.data().id.row(+i, this.previousValues[i]);
					const newRowIndex = this.currentValues.findIndex((x: number) => x === rowId);

					if (newRowIndex < 0) {
						const rowIndex = this.previousValues.findIndex((x: number) => x === rowId);
						this.fadeOutRow(rowIndex);
						continue;
					}
				}

				for (const i in this.currentValues) {
					if (!this.currentValues[i]) {
						continue;
					}
					const rowId = model.data().id.row(+i, this.currentValues[i]);

					const rowIndex = this.previousValues.findIndex((x: number) => x === rowId);
					const newRowIndex = this.currentValues.findIndex((x: number) => x === rowId);
					if (newRowIndex >= 0 && rowIndex !== newRowIndex) {
						this.switchRows(rowIndex, newRowIndex);
					}
				}

				setTimeout(() => {
					this.isAnimating = false;
					complete(memo);
				}, this.duration);
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

	switchRows(indexFrom: number, indexTo: number) {
		const trOld = this.plugin.table.body.row(indexFrom);
		const trNew = this.plugin.table.body.row(indexTo);
		if (!trOld.model()) {
			return;
		}

		trOld.addClass(`${GRID_PREFIX}-live-row`);
		trOld.model().tr.element.animate([
			{ transform: `translateY(0px)` },
			{ transform: `translateY(${trNew.rect().top - trOld.rect().top}px)` }
		], { duration: this.duration, });

		setTimeout(() => {
			trOld.removeClass(`${GRID_PREFIX}-live-row`);
		}, this.duration);
	}
}
