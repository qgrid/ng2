import { NgModule } from '@angular/core';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { FormsModule } from '@angular/forms';
import { ColumnChooserComponent } from './column-chooser.component';

@NgModule({
	imports: [FormsModule, TemplateModule],
	exports: [ColumnChooserComponent],
	declarations: [ColumnChooserComponent]
})
export class ColumnChooserModule {
}
