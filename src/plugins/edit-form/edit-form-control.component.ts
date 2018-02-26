import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { RootService } from '../../infrastructure/component/index';
import { PluginComponent } from '../plugin.component';
import { EditFormView } from 'ng2-qgrid/plugin/edit-form/edit.form.view';
import { FormGroup } from '@angular/forms';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { ViewCoreService } from 'ng2-qgrid/main';

@Component({
	selector: 'q-grid-edit-form-control',
	templateUrl: './edit-form-control.component.html'
})
export class EditFormControlComponent extends PluginComponent implements OnInit, OnDestroy {
    @Input() column: ColumnModel;
	@Input() key: string;

	constructor( @Optional() root: RootService) {
		super(root);
	}

	ngOnInit() {
        console.log(this.context);
    }

	ngOnDestroy() {
		
	}
}
