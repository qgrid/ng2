import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TemplateModule} from 'ng2-qgrid/template';
import {FormsModule} from '@angular/forms';
import {ColumnChooserComponent} from './column-chooser.component';
import { Model } from 'ng2-qgrid/core/infrastructure/model';

import {ColumnChooserModel} from './column-chooser.model';

Model.register('columnChooser', ColumnChooserModel);

@NgModule({
	imports: [BrowserModule, FormsModule, TemplateModule],
	exports: [ColumnChooserComponent],
	declarations: [ColumnChooserComponent],
	providers: [],
})
export class ColumnChooserModule {
}
