import { NgModule } from '@angular/core';
import { CaptionComponent } from './caption.component';
import { TemplateModule } from '../../template/template.module';

@NgModule({
	declarations: [CaptionComponent],
	exports: [CaptionComponent],
	imports: [TemplateModule]
})
export class CaptionModule {}
