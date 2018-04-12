import { NgModule } from '@angular/core';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { EbNodeComponent } from './eb-node.component';
import { SerializationService } from './serialization.service';
import { TraverseService } from './traverse.service';

@NgModule({
	imports: [TemplateModule],
	exports: [
		EbNodeComponent,
		SerializationService,
		TraverseService
	],
	declarations: [EbNodeComponent],
	providers: [
		SerializationService,
		TraverseService
	]
})
export class EBModule {
}
