import {GridModel} from '../grid/grid.model';
import {SceneModel} from '../scene/scene.model';
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
import {Event} from './event';

export declare class Model {
	constructor();

	static register(name: string, model: {new(): {}}): Model;

	grid(value?: object, tag?: object): GridModel;

	gridChanged: Event;

	scene(value?: object, tag?: object): SceneModel;

	sceneChanged: Event;

	edit(value?: object, tag?: object): EditModel;

	editChanged: Event;

	view(value?: object, tag?: object): ViewModel;

	viewChanged: Event;

	data(value?: object, tag?: object): DataModel;

	dataChanged: Event;

	head(value?: object, tag?: object): HeadModel;

	headChanged: Event;

	body(value?: object, tag?: object): BodyModel;

	bodyChanged: Event;

	layout(value?: object, tag?: object): LayoutModel;

	layoutChanged: Event;

	navigation(value?: object, tag?: object): NavigationModel;

	navigationChanged: Event;

	focus(value?: object, tag?: object): FocusModel;

	focusChanged: Event;

	columnList(value?: object, tag?: object): ColumnListModel;

	columnChanged: Event;

	row(value?: object, tag?: object): RowModel;

	rowChanged: Event;

	selection(value?: object, tag?: object): SelectionModel;

	selectionChanged: Event;

	foot(value?: object, tag?: object): FootModel;

	footChanged: Event;

	sort(value?: object, tag?: object): SortModel;

	sortChanged: Event;

	group(value?: object, tag?: object): GroupModel;

	groupChanged: Event;

	pivot(value?: object, tag?: object): PivotModel;

	pivotChanged: Event;

	plugin(value?: object, tag?: object): PluginModel;

	pluginChanged: Event;

	toolbar(value?: object, tag?: object): ToolbarModel;

	toolbarChanged: Event;

	layer(value?: object, tag?: object): LayerModel;

	layerChanged: Event;

	pagination(value?: object, tag?: object): PaginationModel;

	paginationChanged: Event;

	progress(value?: object, tag?: object): ProgressModel;

	progressChanged: Event;

	highlight(value?: object, tag?: object): HighlightModel;

	highlightChanged: Event;

	visibility(value?: object, tag?: object): VisibilityModel;

	visibilityChanged: Event;

	filter(value?: object, tag?: object): FilterModel;

	filterChanged: Event;

	drag(value?: object, tag?: object): DragModel;

	dragChanged: Event;

	style(value?: object, tag?: object): StyleModel;

	styleChanged: Event;

	scroll(value?: object, tag?: object): ScrollModel;

	scrollChanged: Event;

	export(value?: object, tag?: object): ExportModel;

	exportChanged: Event;

	action(value?: object, tag?: object): ActionModel;

	actionChanged: Event;

	fetch(value?: object, tag?: object): FetchModel;

	fetchChanged: Event;
}
