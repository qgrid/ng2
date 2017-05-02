import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import './assets/index.scss';

import {GridComponent} from './ng2/components/grid';
import {ColumnListComponent} from './ng2/components/column';
import {BoxCoreComponent} from './ng2/components/box'
import {ViewCoreComponent} from './ng2/components/view'

import {MarkupDirective} from "./ng2/directives/markup";

import {GridService} from './ng2/services/grid.service';
import {TemplateCacheService} from './ng2/services/template-cache.service';
import {ThemeProvider} from './ng2/services/theme.provider';
import {ThemeService} from './ng2/services/theme.service';

import Model from 'core/infrastructure/model';
import GridModel from 'core/grid/grid.model';
import ViewModel from 'core/view/view.model';
import DataModel from 'core/data/data.model';
import HeadModel from 'core/head/head.model';
import BodyModel from 'core/body/body.model';
import LayoutModel from 'core/layout/layout.model';
import NavigationModel from 'core/navigation/navigation.model';
import ColumnListModel from 'core/column-list/column.list.model';
import RowModel from 'core/row/row.model';
import SelectionModel from 'core/selection/selection.model';
import FootModel from 'core/foot/foot.model';
import SortModel from 'core/sort/sort.model';
import GroupModel from 'core/group/group.model';
import PivotModel from 'core/pivot/pivot.model';
import PluginModel from 'core/plugin/plugin.model';
import EditModel from 'core/edit/edit.model';
import ToolbarModel from 'core/toolbar/toolbar.model';
import LayerModel from 'core/layer/layer.model';
import PaginationModel from 'core/pagination/pagination.model';
import ProgressModel from 'core/progress/progress.model';
import HighlightModel from 'core/highlight/highlight.model';
import VisibilityModel from 'core/visibility/visibility.model';
import FilterModel from 'core/filter/filter.model';
import DragModel from 'core/drag/drag.model';
import StyleModel from 'core/style/style.model';
import ScrollModel from 'core/scroll/scroll.model';

Model.register('grid', GridModel)
  .register('view', ViewModel)
  .register('data', DataModel)
  .register('selection', SelectionModel)
  .register('head', HeadModel)
  .register('body', BodyModel)
  .register('navigation', NavigationModel)
  .register('foot', FootModel)
  .register('layout', LayoutModel)
  .register('row', RowModel)
  .register('columnList', ColumnListModel)
  .register('sort', SortModel)
  .register('group', GroupModel)
  .register('pivot', PivotModel)
  .register('edit', EditModel)
  .register('plugin', PluginModel)
  .register('toolbar', ToolbarModel)
  .register('layer', LayerModel)
  .register('pagination', PaginationModel)
  .register('progress', ProgressModel)
  .register('highlight', HighlightModel)
  .register('visibility', VisibilityModel)
  .register('filter', FilterModel)
  .register('drag', DragModel)
  .register('style', StyleModel)
  // .register('columnChooser', ColumnChooserModel)
  // .register('columnFilter', ColumnFilterModel)
  // .register('popup', PopupModel)
  .register('scroll', ScrollModel);

