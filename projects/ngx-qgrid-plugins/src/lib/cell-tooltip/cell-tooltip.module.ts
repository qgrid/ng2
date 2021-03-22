import { NgModule } from '@angular/core';
import { CellTooltipComponent } from './cell-tooltip.component';
import { CellTooltipDirective } from './cell-tooltip.directive';
import { TemplateModule, LayerModule } from '@qgrid/ngx';

@NgModule({
	declarations: [CellTooltipComponent, CellTooltipDirective],
	exports: [CellTooltipComponent, CellTooltipDirective],
	imports: [TemplateModule, LayerModule],
})
export class CellTooltipModule {}
