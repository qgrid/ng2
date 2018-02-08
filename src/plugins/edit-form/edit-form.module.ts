import { NgModule } from '@angular/core';
import { EditFormTriggerComponent } from './edit-form-trigger.component';
import { TemplateModule } from 'ng2-qgrid/template';
import { EditFormComponent } from 'ng2-qgrid/plugins/edit-form/edit-form.component';

@NgModule({
	declarations: [EditFormTriggerComponent, EditFormComponent ],
    exports: [EditFormTriggerComponent, EditFormComponent],
    imports: [TemplateModule]
})
export class EditFormModule {}