@NgModule({
  declarations: [
    GridComponent,
    ColumnListComponent,
    BoxCoreComponent,
    ViewCoreComponent,
    MarkupDirective
  ],
  exports: [
    GridComponent,
    ColumnListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    TemplateCacheService,
    ThemeProvider,
    ThemeService,
    GridService
  ]
})
export class GridModule {
  constructor(themeProvider: ThemeProvider, themeService: ThemeService) {
    themeProvider.register('default', theme => {
      const EMPTY = '';

      theme.put('qgrid.grid.tpl.html', require('./ng2/components/grid/grid.component.html'));
      theme.put('qgrid.view.tpl.html', require('./ng2/components/view/view-core.component.html'));
      // theme.put('qgrid.head.tpl.html', require('./components/head/head.html'));
      // theme.put('qgrid.body.tpl.html', require('./components/body/body.html'));
      // theme.put('qgrid.body.virtual.tpl.html', require('./components/body/body.virtual.html'));
      // theme.put('qgrid.foot.tpl.html', require('./components/foot/foot.html'));
      //
      // theme.put('qgrid.toolbar.top.tpl.html', require('./components/toolbar/toolbar.top.html'));
      // theme.put('qgrid.toolbar.bottom.tpl.html', require('./components/toolbar/toolbar.bottom.html'));
      // theme.put('qgrid.toolbar.right.tpl.html', require('./components/toolbar/toolbar.right.html'));
      // theme.put('qgrid.toolbar.left.tpl.html', require('./components/toolbar/toolbar.left.html'));
      //
      // theme.put('qgrid.head.cell.pad.tpl.html', EMPTY);
      // theme.put('qgrid.body.cell.pad.tpl.html', EMPTY);
      // theme.put('qgrid.foot.cell.pad.tpl.html', EMPTY);
      //
      // theme.put('qgrid.head.cell.pivot.tpl.html', require('./components/cell/pivot/head.cell.pivot.html'));
      // theme.put('qgrid.body.cell.pivot.tpl.html', require('./components/cell/pivot/body.cell.pivot.html'));
      // theme.put('qgrid.foot.cell.pivot.tpl.html', EMPTY);
      //
      // theme.put('qgrid.head.cell.group.tpl.html', require('./components/cell/group/head.cell.group.html'));
      // theme.put('qgrid.body.cell.group.tpl.html', require('./components/cell/group/body.cell.group.html'));
      // theme.put('qgrid.foot.cell.group.tpl.html', EMPTY);
      //
      // theme.put('qgrid.head.cell.text.tpl.html', require('./components/cell/text/head.cell.text.html'));
      // theme.put('qgrid.body.cell.text.tpl.html', require('./components/cell/text/body.cell.text.html'));
      // theme.put('qgrid.foot.cell.text.tpl.html', require('./components/cell/text/foot.cell.text.html'));
      // theme.put('qgrid.body.cell.text.edit.tpl.html', require('./components/cell/text/body.cell.text.edit.html'));
      // theme.put('qgrid.body.cell.text-area.edit.tpl.html', require('./components/cell/text/body.cell.text.edit.html'));
      // theme.put('qgrid.form.cell.text.edit.tpl.html', EMPTY);
      //
      // theme.put('qgrid.head.cell.row-number.tpl.html', require('./components/cell/row-number/head.cell.row.number.html'));
      // theme.put('qgrid.body.cell.row-number.tpl.html', require('./components/cell/row-number/body.cell.row.number.html'));
      // theme.put('qgrid.foot.cell.row-number.tpl.html', EMPTY);
      //
      // theme.put('qgrid.head.cell.row-indicator.tpl.html', EMPTY);
      // theme.put('qgrid.body.cell.row-indicator.tpl.html', require('./components/cell/row-indicator/body.cell.row.indicator.html'));
      // theme.put('qgrid.foot.cell.row-indicator.tpl.html', EMPTY);
      //
      // theme.put('qgrid.head.cell.date.tpl.html', require('./components/cell/text/head.cell.text.html'));
      // theme.put('qgrid.body.cell.date.tpl.html', require('./components/cell/date/body.cell.date.html'));
      // theme.put('qgrid.foot.cell.date.tpl.html', require('./components/cell/text/foot.cell.text.html'));
      // theme.put('qgrid.body.cell.date.edit.tpl.html', require('./components/cell/date/body.cell.date.edit.html'));
      //
      // theme.put('qgrid.head.cell.password.tpl.html', require('./components/cell/text/head.cell.text.html'));
      // theme.put('qgrid.body.cell.password.tpl.html', require('./components/cell/password/body.cell.password.html'));
      // theme.put('qgrid.foot.cell.password.tpl.html', require('./components/cell/text/foot.cell.text.html'));
      // theme.put('qgrid.body.cell.password.edit.tpl.html', require('./components/cell/password/body.cell.password.edit.html'));
      //
      // theme.put('qgrid.head.cell.bool.tpl.html', require('./components/cell/text/head.cell.text.html'));
      // theme.put('qgrid.body.cell.bool.tpl.html', require('./components/cell/bool/body.cell.bool.html'));
      // theme.put('qgrid.foot.cell.bool.tpl.html', require('./components/cell/text/foot.cell.text.html'));
      // theme.put('qgrid.body.cell.bool.edit.tpl.html', require('./components/cell/bool/body.cell.bool.edit.html'));
      //
      // theme.put('qgrid.head.cell.number.tpl.html', require('./components/cell/text/head.cell.text.html'));
      // theme.put('qgrid.body.cell.number.tpl.html', require('./components/cell/number/body.cell.number.html'));
      // theme.put('qgrid.foot.cell.number.tpl.html', require('./components/cell/text/foot.cell.text.html'));
      // theme.put('qgrid.body.cell.number.edit.tpl.html', require('./components/cell/number/body.cell.number.edit.html'));
      //
      // theme.put('qgrid.head.cell.array.tpl.html', require('./components/cell/text/head.cell.text.html'));
      // theme.put('qgrid.body.cell.array.tpl.html', require('./components/cell/array/body.cell.array.html'));
      // theme.put('qgrid.foot.cell.array.tpl.html', require('./components/cell/text/foot.cell.text.html'));
      // theme.put('qgrid.body.cell.array.edit.tpl.html', require('./components/cell/array/body.cell.array.edit.html'));
      //
      // theme.put('qgrid.head.cell.email.tpl.html', require('./components/cell/text/head.cell.text.html'));
      // theme.put('qgrid.body.cell.email.tpl.html', require('./components/cell/email/body.cell.email.html'));
      // theme.put('qgrid.foot.cell.email.tpl.html', require('./components/cell/text/foot.cell.text.html'));
      // theme.put('qgrid.body.cell.email.edit.tpl.html', require('./components/cell/text/body.cell.text.edit.html'));
      //
      // theme.put('qgrid.head.cell.time.tpl.html', require('./components/cell/text/head.cell.text.html'));
      // theme.put('qgrid.body.cell.time.tpl.html', require('./components/cell/time/body.cell.time.html'));
      // theme.put('qgrid.foot.cell.time.tpl.html', require('./components/cell/text/foot.cell.text.html'));
      // theme.put('qgrid.body.cell.time.edit.tpl.html', require('./components/cell/time/body.cell.time.edit.html'));
      //
      // theme.put('qgrid.head.cell.url.tpl.html', require('./components/cell/text/head.cell.text.html'));
      // theme.put('qgrid.body.cell.url.tpl.html', require('./components/cell/url/body.cell.url.html'));
      // theme.put('qgrid.foot.cell.url.tpl.html', require('./components/cell/text/foot.cell.text.html'));
      // theme.put('qgrid.body.cell.url.edit.tpl.html', require('./components/cell/url/body.cell.url.edit.html'));
      //
      // theme.put('qgrid.head.cell.file.tpl.html', require('./components/cell/text/head.cell.text.html'));
      // theme.put('qgrid.body.cell.file.tpl.html', require('./components/cell/file/body.cell.file.html'));
      // theme.put('qgrid.foot.cell.file.tpl.html', require('./components/cell/text/foot.cell.text.html'));
      // theme.put('qgrid.body.cell.file.edit.tpl.html', require('./components/cell/file/body.cell.file.edit.html'));
      //
      // theme.put('qgrid.head.cell.image.tpl.html', require('./components/cell/text/head.cell.text.html'));
      // theme.put('qgrid.body.cell.image.tpl.html', require('./components/cell/image/body.cell.image.html'));
      // theme.put('qgrid.foot.cell.image.tpl.html', require('./components/cell/text/foot.cell.text.html'));
      // theme.put('qgrid.body.cell.image.edit.tpl.html', require('./components/cell/image/body.cell.image.edit.html'));
      //
      // theme.put('qgrid.head.cell.reference.tpl.html', require('./components/cell/text/head.cell.text.html'));
      // theme.put('qgrid.body.cell.reference.tpl.html', require('./components/cell/reference/body.cell.reference.html'));
      // theme.put('qgrid.foot.cell.reference.tpl.html', require('./components/cell/text/foot.cell.text.html'));
      // theme.put('qgrid.body.cell.reference.edit.tpl.html', require('./components/cell/reference/body.cell.reference.edit.html'));
      //
      // theme.put('qgrid.head.cell.id.tpl.html', require('./components/cell/text/head.cell.text.html'));
      // theme.put('qgrid.body.cell.id.tpl.html', require('./components/cell/text/body.cell.text.html'));
      // theme.put('qgrid.foot.cell.id.tpl.html', require('./components/cell/text/foot.cell.text.html'));
      // theme.put('qgrid.body.cell.id.edit.tpl.html', require('./components/cell/text/body.cell.text.edit.html'));
      //
      // theme.put('qgrid.head.cell.select.tpl.html', require('./components/cell/select/head.cell.select.html'));
      // theme.put('qgrid.body.cell.select.tpl.html', require('./components/cell/select/body.cell.select.html'));
      // theme.put('qgrid.foot.cell.select.tpl.html', EMPTY);
      //
      // theme.put('qgrid.body.cell.dropdown.edit.tpl.html', require('./components/cell/dropdown/body.cell.dropdown.edit.html'));
      // theme.put('qgrid.body.cell.autocomplete.edit.tpl.html', require('./components/cell/autocomplete/body.cell.autocomplete.edit.html'));
    });

    themeService.name = 'default';
  }
}
