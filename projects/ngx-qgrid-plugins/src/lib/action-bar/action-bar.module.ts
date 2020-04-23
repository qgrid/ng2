import { NgModule } from '@angular/core';
import { TemplateModule } from '@qgrid/ngx';
import { ActionBarComponent } from './action-bar.component';
import { ActionListComponent } from './action-list.component';

@NgModule({
	declarations: [
		ActionBarComponent,
		ActionListComponent,
	],
	exports: [
		ActionBarComponent,
		ActionListComponent,
	],
	imports: [
		TemplateModule
	]
})
export class ActionBarModule { }
