import { NgModule } from '@angular/core';
import { BoolEditorComponent } from './bool-editor.component';
import { TemplateModule } from 'ngx-qgrid';

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
