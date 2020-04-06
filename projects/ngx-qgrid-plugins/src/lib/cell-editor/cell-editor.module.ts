import { NgModule } from '@angular/core';
import { CellEditorComponent } from './cell-editor.component';
import { TemplateModule } from 'ngx-qgrid';

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
