import { NgModule } from '@angular/core';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { ColumnFilterComponent } from './column-filter.component';
import { ColumnFilterModel } from './column-filter.model';
import { TemplateModule } from 'ng2-qgrid/template';
import { ColumnFilterPanelComponent } from './column-filter-panel.component';

Model.register('columnFilter', ColumnFilterModel);

@NgModule({
	declarations: [ColumnFilterComponent, ColumnFilterPanelComponent],
	exports: [ColumnFilterComponent, ColumnFilterPanelComponent],
	imports: [TemplateModule],
	providers: []
})
export class ColumnFilterModule { }
