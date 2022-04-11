import { NgModule } from '@angular/core';
import { LayerModule } from '../layer/layer.module';
import { TemplateModule } from '../template/template.module';
import { RowComponent } from './row.component';
import { TrCoreDirective } from './tr-core.directive';
import { TrhCoreDirective } from './trh-core.directive';

@NgModule({
	imports: [
		LayerModule,
		TemplateModule
	],
	declarations: [
		RowComponent,
		TrCoreDirective,
		TrhCoreDirective,
	],
	exports: [
		RowComponent,
		TrCoreDirective,
		TrhCoreDirective,
	],
})
export class RowModule {
}
