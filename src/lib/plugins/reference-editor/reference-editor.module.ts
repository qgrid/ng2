import { NgModule } from '@angular/core';
import { ReferenceEditorComponent } from './reference-editor.component';
import { ReferenceComponent } from './reference.component';
import { TemplateModule } from '../../template/template.module';

@NgModule({
	declarations: [ReferenceEditorComponent, ReferenceComponent],
	exports: [ReferenceEditorComponent, ReferenceComponent],
	imports: [TemplateModule]
})
export class ReferenceEditorModule {}
