import { Component, Optional, Input, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { EditFormView } from 'ng2-qgrid/plugin/edit-form/edit.form.view';
import { FormGroup } from '@angular/forms';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { ViewCoreService } from 'ng2-qgrid/main/core/view/view-core.service';

@Component({
	selector: 'q-grid-edit-form-control',
	templateUrl: './edit-form-control.component.html'
})

export class EditFormControlComponent extends PluginComponent implements OnInit {
	@Input() column: ColumnModel;
	@Input() control: any;
	@Input() key: string;

	public $view: ViewCoreService;
	
	constructor( @Optional() root: RootService) {
		super(root);
	}

	ngOnInit() {
		this.$view = this.control.$view;

		//const link = this.cellService.build('form', this.column, 'edit');
		//link(this.viewContainerRef, this);
	}
}
