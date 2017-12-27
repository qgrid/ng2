import { TemplateModule } from '../../template/index';
import { NgModule } from '@angular/core';
import { ActionBarCoreComponent } from './action-bar-core.component';
import { ActionBarComponent } from './action-bar.component';
import { ActionCoreComponent } from './action-core.component';
import { ActionComponent } from './action.component';

@NgModule({
	declarations: [
		ActionBarComponent,
		ActionBarCoreComponent,
		ActionComponent,
		ActionCoreComponent
	],
	exports: [
		ActionBarComponent,
		ActionBarCoreComponent,
		ActionComponent,
		ActionCoreComponent
	],
	imports: [TemplateModule]
})
export class ActionBarModule {}
