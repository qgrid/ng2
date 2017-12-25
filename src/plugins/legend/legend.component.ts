import { Component, OnInit, Optional } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@Component({
	selector: 'q-grid-legend-core',
	templateUrl: './legend.component.html'
})
export class LegendComponent extends PluginComponent implements OnInit {

	constructor(@Optional() root: RootService) {
		super(root);

		this.models = ['legend'];
	}

	ngOnInit() {}
}
