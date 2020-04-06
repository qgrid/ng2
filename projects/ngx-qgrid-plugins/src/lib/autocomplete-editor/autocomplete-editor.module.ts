import { NgModule } from '@angular/core';
import { TemplateModule } from 'ngx-qgrid';
import { AutoCompleteEditorComponent } from './autocomplete-editor.component';

@NgModule({
	declarations: [
		AutoCompleteEditorComponent
	],
	exports: [
		AutoCompleteEditorComponent
	],
	imports: [
		TemplateModule
	]
})
export class AutoCompleteEditorModule {
}
