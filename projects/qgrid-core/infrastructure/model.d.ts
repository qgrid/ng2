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

export declare type StateAccessor<
	TStateName extends keyof any,
	TStateChangeName extends keyof any,
	TState
	> =
	StateSet<TStateName, TState>
	& StateGet<TStateName, TState>
	& StateChange<TStateChangeName, TState>;

export declare type StateSet<K extends keyof any, TState> = {
	[P in K]: (state: Partial<TState>, tag?: ModelTag) => Model;
}

export declare type StateGet<K extends keyof any, TState> = {
	[P in K]: () => Readonly<TState>;
}

export declare type StateChange<K extends keyof any, TState> = {
	[P in K]: ModelEvent<TState>;
};

export declare type ActionAccessor = StateAccessor<'action', 'actionChanged', ActionModel>;
export declare type AnimationAccessor = StateAccessor<'animation', 'animationChanged', AnimationModel>;
export declare type BodyAccessor = StateAccessor<'body', 'bodyChanged', BodyModel>;
export declare type ColumnListAccessor = StateAccessor<'columnList', 'columnListChanged', ColumnListModel>;
export declare type DataAccessor = StateAccessor<'data', 'dataChanged', DataModel>;
export declare type DragAccessor = StateAccessor<'drag', 'dragChanged', DragModel>;
export declare type EditAccessor = StateAccessor<'edit', 'editChanged', EditModel>;
export declare type ExportAccessor = StateAccessor<'export', 'exportChanged', ExportModel>;
export declare type FetchAccessor = StateAccessor<'fetch', 'fetchChanged', FetchModel>;
export declare type FilterAccessor = StateAccessor<'filter', 'filterChanged', FilterModel>;
export declare type FocusAccessor = StateAccessor<'focus', 'focusChanged', FocusModel>;
export declare type FootAccessor = StateAccessor<'foot', 'footChanged', FootModel>;
export declare type GridAccessor = StateAccessor<'grid', 'gridChanged', GridModel>;
export declare type GroupAccessor = StateAccessor<'group', 'GroupChanged', GroupModel>;
export declare type HeadAccessor = StateAccessor<'head', 'headChanged', HeadModel>;
export declare type HighlightAccessor = StateAccessor<'highlight', 'highlightChanged', HighlightModel>;
export declare type KeyboardAccessor = StateAccessor<'keyboard', 'keyboardChanged', KeyboardModel>;
export declare type LayerAccessor = StateAccessor<'layer', 'layerChanged', LayerModel>;
export declare type LayoutAccessor = StateAccessor<'layout', 'layoutChanged', LayoutModel>;
export declare type MouseAccessor = StateAccessor<'mouse', 'mouseChanged', MouseModel>;
export declare type NavigationAccessor = StateAccessor<'navigation', 'navigationChanged', NavigationModel>;
export declare type PaginationAccessor = StateAccessor<'pagination', 'paginationChanged', PaginationModel>;
export declare type PersistenceAccessor = StateAccessor<'persistence', 'persistenceChanged', PersistenceModel>;
export declare type PipeAccessor = StateAccessor<'pipe', 'pipeChanged', PipeModel>;
export declare type PivotAccessor = StateAccessor<'pivot', 'PivotChanged', PivotModel>;
export declare type PluginAccessor = StateAccessor<'plugin', 'pluginChanged', PluginModel>;
export declare type ProgressAccessor = StateAccessor<'progress', 'progressChanged', ProgressModel>;
export declare type RestAccessor = StateAccessor<'rest', 'restChanged', RestModel>;
export declare type RowAccessor = StateAccessor<'row', 'rowChanged', RowModel>;
export declare type RowListAccessor = StateAccessor<'rowList', 'rowListChanged', RowListModel>;
export declare type SceneAccessor = StateAccessor<'scene', 'sceneChanged', SceneModel>;
export declare type ScrollAccessor = StateAccessor<'scroll', 'scrollChanged', ScrollModel>;
export declare type SelectionAccessor = StateAccessor<'selection', 'selectionChanged', SelectionModel>;
export declare type SortAccessor = StateAccessor<'sort', 'sortChanged', SortModel>;
export declare type StyleAccessor = StateAccessor<'style', 'styleChanged', StyleModel>;
export declare type ToolbarAccessor = StateAccessor<'toolbar', 'toolbarChanged', ToolbarModel>;
export declare type ValidationAccessor = StateAccessor<'validation', 'validationChanged', ValidationModel>;
export declare type ViewAccessor = StateAccessor<'view', 'viewChanged', ViewModel>;
export declare type VisibilityAccessor = StateAccessor<'visibility', 'visibilityChanged', VisibilityModel>;

export declare type ResolveAccessor = {
	resolve<TState>(type: new () => TState): StateAccessor<'state', 'changed', TState>;
};

export type Model =
	ActionAccessor
	& AnimationAccessor
	& BodyAccessor
	& ColumnListAccessor
	& DataAccessor
	& DragAccessor
	& EditAccessor
	& ExportAccessor
	& FetchAccessor
	& FilterAccessor
	& FocusAccessor
	& FootAccessor
	& GridAccessor
	& GroupAccessor
	& HeadAccessor
	& HighlightAccessor
	& KeyboardAccessor
	& LayerAccessor
	& LayoutAccessor
	& MouseAccessor
	& NavigationAccessor
	& PaginationAccessor
	& PersistenceAccessor
	& PipeAccessor
	& PivotAccessor
	& PluginAccessor
	& ProgressAccessor
	& RestAccessor
	& RowAccessor
	& RowListAccessor
	& SceneAccessor
	& ScrollAccessor
	& SelectionAccessor
	& SortAccessor
	& StyleAccessor
	& ToolbarAccessor
	& ValidationAccessor
	& ViewAccessor
	& VisibilityAccessor
	& ResolveAccessor;
