import { Component, OnInit, Optional, ChangeDetectionStrategy } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { TemplateHostService } from 'ng2-qgrid/template/template-host.service';

@Component({
	selector: 'q-grid-legend',
	templateUrl: './legend.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TemplateHostService]
})
export class LegendComponent extends PluginComponent implements OnInit {
	constructor(@Optional() root: RootService, templateHost: TemplateHostService) {
		super(root);

		templateHost.key = () => `plugin-legend-core.tpl.html`;
	}
}
