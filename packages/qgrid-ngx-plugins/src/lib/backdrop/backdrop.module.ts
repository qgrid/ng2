import { NgModule } from '@angular/core';
import { BackdropComponent } from './backdrop.component';
import { BackdropDirective } from './backdrop.directive';
import { BackdropService } from './backdrop.service';
import { TemplateModule } from '@qgrid/ngx';

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
	],
	providers: [
		BackdropService
	]
})
export class BackdropModule {
}
