import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { SerializationService } from './serialization.service';
import { TraverseService } from './traverse.service';
import { EbNodeComponent } from './eb-node.component';
import { EbExpressionComponent } from './eb-expression.component';

@NgModule({
	imports: [CommonModule, TemplateModule],
	exports: [EbNodeComponent],
	declarations: [EbNodeComponent, EbExpressionComponent],
	providers: [
		SerializationService,
		TraverseService
	]
})
export class EbModule {
}
