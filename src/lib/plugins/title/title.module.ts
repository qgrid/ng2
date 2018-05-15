import { NgModule } from '@angular/core';
import { TitleComponent } from './title.component';
import { TemplateModule } from 'ng2-qgrid/template/template.module';

@NgModule({
	declarations: [TitleComponent],
	exports: [TitleComponent],
	imports: [TemplateModule]
})
export class TitleModule {}
