import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellHandlerComponent } from './cell-handler.component';

@NgModule({
  declarations: [
    CellHandlerComponent,
  ],
  exports: [
    CellHandlerComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class CellHandlerModule {
}
