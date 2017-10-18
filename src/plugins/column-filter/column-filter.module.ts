import { NgModule } from '@angular/core';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { TemplateModule } from 'ng2-qgrid/template';
import { ColumnFilterComponent } from './column-filter.component';
import { ColumnFilterModel } from './column-filter.model';

Model.register('columnFilter', ColumnFilterModel);

@NgModule({
	declarations: [ColumnFilterComponent],
	exports: [ColumnFilterComponent],
	imports: [TemplateModule],
	providers: []
})
export class ColumnFilterModule { }
