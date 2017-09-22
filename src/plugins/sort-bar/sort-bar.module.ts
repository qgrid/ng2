import { NgModule } from '@angular/core';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { SortBarComponent } from 'ng2-qgrid/plugins/sort-bar/sort.bar';

@NgModule({
	declarations: [
		SortBarComponent
	],
	exports: [
		SortBarComponent
	],
	imports: [
		TemplateModule
	],
	providers: []
})
export class SortBarModule {
}
