import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import './assets/index.scss';

import {GridComponent} from './ng2/components/grid';
import {ColumnListComponent} from './ng2/components/column';
import {BoxCoreComponent} from './ng2/components/box'
import {ViewCoreComponent} from './ng2/components/view'

import {TemplateCacheService} from './ng2/services/template-cache.service';
import {ThemeProvider} from './ng2/services/theme.provider';

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
    ViewCoreComponent
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
    ThemeProvider
  ]
})
export class GridModule {
  constructor() {
  }
}
