import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GridModelBuilder, TemplateModule } from '@qgrid/ngx';
import { ColumnChooserState } from '@qgrid/plugins';
import { ColumnChooserComponent } from './column-chooser.component';

@NgModule({
	imports: [
		FormsModule,
		TemplateModule
	],
	exports: [
		ColumnChooserComponent
	],
	declarations: [
		ColumnChooserComponent
	]
})
export class ColumnChooserModule {
	constructor(modelBuilder: GridModelBuilder) {
		modelBuilder.register('columnChooser', ColumnChooserState);
	}
}
