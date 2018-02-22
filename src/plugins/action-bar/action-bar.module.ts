import { TemplateModule } from '../../template/template.module';
import { NgModule } from '@angular/core';
import { ActionBarComponent } from './action-bar.component';
import { ActionListComponent } from './action-list.component';
import { ActionCoreComponent } from './action-core.component';
import { ActionComponent } from './action.component';

@NgModule({
	declarations: [
		ActionBarComponent,
		ActionListComponent,
		ActionComponent,
		ActionCoreComponent
	],
	exports: [
		ActionBarComponent,
		ActionListComponent,
		ActionComponent,
		ActionCoreComponent
	],
	imports: [TemplateModule]
})
export class ActionBarModule { }
