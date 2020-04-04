import { NgModule } from '@angular/core';
import { CaptionComponent } from './caption.component';
import { TemplateModule } from 'ngx-qgrid';

@NgModule({
	declarations: [CaptionComponent],
	exports: [CaptionComponent],
	imports: [TemplateModule]
})
export class CaptionModule {}
