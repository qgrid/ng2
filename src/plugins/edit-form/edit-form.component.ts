import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { RootService } from '../../infrastructure/component/index';
import { PluginComponent } from '../plugin.component';
import { EditFormView } from 'ng2-qgrid/plugin/edit-form/edit.form.view';
import { FormGroup } from '@angular/forms';
import { ViewCoreService } from 'ng2-qgrid/main';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';

@Component({
    selector: 'q-grid-edit-form',
    templateUrl: './edit-form.component.html'
})
export class EditFormComponent extends PluginComponent implements OnInit, OnDestroy {
    @Input() title: string;

    private columns: ColumnModel[];

    constructor( @Optional() root: RootService) {
        super(root);
    }

    ngOnInit() {
        const model = this.model;
        this.columns = model.data().columns;
        this.context.$implicit["getKey"] = (column: ColumnModel) => {
            return column.type ? `edit-form-${column.type}.tpl.html` : 'edit-form-default.tpl.html';
        } 
    }

    ngOnDestroy() {

    }
}
