import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { SerializationService } from './serialization.service';
import { EbNodeComponent } from './eb-node.component';
import { EbExpressionComponent } from './eb-expression.component';
import { EbClassDirective } from './eb-class.directive';

@NgModule({
	imports: [
		CommonModule,
		TemplateModule
	],
	exports: [
		EbNodeComponent,
		EbClassDirective
	],
	declarations: [
		EbNodeComponent,
		EbExpressionComponent,
		EbClassDirective
	],
	providers: [
		SerializationService
	]
})
export class EbModule {
}
