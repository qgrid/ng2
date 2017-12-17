import { NgModule } from '@angular/core';
import { BackdropComponent } from './backdrop.component';
import { TemplateModule } from 'ng2-qgrid/template/template.module';

@NgModule({
	declarations: [
		BackdropComponent
	],
	exports: [
		BackdropComponent
	],
	imports: [
		TemplateModule
	],
	providers: []
})
export class BackdropModule {
}
