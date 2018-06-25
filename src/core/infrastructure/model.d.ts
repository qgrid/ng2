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

export declare interface ModelTag {
	source?: string;
	behavior?: string;
	isBusy?: boolean;
}

export declare interface ModelEventArg<T> {
	state: T;
	changes: { [key: string]: { newValue: any, oldValue: any } };
	hasChanges: (key: string) => boolean;
	tag: ModelTag;
}

export declare type ModelEvent<T> = Event<ModelEventArg<T>>;

export declare class Model {
	static register(name: string, model: { new(): {} }): typeof Model;

	gridChanged: ModelEvent<GridModel>;
	grid(value: object, tag?: ModelTag): Model;
	grid(): GridModel;

	pipeChanged: ModelEvent<PipeModel>;
	pipe(value: PipeModel, tag?: ModelTag): Model;
	pipe(): PipeModel;

	sceneChanged: ModelEvent<SceneModel>;
	scene(value: SceneModel, tag?: ModelTag): Model;
	scene(): SceneModel;

	editChanged: ModelEvent<EditModel>;
	edit(value: EditModel, tag?: ModelTag): Model;
	edit(): EditModel;

	viewChanged: ModelEvent<ViewModel>;
	view(value: ViewModel, tag?: ModelTag): Model;
	view(): ViewModel;

	dataChanged: ModelEvent<DataModel>;
	data(value: DataModel, tag?: ModelTag): Model;
	data(): DataModel;

	headChanged: ModelEvent<HeadModel>;
	head(value: HeadModel, tag?: ModelTag): Model;
	head(): HeadModel;

	bodyChanged: ModelEvent<BodyModel>;
	body(value: BodyModel, tag?: ModelTag): Model;
	body(): BodyModel;

	layoutChanged: ModelEvent<LayoutModel>;
	layout(value: LayoutModel, tag?: ModelTag): Model;
	layout(): LayoutModel;

	navigationChanged: ModelEvent<NavigationModel>;
	navigation(value: NavigationModel, tag?: ModelTag): Model;
	navigation(): NavigationModel;

	focusChanged: ModelEvent<FocusModel>;
	focus(value: FocusModel, tag?: ModelTag): Model;
	focus(): FocusModel;

	columnListChanged: ModelEvent<ColumnListModel>;
	columnList(value: ColumnListModel, tag?: ModelTag): Model;
	columnList(): ColumnListModel;

	rowChanged: ModelEvent<RowModel>;
	row(value: RowModel, tag?: ModelTag): Model;
	row(): RowModel;

	rowListChanged: ModelEvent<RowListModel>;
	rowList(value: RowListModel, tag?: ModelTag): Model;
	rowList(): RowListModel;

	selectionChanged: ModelEvent<SelectionModel>;
	selection(value: SelectionModel, tag?: ModelTag): Model;
	selection(): SelectionModel;

	footChanged: ModelEvent<FootModel>;
	foot(value: FootModel, tag?: ModelTag): Model;
	foot(): FootModel;

	sortChanged: ModelEvent<SortModel>;
	sort(value: SortModel, tag?: ModelTag): Model;
	sort(): SortModel;

	groupChanged: ModelEvent<GroupModel>;
	group(value: GroupModel, tag?: ModelTag): Model;
	grop(): GroupModel;

	pivotChanged: ModelEvent<PivotModel>;
	pivot(value: PivotModel, tag?: ModelTag): Model;
	pivot(): PivotModel;

	pluginChanged: ModelEvent<PluginModel>;
	plugin(value: PluginModel, tag?: ModelTag): Model;
	plugin(): PluginModel;

	toolbarChanged: ModelEvent<ToolbarModel>;
	toolbar(value: ToolbarModel, tag?: ModelTag): Model;
	toolbar(): ToolbarModel;

	layerChanged: ModelEvent<LayerModel>;
	layer(value: LayerModel, tag?: ModelTag): Model;
	layer(): LayerModel;

	paginationChanged: ModelEvent<PaginationModel>;
	pagination(value: PaginationModel, tag?: ModelTag): Model;
	pagination(): PaginationModel;

	progressChanged: ModelEvent<ProgressModel>;
	progress(value: ProgressModel, tag?: ModelTag): Model;
	progress(): ProgressModel;

	highlightChanged: ModelEvent<HighlightModel>;
	highlight(value: HighlightModel, tag?: ModelTag): Model;
	highlight(): HighlightModel;

	visibilityChanged: ModelEvent<VisibilityModel>;
	visibility(value: VisibilityModel, tag?: ModelTag): Model;
	visibility(): VisibilityModel;

	filterChanged: ModelEvent<FilterModel>;
	filter(value: FilterModel, tag?: ModelTag): Model;
	filter(): FilterModel;

	dragChanged: ModelEvent<DragModel>;
	drag(value: DragModel, tag?: ModelTag): Model;
	drag(): DragModel;

	styleChanged: ModelEvent<StyleModel>;
	style(value: StyleModel, tag?: ModelTag): Model;
	style(): StyleModel;

	scrollChanged: ModelEvent<ScrollModel>;
	scroll(value: ScrollModel, tag?: ModelTag): Model;
	scroll(): ScrollModel;

	exportChanged: ModelEvent<ExportModel>;
	export(value: ExportModel, tag?: ModelTag): Model;
	export(): ExportModel;

	actionChanged: ModelEvent<ActionModel>;
	action(value: ActionModel, tag?: ModelTag): Model;
	action(): ActionModel;

	fetchChanged: ModelEvent<FetchModel>;
	fetch(value: FetchModel, tag?: ModelTag): Model;
	fetch(): FetchModel;

	persistenceChanged: ModelEvent<PersistenceModel>;
	persistence(value: PersistenceModel, tag?: ModelTag): Model;
	persistence(): PersistenceModel;

	validationChanged: ModelEvent<ValidationModel>;
	validation(value: ValidationModel, tag?: ModelTag): Model;
	validation(): ValidationModel;

	restChanged: ModelEvent<RestModel>;
	rest(value: RestModel, tag?: ModelTag): Model;
	rest(): RestModel;

	animationChanged: ModelEvent<AnimationModel>;
	animation(value: AnimationModel, tag?: ModelTag): Model;
	animation(): AnimationModel;

	queryBuilderChanged: ModelEvent<any>;
	queryBuilder(value: object, tag?: ModelTag): Model;
	queryBuilder(): any;

	dataManipulationChanged: ModelEvent<any>;
	dataManipulation(value: object, tag?: ModelTag): Model;
	dataManipulation(): any;

	columnFilterChanged: ModelEvent<any>;
	columnFilter(value: object, tag?: ModelTag): Model;
	columnFilter(): any;
}
