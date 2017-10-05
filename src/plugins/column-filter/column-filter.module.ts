import { NgModule } from '@angular/core';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { TemplateModule } from 'ng2-qgrid/template';
import { ColumnFilterComponent } from './column-filter.component';
import { ColumnFilterModel } from './column-filter.model';
import { ColumnFilterDirective } from './column-filter.directive';

Model.register('columnFilter', ColumnFilterModel);

@NgModule({
	declarations: [ColumnFilterComponent, ColumnFilterDirective],
	exports: [ColumnFilterComponent, ColumnFilterDirective],
	imports: [TemplateModule],
	providers: []
})
export class ColumnFilterModule { }
