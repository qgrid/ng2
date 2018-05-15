import { NgModule } from '@angular/core';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { BackdropComponent } from './backdrop.component';
import { BackdropDirective } from './backdrop.directive';

@NgModule({
	declarations: [
		BackdropComponent,
		BackdropDirective
	],
	exports: [
		BackdropComponent,
		BackdropDirective
	],
	imports: [
		TemplateModule
	]
})
export class BackdropModule {
}
