import { GridModel } from '../grid/grid.model';
import { SceneModel } from '../scene/scene.model';
import { ViewModel } from '../view/view.model';
import { DataModel } from '../data/data.model';
import { HeadModel } from '../head/head.model';
import { BodyModel } from '../body/body.model';
import { LayoutModel } from '../layout/layout.model';
import { NavigationModel } from '../navigation/navigation.model';
import { FocusModel } from '../focus/focus.model';
import { ColumnListModel } from '../column-list/column.list.model';
import { RowModel } from '../row/row.model';
import { SelectionModel } from '../selection/selection.model';
import { FootModel } from '../foot/foot.model';
import { SortModel } from '../sort/sort.model';
import { GroupModel } from '../group/group.model';
import { PivotModel } from '../pivot/pivot.model';
import { PluginModel } from '../plugin/plugin.model';
import { EditModel } from '../edit/edit.model';
import { ToolbarModel } from '../toolbar/toolbar.model';
import { LayerModel } from '../layer/layer.model';
import { PaginationModel } from '../pagination/pagination.model';
import { ProgressModel } from '../progress/progress.model';
import { HighlightModel } from '../highlight/highlight.model';
import { VisibilityModel } from '../visibility/visibility.model';
import { FilterModel } from '../filter/filter.model';
import { DragModel } from '../drag/drag.model';
import { StyleModel } from '../style/style.model';
import { ScrollModel } from '../scroll/scroll.model';
import { ExportModel } from '../export/export.model';
import { ActionModel } from '../action/action.model';
import { FetchModel } from '../fetch/fetch.model';
import { ValidationModel } from '../validation/validation.model';
import { Event } from './event';
import { PersistenceModel } from '../persistence/persistence.model';
import { PipeModel } from '../pipe/pipe.model';
import { RestModel } from '../rest/rest.model';
import { AnimationModel } from '../animation/animation.model';
import { RowListModel } from '../row-list/row.list.model';
import { KeyboardModel } from '../keyboard/keyboard.model';
import { MouseModel } from '../mouse/mouse.model';

export declare interface ModelTag {
	source?: string;
	behavior?: string;
	isBusy?: boolean;
}

export declare type ModelChanges<TState> = { [key in keyof TState]: { newValue: TState[key] | null, oldValue: TState[key] | null } };

export declare interface ModelEventArg<TState> {
	state: TState;
	changes: ModelChanges<TState>;
	tag: ModelTag;

	hasChanges<TKey extends keyof TState>(key: TKey): boolean;
}

export declare type ModelEvent<T> = Event<ModelEventArg<T>>;

type StateAccessor<
	TStateName extends keyof any,
	TStateChangeName extends keyof any,
	TState
	> =
	StateSet<TStateName, TState>
	& StateGet<TStateName, TState>
	& StateChange<TStateChangeName, TState>;

type StateSet<K extends keyof any, TState> = {
	[P in K]: (state: Partial<TState>, tag?: ModelTag) => Model;
}

type StateGet<K extends keyof any, TState> = {
	[P in K]: () => Readonly<Model>;
}

type StateChange<K extends keyof any, TState> = {
	[P in K]: ModelEvent<TState>;
};


declare type GridAccessor = StateAccessor<'grid', 'gridChanged', GridModel>;

export declare interface Model {
	gridChanged: ModelEvent<GridModel>;
	grid(value: Partial<GridModel>, tag?: ModelTag): Model;
	grid(): Readonly<GridModel>;

	pipeChanged: ModelEvent<PipeModel>;
	pipe(value: Partial<PipeModel>, tag?: ModelTag): Model;
	pipe(): Readonly<PipeModel>;

	sceneChanged: ModelEvent<SceneModel>;
	scene(value: Partial<SceneModel>, tag?: ModelTag): Model;
	scene(): Readonly<SceneModel>;

	editChanged: ModelEvent<EditModel>;
	edit(value: Partial<EditModel>, tag?: ModelTag): Model;
	edit(): Readonly<EditModel>;

	viewChanged: ModelEvent<ViewModel>;
	view(value: Partial<ViewModel>, tag?: ModelTag): Model;
	view(): Readonly<ViewModel>;

	dataChanged: ModelEvent<DataModel>;
	data(value: Partial<DataModel>, tag?: ModelTag): Model;
	data(): Readonly<DataModel>;

	headChanged: ModelEvent<HeadModel>;
	head(value: Partial<HeadModel>, tag?: ModelTag): Model;
	head(): Readonly<HeadModel>;

	bodyChanged: ModelEvent<BodyModel>;
	body(value: Partial<BodyModel>, tag?: ModelTag): Model;
	body(): Readonly<BodyModel>;

	layoutChanged: ModelEvent<LayoutModel>;
	layout(value: Partial<LayoutModel>, tag?: ModelTag): Model;
	layout(): Readonly<LayoutModel>;

	navigationChanged: ModelEvent<NavigationModel>;
	navigation(value: Partial<NavigationModel>, tag?: ModelTag): Model;
	navigation(): Readonly<NavigationModel>;

	focusChanged: ModelEvent<FocusModel>;
	focus(value: Partial<FocusModel>, tag?: ModelTag): Model;
	focus(): Readonly<FocusModel>;

	columnListChanged: ModelEvent<ColumnListModel>;
	columnList(value: Partial<ColumnListModel>, tag?: ModelTag): Model;
	columnList(): Readonly<ColumnListModel>;

