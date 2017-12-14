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
import {ValidationModel} from '../validation/validation.model';
import {Event} from './event';
import {PersistenceModel} from '../persistence/persistence.model';
import {PipeModel} from '../pipe/pipe.model'; 

export declare class Model {
	constructor();

	static register(name: string, model: {new(): {}}): Model;

	grid(value: object, tag?: object): Model;
	grid(): GridModel;
	gridChanged: Event;

	pipe(value: object, tag?: object): Model;
	pipe(): PipeModel;
	pipeChanged: Event;	

	scene(value: object, tag?: object): Model;
	grid(): SceneModel;
	sceneChanged: Event;

	edit(value: object, tag?: object): Model;
	edit(): EditModel;
	editChanged: Event;

	view(value: object, tag?: object): Model;
	view(): ViewModel;
	viewChanged: Event;

	data(value: object, tag?: object): Model;
	data(): DataModel;
	dataChanged: Event;

	head(value: object, tag?: object): Model;
	head(): HeadModel;
	headChanged: Event;

	body(value: object, tag?: object): Model;
	body(): BodyModel;
	bodyChanged: Event;

	layout(value: object, tag?: object): Model;
	layout(): LayoutModel;
	layoutChanged: Event;

	navigation(value: object, tag?: object): Model;
	navigation(): NavigationModel;
	navigationChanged: Event;

	focus(value: object, tag?: object): Model;
	focus(): FocusModel;
	focusChanged: Event;

	columnList(value: object, tag?: object): Model;
	columnList(): ColumnListModel;
	columnChanged: Event;

	row(value: object, tag?: object): Model;
	row(): RowModel;	
	rowChanged: Event;

	selection(value: object, tag?: object): Model;
	selection(): SelectionModel;
	selectionChanged: Event;

	foot(value: object, tag?: object): Model;
	foot(): FootModel;
	footChanged: Event;

	sort(value: object, tag?: object): Model;
	sort(): SortModel;

	sortChanged: Event;

	group(value: object, tag?: object): Model;
	grop(): GroupModel;
	groupChanged: Event;

	pivot(value: object, tag?: object): Model;
	pivot(): PivotModel;
	pivotChanged: Event;

	plugin(value: object, tag?: object): Model;
	plugin(): PluginModel;
	pluginChanged: Event;

	toolbar(value: object, tag?: object): Model;
	toolbar(): ToolbarModel;
	toolbarChanged: Event;

	layer(value: object, tag?: object): Model;
	layer(): LayerModel;
	layerChanged: Event;

	pagination(value: object, tag?: object): Model;
	pagination(): PaginationModel;
	paginationChanged: Event;

	progress(value: object, tag?: object): Model;
	progres(): ProgressModel;
	progressChanged: Event;

	highlight(value: object, tag?: object): Model;
	highlight(): HighlightModel;
	highlightChanged: Event;

	visibility(value: object, tag?: object): Model;
	visibility(): VisibilityModel;
	visibilityChanged: Event;

	filter(value: object, tag?: object): Model;
	filter(): FilterModel;
	filterChanged: Event;

	drag(value: object, tag?: object): DragModel;
	drag(): DragModel;
	dragChanged: Event;

	style(value: object, tag?: object): Model;
	style(): StyleModel;
	styleChanged: Event;

	scroll(value: object, tag?: object): Model;
	scroll(): ScrollModel;
	scrollChanged: Event;

	export(value: object, tag?: object): Model;
	export(): ExportModel;
	exportChanged: Event;

	action(value: object, tag?: object): Model;
	action(): ActionModel;
	actionChanged: Event;

	fetch(value: object, tag?: object): Model;
	fetch(): FetchModel;
	fetchChanged: Event;

	persistence(value: object, tag?: object): Model;
	persistence(): PersistenceModel;
	persistenceChanged: Event;

	validation(value: object, tag?: object): Model;
	validation(): ValidationModel;
	validationChanged: Event;
}
