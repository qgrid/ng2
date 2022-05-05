import { NgModule } from '@angular/core';
import { GridModelBuilder, TemplateModule } from '@qgrid/ngx';
import { ColumnFilterState } from '@qgrid/plugins';
import { ColumnFilterByComponent } from './column-filter-by.component';
import { ColumnFilterItemListDirective } from './column-filter-item-list.directive';
import { ColumnFilterItemDirective } from './column-filter-item.directive';
import { ColumnFilterTriggerComponent } from './column-filter-trigger.component';
import { ColumnFilterComponent } from './column-filter.component';

@NgModule({
  declarations: [
    ColumnFilterComponent,
    ColumnFilterTriggerComponent,
    ColumnFilterByComponent,
    ColumnFilterItemListDirective,
    ColumnFilterItemDirective,
  ],
  exports: [
    ColumnFilterComponent,
    ColumnFilterTriggerComponent,
    ColumnFilterByComponent,
    ColumnFilterItemListDirective,
    ColumnFilterItemDirective,
  ],
  imports: [
    TemplateModule,
  ],
})
export class ColumnFilterModule {
  constructor(modelBuilder: GridModelBuilder) {
    modelBuilder.register('columnFilter', ColumnFilterState);
  }
}
