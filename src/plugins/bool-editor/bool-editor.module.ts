import { NgModule } from '@angular/core';
import { BoolEditorComponent } from './bool-editor.component';
import { TemplateModule } from 'ng2-qgrid/template/template.module';

@NgModule({
	declarations: [
		BoolEditorComponent
	],
	exports: [
		BoolEditorComponent
	],
	imports: [
		TemplateModule
	]
})
export class BoolEditorModule {
}
