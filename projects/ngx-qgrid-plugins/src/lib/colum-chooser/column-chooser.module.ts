import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColumnChooserComponent } from './column-chooser.component';
import { ColumnChooserModel } from '@qgrid/plugins/column-chooser/column.chooser.model';
import { TemplateModule, GridModelBuilder } from '@qgrid/ngx';

@NgModule({
	imports: [FormsModule, TemplateModule],
	exports: [ColumnChooserComponent],
	declarations: [ColumnChooserComponent]
})
export class ColumnChooserModule {
	constructor(modelBuilder: GridModelBuilder) {
		modelBuilder.register('columnChooser', ColumnChooserModel);
	}
}
