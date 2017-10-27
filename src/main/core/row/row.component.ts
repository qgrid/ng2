import {Component, Input} from '@angular/core';
import {ModelComponent, RootService} from 'ng2-qgrid/infrastructure/component';
import {TemplateHostService} from 'ng2-qgrid/template/template-host.service';

@Component({
	selector: 'q-grid-row',
	template: '<ng-content></ng-content>',
	providers: [TemplateHostService]
})
export class RowComponent extends ModelComponent {
	@Input('mode') private rowMode: string;
	@Input('unit') private rowUnit: string;

	constructor(root: RootService, templateHost: TemplateHostService) {
		super(root);

		this.models = ['row'];
		templateHost.key = source => `body-cell-row-${source}.tpl.html`;
	}
}
