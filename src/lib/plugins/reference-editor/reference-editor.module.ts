import { NgModule } from '@angular/core';
import { ReferenceEditorComponent } from './reference-editor.component';
import { TemplateModule } from '../../template/template.module';

@NgModule({
	declarations: [ReferenceEditorComponent],
	exports: [ReferenceEditorComponent],
	imports: [TemplateModule]
})
export class ReferenceEditorModule {}
