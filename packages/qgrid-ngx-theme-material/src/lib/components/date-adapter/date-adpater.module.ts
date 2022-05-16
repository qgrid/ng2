import { NgModule } from '@angular/core';
import { DateAdapterDirective } from './date-adapter.directive';

@NgModule({
  declarations: [
    DateAdapterDirective,
  ],
  exports: [
    DateAdapterDirective,
  ],
})
export class DateAdapterModule { }
