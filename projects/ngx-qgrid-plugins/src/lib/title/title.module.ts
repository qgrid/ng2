import { NgModule } from '@angular/core';
import { TitleComponent } from './title.component';
import { TemplateModule } from '@qgrid/ngx';

@NgModule({
	declarations: [TitleComponent],
	exports: [TitleComponent],
	imports: [TemplateModule]
})
export class TitleModule {}
