import { Component, OnInit, Optional, ChangeDetectionStrategy } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@Component({
	selector: 'q-grid-legend',
	templateUrl: './legend.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendComponent extends PluginComponent implements OnInit {
	constructor(@Optional() root: RootService) {
		super(root);

		this.models = ['legend'];
	}
}
