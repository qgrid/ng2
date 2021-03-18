import { NgModule } from '@angular/core';
import { CellTooltipComponent } from './cell-tooltip.component';
import { TemplateModule, LayerModule } from '@qgrid/ngx';

@NgModule({
	declarations: [CellTooltipComponent],
	exports: [CellTooltipComponent],
	imports: [TemplateModule, LayerModule]
})
export class CellTooltipModule {
}
