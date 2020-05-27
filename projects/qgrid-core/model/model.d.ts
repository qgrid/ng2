import { GridState } from '../grid/grid.state';
import { SceneState } from '../scene/scene.state';
import { ActionState } from '../action/action.state';
import { AnimationState } from '../animation/animation.state';
import { BodyState } from '../body/body.state';
import { ColumnListState } from '../column-list/column.list.state';
import { DataState } from '../data/data.state';
import { DragState } from '../drag/drag.state';
import { EditState } from '../edit/edit.state';
import { ExportState } from '../export/export.state';
import { FetchState } from '../fetch/fetch.state';
import { FilterState } from '../filter/filter.state';
import { FocusState } from '../focus/focus.state';
import { FootState } from '../foot/foot.state';
import { GroupState } from '../group/group.state';
import { HeadState } from '../head/head.state';
import { HighlightState } from '../highlight/highlight.state';
import { KeyboardState } from '../keyboard/keyboard.state';
import { LayerState } from '../layer/layer.state';
import { LayoutState } from '../layout/layout.state';
import { ModelTag, ModelEvent } from './model.event';
import { MouseState } from '../mouse/mouse.state';
import { NavigationState } from '../navigation/navigation.state';
import { PaginationState } from '../pagination/pagination.state';
import { PersistenceState } from '../persistence/persistence.state';
import { PipeState } from '../pipe/pipe.state';
import { PivotState } from '../pivot/pivot.state';
import { PluginState } from '../plugin/plugin.state';
import { ProgressState } from '../progress/progress.state';
import { RestState } from '../rest/rest.state';
import { RowListState } from '../row-list/row.list.state';
import { RowState } from '../row/row.state';
import { ScrollState } from '../scroll/scroll.state';
import { SelectionState } from '../selection/selection.state';
import { SortState } from '../sort/sort.state';
import { StyleState } from '../style/style.state';
import { ToolbarState } from '../toolbar/toolbar.state';
import { ValidationState } from '../validation/validation.state';
import { ViewState } from '../view/view.state';
import { VisibilityState } from '../visibility/visibility.state';
import { ClipboardState } from '../clipboard/clipboard.state';

export declare type StateSet<K extends keyof any, TState> = {
	[P in K]: (state: Partial<TState>, tag?: ModelTag) => Model;
}

export declare type StateGet<K extends keyof any, TState> = {
	[P in K]: () => Readonly<TState>;
}

export declare type StateChange<K extends keyof any, TState> = {
	[P in K]: ModelEvent<TState>;
};

export declare type StateAccessor<
	TStateName extends keyof any,
	TStateChangeName extends keyof any,
	TState
	> =
	StateSet<TStateName, TState>
	& StateGet<TStateName, TState>
	& StateChange<TStateChangeName, TState>;

export declare type ActionAccessor = StateAccessor<'action', 'actionChanged', ActionState>;
export declare type AnimationAccessor = StateAccessor<'animation', 'animationChanged', AnimationState>;
export declare type BodyAccessor = StateAccessor<'body', 'bodyChanged', BodyState>;
export declare type ColumnListAccessor = StateAccessor<'columnList', 'columnListChanged', ColumnListState>;
export declare type DataAccessor = StateAccessor<'data', 'dataChanged', DataState>;
export declare type DragAccessor = StateAccessor<'drag', 'dragChanged', DragState>;
export declare type EditAccessor = StateAccessor<'edit', 'editChanged', EditState>;
export declare type ExportAccessor = StateAccessor<'export', 'exportChanged', ExportState>;
export declare type FetchAccessor = StateAccessor<'fetch', 'fetchChanged', FetchState>;
export declare type FilterAccessor = StateAccessor<'filter', 'filterChanged', FilterState>;
export declare type FocusAccessor = StateAccessor<'focus', 'focusChanged', FocusState>;
export declare type FootAccessor = StateAccessor<'foot', 'footChanged', FootState>;
export declare type GridAccessor = StateAccessor<'grid', 'gridChanged', GridState>;
export declare type GroupAccessor = StateAccessor<'group', 'groupChanged', GroupState>;
export declare type HeadAccessor = StateAccessor<'head', 'headChanged', HeadState>;
export declare type HighlightAccessor = StateAccessor<'highlight', 'highlightChanged', HighlightState>;
export declare type KeyboardAccessor = StateAccessor<'keyboard', 'keyboardChanged', KeyboardState>;
export declare type LayerAccessor = StateAccessor<'layer', 'layerChanged', LayerState>;
export declare type LayoutAccessor = StateAccessor<'layout', 'layoutChanged', LayoutState>;
export declare type MouseAccessor = StateAccessor<'mouse', 'mouseChanged', MouseState>;
export declare type NavigationAccessor = StateAccessor<'navigation', 'navigationChanged', NavigationState>;
export declare type PaginationAccessor = StateAccessor<'pagination', 'paginationChanged', PaginationState>;
export declare type PersistenceAccessor = StateAccessor<'persistence', 'persistenceChanged', PersistenceState>;
export declare type PipeAccessor = StateAccessor<'pipe', 'pipeChanged', PipeState>;
export declare type PivotAccessor = StateAccessor<'pivot', 'pivotChanged', PivotState>;
export declare type PluginAccessor = StateAccessor<'plugin', 'pluginChanged', PluginState>;
export declare type ProgressAccessor = StateAccessor<'progress', 'progressChanged', ProgressState>;
export declare type RestAccessor = StateAccessor<'rest', 'restChanged', RestState>;
export declare type RowAccessor = StateAccessor<'row', 'rowChanged', RowState>;
export declare type RowListAccessor = StateAccessor<'rowList', 'rowListChanged', RowListState>;
export declare type SceneAccessor = StateAccessor<'scene', 'sceneChanged', SceneState>;
export declare type ScrollAccessor = StateAccessor<'scroll', 'scrollChanged', ScrollState>;
export declare type SelectionAccessor = StateAccessor<'selection', 'selectionChanged', SelectionState>;
export declare type SortAccessor = StateAccessor<'sort', 'sortChanged', SortState>;
export declare type StyleAccessor = StateAccessor<'style', 'styleChanged', StyleState>;
export declare type ToolbarAccessor = StateAccessor<'toolbar', 'toolbarChanged', ToolbarState>;
export declare type ValidationAccessor = StateAccessor<'validation', 'validationChanged', ValidationState>;
export declare type ViewAccessor = StateAccessor<'view', 'viewChanged', ViewState>;
export declare type VisibilityAccessor = StateAccessor<'visibility', 'visibilityChanged', VisibilityState>;
export declare type ClipboardAccessor = StateAccessor<'clipboard', 'clipboardChanged', ClipboardState>;

export declare type ResolveAccessor = {
	resolve<TState>(type: new () => TState): StateAccessor<'state', 'changed', TState>;
};

export type Model =
	ActionAccessor
	& AnimationAccessor
	& BodyAccessor
	& ColumnListAccessor
	& ClipboardAccessor
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
