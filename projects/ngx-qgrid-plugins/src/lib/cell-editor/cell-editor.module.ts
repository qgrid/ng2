import { NgModule } from '@angular/core';
import { CellEditorComponent } from './cell-editor.component';
import { TemplateModule } from '@qgrid/ngx';

@NgModule({
	declarations: [
		CellEditorComponent
	],
	exports: [
		CellEditorComponent
	],
	imports: [
		TemplateModule
	]
})
export class CellEditorModule {
}
