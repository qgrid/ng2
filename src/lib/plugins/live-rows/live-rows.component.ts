import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { GridModel } from '../../plugins/plugin.service';
import { TemplateHostService } from '../../template/template-host.service';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-live-rows',
	template: '<ng-content></ng-content>',
	providers: [
		TemplateHostService,
		PluginService
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveRowsComponent implements OnInit {
	@Input('trackBy') trackBy = 'id';
	@Input('duration') duration = 2500;

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

				for (const row of this.currentValues) {
					const rowIndex = this.previousValues.findIndex((x: number) => x[this.trackBy] === row[this.trackBy]);
					const newRowIndex = this.currentValues.findIndex((x: number) => x[this.trackBy] === row[this.trackBy]);

					if (newRowIndex >= 0 && rowIndex !== newRowIndex) {

						const trOld = this.plugin.table.body.row(rowIndex);
						const trNew = this.plugin.table.body.row(newRowIndex);

						if (!trOld.model()) {
							continue;
						}

						trOld.model().tr.element.animate([
							{ transform: `translateY(0px)` },
							{ transform: `translateY(${trNew.rect().top - trOld.rect().top}px)` }
						], {
							duration: this.duration,
						});
					}
				}

				setTimeout(() => {
					this.isAnimating = false;
					complete(memo);
				}, this.duration );
			}
		});
	}
}
