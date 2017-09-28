import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TemplateModule} from 'ng2-qgrid/template';
import {FormsModule} from '@angular/forms';
import {ColumnChooserComponent} from './column-chooser.component';
import { Model } from 'ng2-qgrid/core/infrastructure/model';

import {ColumnChooserModel} from './column-chooser.model';

import {
	MdIconModule,
	MdButtonModule,
	MdCheckboxModule,
	MdSelectModule,
	MdTooltipModule,
	MdProgressBarModule,
	MdInputModule,
	MdDatepickerModule,
	MdNativeDateModule,
	MdChipsModule
} from '@angular/material';

Model.register('columnChooser', ColumnChooserModel);

@NgModule({
	imports: [BrowserModule, FormsModule, TemplateModule, MdCheckboxModule, MdSelectModule],
	exports: [ColumnChooserComponent],
	declarations: [ColumnChooserComponent],
	providers: [],
})
export class ColumnChooserModule {
}
