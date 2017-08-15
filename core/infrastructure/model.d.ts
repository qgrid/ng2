import {GridModel} from '../grid/grid.model';
import {ViewModel} from '../view/view.model';
import {DataModel} from '../data/data.model';
import {HeadModel} from '../head/head.model';
import {BodyModel} from '../body/body.model';
import {LayoutModel} from '../layout/layout.model';
import {NavigationModel} from '../navigation/navigation.model';
import {FocusModel} from '../focus/focus.model';
import {ColumnListModel} from '../column-list/column.list.model';
import {RowModel} from '../row/row.model';
import {SelectionModel} from '../selection/selection.model';
import {FootModel} from '../foot/foot.model';
import {SortModel} from '../sort/sort.model';
import {GroupModel} from '../group/group.model';
import {PivotModel} from '../pivot/pivot.model';
import {PluginModel} from '../plugin/plugin.model';
import {EditModel} from '../edit/edit.model';
import {ToolbarModel} from '../toolbar/toolbar.model';
import {LayerModel} from '../layer/layer.model';
import {PaginationModel} from '../pagination/pagination.model';
import {ProgressModel} from '../progress/progress.model';
import {HighlightModel} from '../highlight/highlight.model';
import {VisibilityModel} from '../visibility/visibility.model';
import {FilterModel} from '../filter/filter.model';
import {DragModel} from '../drag/drag.model';
import {StyleModel} from '../style/style.model';
import {ScrollModel} from '../scroll/scroll.model';
import {ExportModel} from '../export/export.model';
import {ActionModel} from '../action/action.model';
import {FetchModel} from '../fetch/fetch.model';

export declare class Model {
  constructor();

  static register(name: string, model: Model): Model;

  grid(value?: object, tag?: object): GridModel;

  edit(value?: object, tag?: object): EditModel;

  view(value?: object, tag?: object): ViewModel;

  data(value?: object, tag?: object): DataModel;

  head(value?: object, tag?: object): HeadModel;

  body(value?: object, tag?: object): BodyModel;

  layout(value?: object, tag?: object): LayoutModel;

  navigation(value?: object, tag?: object): NavigationModel;

  focus(value?: object, tag?: object): FocusModel;

  columnList(value?: object, tag?: object): ColumnListModel;

  row(value?: object, tag?: object): RowModel;

  selection(value?: object, tag?: object): SelectionModel;

  foot(value?: object, tag?: object): FootModel;

  sort(value?: object, tag?: object): SortModel;

  group(value?: object, tag?: object): GroupModel;

  pivot(value?: object, tag?: object): PivotModel;

  plugin(value?: object, tag?: object): PluginModel;

  toolbar(value?: object, tag?: object): ToolbarModel;

  layer(value?: object, tag?: object): LayerModel;

  pagination(value?: object, tag?: object): PaginationModel;

  progress(value?: object, tag?: object): ProgressModel;

  highlight(value?: object, tag?: object): HighlightModel;

  visibility(value?: object, tag?: object): VisibilityModel;

  filter(value?: object, tag?: object): FilterModel;

  drag(value?: object, tag?: object): DragModel;

  style(value?: object, tag?: object): StyleModel;

  scroll(value?: object, tag?: object): ScrollModel;

  export(value?: object, tag?: object): ExportModel;

  action(value?: object, tag?: object): ActionModel;

  fetch(value?: object, tag?: object): FetchModel;
}
