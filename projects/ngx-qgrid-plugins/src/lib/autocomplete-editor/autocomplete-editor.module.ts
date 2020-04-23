import { NgModule } from '@angular/core';
import { TemplateModule } from '@qgrid/ngx';
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
