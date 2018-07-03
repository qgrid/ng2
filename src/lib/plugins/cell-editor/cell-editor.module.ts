import { BackdropComponent } from './../backdrop/backdrop.component';
import { NgModule } from '@angular/core';
import { CellEditorComponent } from './cell-editor.component';
import { TemplateModule } from '../../template/template.module';

@NgModule({
	declarations: [
		CellEditorComponent
	],
	exports: [
		CellEditorComponent
	],
	entryComponents: [BackdropComponent],
	imports: [
		TemplateModule
	]
})
export class CellEditorModule { 
}
