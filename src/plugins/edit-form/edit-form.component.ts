import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { EditFormView } from 'ng2-qgrid/plugin/edit-form/edit.form.view';
import { FormGroup } from '@angular/forms';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { ViewCoreService } from 'ng2-qgrid/main/core/view/view-core.service';
import { TdCoreDirective } from 'ng2-qgrid/main/core/body/td-core.directive';

@Component({
	selector: 'q-grid-edit-form',
	templateUrl: './edit-form.component.html'
})
export class EditFormComponent extends PluginComponent implements OnInit, OnDestroy {
	@Input() title: string;
	@Input() data: any;
	
	private columns: ColumnModel[];

	constructor( @Optional() root: RootService
		, public $view: ViewCoreService) {
		super(root);
	}

	ngOnInit() {
		console.log(this.data);
		const model = this.model;
		this.columns = model.data().columns;
	}

	ngOnDestroy() {

	}

	getKey(column: ColumnModel): string {
		return column.type ? `edit-form-${column.type}.tpl.html` : 'edit-form-default.tpl.html';
	}
}
