import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColumnChooserComponent } from './column-chooser.component';
import { TemplateModule } from 'ngx-qgrid';

@NgModule({
	imports: [FormsModule, TemplateModule],
	exports: [ColumnChooserComponent],
	declarations: [ColumnChooserComponent]
})
export class ColumnChooserModule {
}
