import { ActionModel } from '../action/action.model';
import { AnimationModel } from '../animation/animation.model';
import { AppError } from './error';
import { BodyModel } from '../body/body.model';
import { ColumnListModel } from '../column-list/column.list.model';
import { DataModel } from '../data/data.model';
import { DragModel } from '../drag/drag.model';
import { EditModel } from '../edit/edit.model';
import { ExportModel } from '../export/export.model';
import { FetchModel } from '../fetch/fetch.model';
import { FilterModel } from '../filter/filter.model';
import { FocusModel } from '../focus/focus.model';
import { FootModel } from '../foot/foot.model';
import { GridModel } from '../grid/grid.model';
import { GroupModel } from '../group/group.model';
import { HeadModel } from '../head/head.model';
import { HighlightModel } from '../highlight/highlight.model';
import { ImportModel } from '../import/import.model';
import { isFunction } from '../utility/kit';
import { KeyboardModel } from '../keyboard/keyboard.model';
import { LayerModel } from '../layer/layer.model';
import { LayoutModel } from '../layout/layout.model';
import { Model } from './model';
import { MouseModel } from '../mouse/mouse.model';
import { NavigationModel } from '../navigation/navigation.model';
import { PaginationModel } from '../pagination/pagination.model';
import { PersistenceModel } from '../persistence/persistence.model';
import { PipeModel } from '../pipe/pipe.model';
import { PivotModel } from '../pivot/pivot.model';
import { PluginModel } from '../plugin/plugin.model';
import { ProgressModel } from '../progress/progress.model';
import { RestModel } from '../rest/rest.model';
import { RowListModel } from '../row-list/row.list.model';
import { RowModel } from '../row/row.model';
import { SceneModel } from '../scene/scene.model';
import { ScrollModel } from '../scroll/scroll.model';
import { SelectionModel } from '../selection/selection.model';
import { SortModel } from '../sort/sort.model';
import { StyleModel } from '../style/style.model';
import { TemplateModel } from '../template/template.model';
import { ToolbarModel } from '../toolbar/toolbar.model';
import { ValidationModel } from '../validation/validation.model';
import { ViewModel } from '../view/view.model';
import { VisibilityModel } from '../visibility/visibility.model';

export class ModelBuilder {
    constructor() {
        this.state = {};

        this
            .register('action', ActionModel)
            .register('animation', AnimationModel)
            .register('body', BodyModel)
            .register('columnList', ColumnListModel)
            .register('data', DataModel)
            .register('drag', DragModel)
            .register('edit', EditModel)
            .register('export', ExportModel)
            .register('fetch', FetchModel)
            .register('filter', FilterModel)
            .register('focus', FocusModel)
            .register('foot', FootModel)
            .register('grid', GridModel)
            .register('group', GroupModel)
            .register('head', HeadModel)
            .register('highlight', HighlightModel)
            .register('import', ImportModel)
            .register('keyboard', KeyboardModel)
            .register('layer', LayerModel)
            .register('layout', LayoutModel)
            .register('mouse', MouseModel)
            .register('navigation', NavigationModel)
            .register('pagination', PaginationModel)
            .register('persistence', PersistenceModel)
            .register('pipe', PipeModel)
            .register('pivot', PivotModel)
            .register('plugin', PluginModel)
            .register('progress', ProgressModel)
            .register('rest', RestModel)
            .register('row', RowModel)
            .register('rowList', RowListModel)
            .register('scene', SceneModel)
            .register('scroll', ScrollModel)
            .register('selection', SelectionModel)
            .register('sort', SortModel)
            .register('style', StyleModel)
            .register('template', TemplateModel)
            .register('toolbar', ToolbarModel)
            .register('validation', ValidationModel)
            .register('view', ViewModel)
            .register('visibility', VisibilityModel);
    }

    register(key, ctor) {
        if (this.state.hasOwnProperty(key)) {
            throw new AppError(
                'model',
                `"${key}" is already registered`);
        }

        if (!isFunction(ctor)) {
            throw new AppError(
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