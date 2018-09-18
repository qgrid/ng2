import { NgModule } from '@angular/core';
import { TemplateModule } from '../../template/template.module';
import { AutocompleteEditorComponent } from './autocomplete-editor.component';

@NgModule({
	declarations: [
		AutocompleteEditorComponent
	],
	exports: [
		AutocompleteEditorComponent
	],
	imports: [
		TemplateModule  
	]
})
export class AutocompleteEditorModule {
}
