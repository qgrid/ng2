import { NgModule } from '@angular/core';
import { TemplateModule } from '@qgrid/ngx';
import { AltComponent } from './alt.component';

@NgModule({
	declarations: [AltComponent],
	exports: [AltComponent],
	imports: [TemplateModule]
})
export class AltModule {}
