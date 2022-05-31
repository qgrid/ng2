import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { NgModule, NgZone } from '@angular/core';
import { Fastdom, FormatService } from '@qgrid/core';
import { BoxModule } from '../box/box.module';
import { LayerModule } from '../layer/layer.module';
import { MarkupModule } from '../markup/markup.module';
import { ScrollModule } from '../scroll/scroll.module';
import { TemplateModule } from '../template/template.module';
import { ThemeModule } from '../theme/theme.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { ViewModule } from '../view/view.module';
import { Grid } from './grid';
import { GridModelBuilder } from './grid-model.builder';
import { GridComponent } from './grid.component';

@NgModule({
  declarations: [
    GridComponent,
  ],
  exports: [
    GridComponent,
  ],
  imports: [
    CommonModule,
    BoxModule,
    LayerModule,
    MarkupModule,
    ScrollModule,
    TemplateModule,
    ThemeModule,
    ToolbarModule,
    ViewModule,
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    CurrencyPipe,
    GridModelBuilder,
    Grid,
  ],
})
export class GridModule {
  constructor(
    zone: NgZone,
    datePipe: DatePipe,
    numberPipe: DecimalPipe,
    currencyPipe: CurrencyPipe,
  ) {
    FormatService.date = (x: Date, format: string) => datePipe.transform(x, format);
    FormatService.number = (x, format) => numberPipe.transform(x, format);
    FormatService.currency = (x, format) => currencyPipe.transform(x, format);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Fastdom.invoke = task => zone.runOutsideAngular<any>(task);
  }
}
