import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModelComponent } from '../../infrastructure/component/model.component';
import { RootService } from '../../infrastructure/component/root.service';
import { ColumnListService } from './column-list.service';
import { ColumnService } from './column.service';

@Component({
	selector: 'q-grid-columns',
	template: '<ng-content></ng-content>',
	providers: [ColumnListService, ColumnService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnListComponent extends ModelComponent {
	@Input('generation') public columnListGeneration: string = null;

	constructor(root: RootService, columnService: ColumnService) {
		super(root);

		columnService.parent = null;
		this.models = ['columnList'];
	}
}
