import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModelComponent } from '../../infrastructure/component/model.component';
import { RootService } from '../../infrastructure/component/root.service';
import { ColumnListService } from './column-list.service';

@Component({
	selector: 'q-grid-columns',
	template: '<ng-content></ng-content>',
	providers: [ColumnListService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnListComponent extends ModelComponent {
	@Input('generation') public columnListGeneration: string = null;

	constructor(root: RootService) {
		super(root);

		this.models = ['columnList'];
	}
}
