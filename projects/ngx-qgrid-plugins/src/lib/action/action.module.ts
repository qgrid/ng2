import { NgModule } from '@angular/core';
import { ActionCoreComponent } from './action-core.component';
import { ActionComponent } from './action.component';
import { TemplateModule } from '@qgrid/ngx';

@NgModule({
	declarations: [
		ActionComponent,
		ActionCoreComponent
	],
	exports: [
		ActionComponent,
		ActionCoreComponent
	],
	imports: [
		TemplateModule
	]
})
export class ActionModule { }
