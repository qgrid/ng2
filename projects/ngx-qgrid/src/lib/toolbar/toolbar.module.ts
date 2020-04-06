import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarCoreComponent } from './toolbar-core.component';
import { TemplateModule } from '../template/template.module';

@NgModule({
	declarations: [
		ToolbarComponent,
		ToolbarCoreComponent
	],
	exports: [
		ToolbarComponent,
		ToolbarCoreComponent
	],
	imports: [
		TemplateModule
	]
})
export class ToolbarModule {
}
