import {GridModel} from './grid';
import {SceneModel} from './scene';
import {ViewModel} from './view';
import {DataModel} from './data';
import {HeadModel} from './head';
import {BodyModel} from './body';
import {LayoutModel} from './layout';
import {NavigationModel} from './navigation';
import {FocusModel} from './focus';
import {ColumnListModel} from './column-list';
import {RowModel} from './row';
import {SelectionModel} from './selection';
import {FootModel} from './foot';
import {SortModel} from './sort';
import {GroupModel} from './group';
import {PivotModel} from './pivot';
import {PluginModel} from './plugin';
import {EditModel} from './edit';
import {ToolbarModel} from './toolbar';
import {LayerModel} from './layer';
import {PaginationModel} from './pagination';
import {ProgressModel} from './progress';
import {HighlightModel} from './highlight';
import {VisibilityModel} from './visibility';
import {FilterModel} from './filter';
import {DragModel} from './drag';
import {StyleModel} from './style';
import {ScrollModel} from './scroll';
import {ExportModel} from './export';
import {ImportModel} from './import';
import {ActionModel} from './action';
import {FetchModel} from './fetch';

export function setup(model) {
	model.register('grid', GridModel)
		.register('scene', SceneModel)
		.register('view', ViewModel)
		.register('data', DataModel)
		.register('selection', SelectionModel)
		.register('head', HeadModel)
		.register('body', BodyModel)
		.register('navigation', NavigationModel)
		.register('focus', FocusModel)
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
		.register('scroll', ScrollModel)
		.register('export', ExportModel)
		.register('import', ImportModel)
		.register('action', ActionModel)
		.register('fetch', FetchModel);
}