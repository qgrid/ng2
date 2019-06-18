import { ModelBuilder } from '../infrastructure/model.builder';

const builder = new ModelBuilder();
builder
	.register('grid', GridModel)
	.register('pipe', PipeModel)
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
	.register('rowList', RowListModel)
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
	.register('fetch', FetchModel)
	.register('persistence', PersistenceModel)
	.register('validation', ValidationModel)
	.register('template', TemplateModel)
	.register('rest', RestModel)
	.register('animation', AnimationModel);

export function modelFactory() {
	return builder.build();
}
