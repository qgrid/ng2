import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModelComponent } from '../../infrastructure/component/model.component';
import { RootService } from '../../infrastructure/component/root.service';
import { ColumnListService } from './column-list.service';
import { Disposable } from '../../infrastructure/disposable';

@Component({
	selector: 'q-grid-columns',
	template: '<ng-content></ng-content>',
	providers: [ColumnListService, Disposable],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnListComponent extends ModelComponent {
	@Input('generation') public columnListGeneration: string = null;

	constructor(root: RootService, disposable: Disposable) {
		super(root, disposable);

		this.models = ['columnList'];
	}
}
