import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModelComponent } from '../../../infrastructure/component/model.component';
import { RootService } from '../../../infrastructure/component/root.service';
import { TemplateHostService } from '../../../template/template-host.service';
import { Disposable } from '../../../infrastructure/disposable';

// @deprecated
@Component({
	selector: 'q-grid-row',
	template: '<ng-content></ng-content>',
	providers: [TemplateHostService, Disposable],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent extends ModelComponent {
	@Input('mode') rowMode: 'single' | 'multiple';
	@Input('unit') rowUnit: 'data' | 'details';
	@Input('canMove') rowCanMove: boolean;
	@Input('canResize') rowCanResize: boolean;
	@Input('height') rowHeight: number;

	constructor(
		root: RootService,
		templateHost: TemplateHostService,
		disposable: Disposable
	) {
		super(root, disposable);

		this.models = ['row'];
		templateHost.key = source => `body-cell-row-${source}.tpl.html`;
	}
}
