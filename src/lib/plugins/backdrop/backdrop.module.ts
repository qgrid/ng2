import { NgModule } from '@angular/core';
import { BackdropComponent } from './backdrop.component';
import { BackdropDirective } from './backdrop.directive';
import { TemplateModule } from '../../template/template.module';

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
