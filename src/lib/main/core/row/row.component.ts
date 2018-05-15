import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModelComponent } from 'ng2-qgrid/infrastructure/component/model.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { TemplateHostService } from 'ng2-qgrid/template/template-host.service';

@Component({
	selector: 'q-grid-row',
	template: '<ng-content></ng-content>',
	providers: [TemplateHostService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent extends ModelComponent {
	@Input('mode') public rowMode: string;
	@Input('unit') public rowUnit: string;
	@Input('canDrag') public rowCanDrag: boolean;
	@Input('canResize') public rowCanResize: boolean;

	constructor(root: RootService, templateHost: TemplateHostService) {
		super(root);

		this.models = ['row'];
		templateHost.key = source => `body-cell-row-${source}.tpl.html`;
	}
}
