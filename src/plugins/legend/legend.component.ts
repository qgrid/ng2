import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { LegendView } from 'ng2-qgrid/plugin/legend/legend.view';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { TemplateHostService } from 'ng2-qgrid/template/template-host.service';

@Component({
	selector: 'q-grid-legend',
	templateUrl: './legend.component.html'
})
export class LegendComponent extends PluginComponent implements OnInit, OnDestroy {

	private legend: LegendView;

	constructor(@Optional() root: RootService) {
		super(root);

		this.models = ['legend'];
	}

	ngOnInit() {
		this.context = {$implicit: this.legend};
		this.legend = new LegendView(this.model);
	}

	ngOnDestroy() {
		this.legend.dispose();
	}
}
