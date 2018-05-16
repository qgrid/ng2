import { NgModule } from '@angular/core';
import { BoolEditorComponent } from './bool-editor.component';
import { TemplateModule } from '../../template/template.module';

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
