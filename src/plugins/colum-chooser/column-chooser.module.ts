import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TemplateModule} from 'ng2-qgrid/template';
import {FormsModule} from '@angular/forms';
import {ColumnChooserComponent} from './column-chooser.component';

@NgModule({
	imports: [BrowserModule, FormsModule, TemplateModule],
	exports: [ColumnChooserComponent],
	declarations: [ColumnChooserComponent]
})
export class ColumnChooserModule {
}
