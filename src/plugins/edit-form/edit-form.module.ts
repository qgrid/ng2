import { NgModule } from '@angular/core';
import { EditFormComponent } from './edit-form.component';
import { TemplateModule } from 'ng2-qgrid/template';

@NgModule({
	declarations: [EditFormComponent],
    exports: [EditFormComponent],
    imports: [TemplateModule]
})
export class EditFormModule {}
