import {Component, Input} from '@angular/core';
import {ModelComponent} from 'ng2-qgrid/infrastructure/component/model.component';
import {RootService} from 'ng2-qgrid/infrastructure/component/root.service';
import {ColumnListService} from './column-list.service';

@Component({
	selector: 'q-grid-columns',
	template: '<ng-content></ng-content>',
	providers: [ColumnListService]
})
export class ColumnListComponent extends ModelComponent {
	@Input('generation') public columnListGeneration: string = null;

	constructor(root: RootService) {
		super(root);

		this.models = ['columnList'];
	}
}
