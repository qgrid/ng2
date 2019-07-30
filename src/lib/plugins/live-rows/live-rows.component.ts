import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { GridModel } from '../../plugins/plugin.service';
import { TemplateHostService } from '../../template/template-host.service';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-live-rows',
	template: '<ng-content></ng-content>',
	styleUrls: ['live-rows.component.scss'],
	providers: [
		TemplateHostService,
		PluginService
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveRowsComponent implements OnInit {
	@Input('trackBy') trackBy = 'id';
	@Input('duration') duration = 1000;

	model: GridModel;
	currentValues = [];
	previousValues = [];
	isAnimating = false;

	constructor(private plugin: PluginService) {
	}

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

				for (const row of this.previousValues) {
					const newRowIndex = this.currentValues.findIndex((x: number) => x[this.trackBy] === row[this.trackBy]);

					if ( newRowIndex < 0 ) {
						const rowIndex = this.previousValues.findIndex((x: number) => x[this.trackBy] === row[this.trackBy]);
						this.fadeOutRow(rowIndex);
						continue;
					}
				}

				for (const row of this.currentValues) {

					const rowIndex = this.previousValues.findIndex((x: number) => x[this.trackBy] === row[this.trackBy]);
					const newRowIndex = this.currentValues.findIndex((x: number) => x[this.trackBy] === row[this.trackBy]);

					if (newRowIndex >= 0 && rowIndex !== newRowIndex) {
						this.switchRows(rowIndex, newRowIndex);
					}
				}

				setTimeout(() => {
					this.isAnimating = false;
					complete(memo);
				}, this.duration );
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
		], {
			duration: this.duration
		});
	}

	switchRows(indexFrom: number, indexTo: number) {
		const trOld = this.plugin.table.body.row(indexFrom);
		const trNew = this.plugin.table.body.row(indexTo);

		if (!trOld.model()) {
			return;
		}

		trOld.addClass('q-grid-live-row');

		trOld.model().tr.element.animate([
			{ transform: `translateY(0px)` },
			{ transform: `translateY(${trNew.rect().top - trOld.rect().top}px)` }
		], {
			duration: this.duration,
		});

		setTimeout(() => {
			trOld.removeClass('q-grid-live-row');
		}, this.duration );
	}
}
