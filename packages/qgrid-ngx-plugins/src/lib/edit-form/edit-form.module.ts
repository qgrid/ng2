import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditFormTriggerComponent } from './edit-form-trigger.component';
import { EditFormComponent } from './edit-form.component';
import { EditFormControlComponent } from './edit-form-control.component';
import { TemplateModule } from '@qgrid/ngx';

@NgModule({
	declarations: [
		EditFormTriggerComponent,
		EditFormComponent,
		EditFormControlComponent
	],
	exports: [EditFormTriggerComponent, EditFormComponent, EditFormControlComponent],
	imports: [CommonModule, TemplateModule]
})
export class EditFormModule { }
