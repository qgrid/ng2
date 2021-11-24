import { NgModule } from '@angular/core';
import { ImportComponent } from './import.component';
import { TemplateModule } from '@qgrid/ngx';

@NgModule({
	declarations: [
		ImportComponent
	],
	exports: [
		ImportComponent
	],
	imports: [
		TemplateModule
	]
})
export class ImportModule {
}
