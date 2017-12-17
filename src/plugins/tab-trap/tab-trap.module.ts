import { NgModule } from '@angular/core';
import { TabTrapComponent } from './cell-editor.component';
import { TemplateModule } from 'ng2-qgrid/template/template.module';

@NgModule({
	declarations: [
		TabTrapComponent
	],
	exports: [
		TabTrapComponent
	],
	imports: [
		TemplateModule
	],
	providers: []
})
export class TabTrapModule {
}