	rowChanged: ModelEvent<RowModel>;
	row(value: Partial<RowModel>, tag?: ModelTag): Model;
	row(): Readonly<RowModel>;

	rowListChanged: ModelEvent<RowListModel>;
	rowList(value: Partial<RowListModel>, tag?: ModelTag): Model;
	rowList(): Readonly<RowListModel>;

	selectionChanged: ModelEvent<SelectionModel>;
	selection(value: Partial<SelectionModel>, tag?: ModelTag): Model;
	selection(): Readonly<SelectionModel>;

	footChanged: ModelEvent<FootModel>;
	foot(value: Partial<FootModel>, tag?: ModelTag): Model;
	foot(): Readonly<FootModel>;

	sortChanged: ModelEvent<SortModel>;
	sort(value: Partial<SortModel>, tag?: ModelTag): Model;
	sort(): Readonly<SortModel>;

	groupChanged: ModelEvent<GroupModel>;
	group(value: Partial<GroupModel>, tag?: ModelTag): Model;
	group(): Readonly<GroupModel>;

	pivotChanged: ModelEvent<PivotModel>;
	pivot(value: Partial<PivotModel>, tag?: ModelTag): Model;
	pivot(): Readonly<PivotModel>;

	pluginChanged: ModelEvent<PluginModel>;
	plugin(value: Partial<PluginModel>, tag?: ModelTag): Model;
	plugin(): Readonly<PluginModel>;

	toolbarChanged: ModelEvent<ToolbarModel>;
	toolbar(value: Partial<ToolbarModel>, tag?: ModelTag): Model;
	toolbar(): Readonly<ToolbarModel>;

	layerChanged: ModelEvent<LayerModel>;
	layer(value: Partial<LayerModel>, tag?: ModelTag): Model;
	layer(): Readonly<LayerModel>;

	paginationChanged: ModelEvent<PaginationModel>;
	pagination(value: Partial<PaginationModel>, tag?: ModelTag): Model;
	pagination(): Readonly<PaginationModel>;

	progressChanged: ModelEvent<ProgressModel>;
	progress(value: Partial<ProgressModel>, tag?: ModelTag): Model;
	progress(): Readonly<ProgressModel>;

	highlightChanged: ModelEvent<HighlightModel>;
	highlight(value: Partial<HighlightModel>, tag?: ModelTag): Model;
	highlight(): Readonly<HighlightModel>;

	visibilityChanged: ModelEvent<VisibilityModel>;
	visibility(value: Partial<VisibilityModel>, tag?: ModelTag): Model;
	visibility(): Readonly<VisibilityModel>;

	filterChanged: ModelEvent<FilterModel>;
	filter(value: Partial<FilterModel>, tag?: ModelTag): Model;
	filter(): Readonly<FilterModel>;

	dragChanged: ModelEvent<DragModel>;
	drag(value: Partial<DragModel>, tag?: ModelTag): Model;
	drag(): Readonly<DragModel>;

	styleChanged: ModelEvent<StyleModel>;
	style(value: Partial<StyleModel>, tag?: ModelTag): Model;
	style(): Readonly<StyleModel>;

	scrollChanged: ModelEvent<ScrollModel>;
	scroll(value: Partial<ScrollModel>, tag?: ModelTag): Model;
	scroll(): Readonly<ScrollModel>;

	exportChanged: ModelEvent<ExportModel>;
	export(value: Partial<ExportModel>, tag?: ModelTag): Model;
	export(): Readonly<ExportModel>;

	actionChanged: ModelEvent<ActionModel>;
	action(value: Partial<ActionModel>, tag?: ModelTag): Model;
	action(): Readonly<ActionModel>;

	fetchChanged: ModelEvent<FetchModel>;
	fetch(value: FetchModel, tag?: ModelTag): Model;
	fetch(): Readonly<FetchModel>;

	persistenceChanged: ModelEvent<PersistenceModel>;
	persistence(value: Partial<PersistenceModel>, tag?: ModelTag): Model;
	persistence(): Readonly<PersistenceModel>;

	validationChanged: ModelEvent<ValidationModel>;
	validation(value: Partial<ValidationModel>, tag?: ModelTag): Model;
	validation(): Readonly<ValidationModel>;

	restChanged: ModelEvent<RestModel>;
	rest(value: Partial<RestModel>, tag?: ModelTag): Model;
	rest(): Readonly<RestModel>;

	animationChanged: ModelEvent<AnimationModel>;
	animation(value: Partial<AnimationModel>, tag?: ModelTag): Model;
	animation(): Readonly<AnimationModel>;

	keyboardChanged: ModelEvent<KeyboardModel>;
	keyboard(value: Partial<KeyboardModel>, tag?: ModelTag): Model;
	keyboard(): Readonly<KeyboardModel>;

	mouseChanged: ModelEvent<MouseModel>;
	mouse(value: Partial<MouseModel>, tag?: ModelTag): Model;
	mouse(): Readonly<MouseModel>;

	queryBuilderChanged: ModelEvent<any>;
	queryBuilder(value: any, tag?: ModelTag): Model;
	queryBuilder(): any;

	dataManipulationChanged: ModelEvent<any>;
	dataManipulation(value: any, tag?: ModelTag): Model;
	dataManipulation(): any;

	columnFilterChanged: ModelEvent<any>;
	columnFilter(value: any, tag?: ModelTag): Model;
	columnFilter(): any;
}
