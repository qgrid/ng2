import { ActionState } from '../action/action.state';
import { AnimationState } from '../animation/animation.state';
import { GridError } from '../infrastructure/error';
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
import { GridState } from '../grid/grid.state';
import { GroupState } from '../group/group.state';
import { HeadState } from '../head/head.state';
import { HighlightState } from '../highlight/highlight.state';
import { ImportState } from '../import/import.state';
import { isFunction } from '../utility/kit';
import { KeyboardState } from '../keyboard/keyboard.state';
import { LayerState } from '../layer/layer.state';
import { LayoutState } from '../layout/layout.state';
import { Model } from './model';
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
import { SceneState } from '../scene/scene.state';
import { ScrollState } from '../scroll/scroll.state';
import { SelectionState } from '../selection/selection.state';
import { SortState } from '../sort/sort.state';
import { StyleState } from '../style/style.state';
import { TemplateState } from '../template/template.state';
import { ToolbarState } from '../toolbar/toolbar.state';
import { ValidationState } from '../validation/validation.state';
import { ViewState } from '../view/view.state';
import { VisibilityState } from '../visibility/visibility.state';
import { ClipboardState } from '../clipboard/clipboard.state';

export class ModelBuilder {
    constructor() {
        this.state = {};

        this
            .register('action', ActionState)
            .register('animation', AnimationState)
            .register('body', BodyState)
            .register('clipboard', ClipboardState)
            .register('columnList', ColumnListState)
            .register('data', DataState)
            .register('drag', DragState)
            .register('edit', EditState)
            .register('export', ExportState)
            .register('fetch', FetchState)
            .register('filter', FilterState)
            .register('focus', FocusState)
            .register('foot', FootState)
            .register('grid', GridState)
            .register('group', GroupState)
            .register('head', HeadState)
            .register('highlight', HighlightState)
            .register('import', ImportState)
            .register('keyboard', KeyboardState)
            .register('layer', LayerState)
            .register('layout', LayoutState)
            .register('mouse', MouseState)
            .register('navigation', NavigationState)
            .register('pagination', PaginationState)
            .register('persistence', PersistenceState)
            .register('pipe', PipeState)
            .register('pivot', PivotState)
            .register('plugin', PluginState)
            .register('progress', ProgressState)
            .register('rest', RestState)
            .register('row', RowState)
            .register('rowList', RowListState)
            .register('scene', SceneState)
            .register('scroll', ScrollState)
            .register('selection', SelectionState)
            .register('sort', SortState)
            .register('style', StyleState)
            .register('template', TemplateState)
            .register('toolbar', ToolbarState)
            .register('validation', ValidationState)
            .register('view', ViewState)
            .register('visibility', VisibilityState);
    }

    register(key, ctor) {
        if (this.state.hasOwnProperty(key)) {
            throw new GridError(
                'model',
                `"${key}" is already registered`);
        }

        if (!isFunction(ctor)) {
            throw new GridError(
                `model.${key}`,
                `"${ctor}" is not a valid type, should be an constructor function`);
        }

        this.state[key] = ctor;
        return this;
    }

    build() {
        const { state } = this;
        const model = new Model();
        for (let name of Object.keys(state)) {
            const Type = state[name];
            model.inject(name, Type);
        }

        return model;
    }
}