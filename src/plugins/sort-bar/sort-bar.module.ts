import {NgModule} from '@angular/core';
import {PagerComponent} from './pager.component';
import {TemplateModule} from '@grid/template/template.module';
import {SortBarComponent} from '@grid/plugins/sort-bar/sort.bar';

@NgModule({
  declarations: [
    SortBarComponent
  ],
  exports: [
    SortBarComponent
  ],
  imports: [
    TemplateModule
  ],
  providers: []
})
export class PagerModule {
}
