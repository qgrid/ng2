import { NgModule } from '@angular/core';
import { ReferenceEditorComponent } from './reference-editor.component';
import { TemplateModule } from 'ng2-qgrid/template/template.module';

@NgModule({
	declarations: [ReferenceEditorComponent],
	exports: [ReferenceEditorComponent],
	imports: [TemplateModule],
	providers: []
})
export class ReferenceEditorModule {}
