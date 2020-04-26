import { GridError, GridModel } from '@qgrid/ngx';
import { isUndefined, uniq } from '@qgrid/core/utility/kit';
import { ExpressionBuilder } from '../expression-builder/model/expression.builder';
import { Node } from '../expression-builder/model/node';
import { typeMapping } from './schema/operator';
import { getFactory } from '@qgrid/core/services/value';
import * as columnService from '@qgrid/core/column/column.service';

export interface Column {
	key: string; title: string; type: string;
}

export interface ColumnMap {
	[key: string]: Column;
}

export interface IQueryBuilderSchema {
	apply(node?: Node): Node;
	attr(key: string, value: any): IQueryBuilderSchema;
	node(id: string, build: (schema: IQueryBuilderSchema) => void): IQueryBuilderSchema;
	group(id: string, build: (schema: IQueryBuilderSchema) => void): IQueryBuilderSchema;
	get(id: string): IQueryBuilderSchema;
	materialize(id: string): Node;

	autocomplete(id: string, settings?: any): IQueryBuilderSchema;
	button(id: string, settings?: any): IQueryBuilderSchema;
	input(id: string, settings?: any): IQueryBuilderSchema;
	iconButton(id: string, settings?: any): IQueryBuilderSchema;
	label(id: string, settings?: any): IQueryBuilderSchema;
	multiselect(id: string, settings?: any): IQueryBuilderSchema;
	select(id: string, settings?: any): IQueryBuilderSchema;
}

export class QueryBuilderService {
	constructor(private model: GridModel) {
	}

	columns(): Array<Column> {
		const model = this.model;
		return model
			.columnList()
			.line
			.filter(column => typeMapping.hasOwnProperty(column.type))
			.map(column => ({
				key: column.key,
				title: column.title,
				type: column.type
			}));
	}

	columnMap(): ColumnMap {
		return this.columns().reduce((memo, column) => {
			memo[column.key] = column;
			return memo;
		}, {});
	}

	submit(expression) {
		const model = this.model;
		model.filter({
			by: expression
		}, {
				source: 'query-builder.service'
			});
	}

	suggest(key, skip, take, search, selection?: Array<string>): Promise<string[]> {
		selection = (selection || []).map(item => ('' + item).toLowerCase());

		const model = this.model;
		const columnMap = columnService.map(model.columnList().line);
		const column = columnMap[key];
		if (!column) {
			throw new GridError('query-builder.service', `Column ${key} is not found`);
		}

		const getValue = getFactory(column);
		return new Promise(resolve => {
			const view = model
				.data()
				.rows
				.map(getValue)
				.filter(item =>
					!isUndefined(item) &&
					item !== '' &&
					item !== null &&
					selection.indexOf(('' + item).toLowerCase()) < 0
				);

			const uniqueView = uniq(view);
			const sortedView = uniqueView.sort();
			const searchText = ('' + search).toLowerCase();
			const filterView = searchText
				? sortedView.filter(x => ('' + x).toLowerCase().indexOf(searchText) >= 0)
				: sortedView;

			const toggleView = filterView.length ? filterView : sortedView;
			const pageView = toggleView.slice(skip, take);
			resolve(pageView);
		});
	}

	build(): IQueryBuilderSchema {
		const statements = [
			{
				type: 'label',
				templateKey: 'plugin-eb-label.tpl.html'
			},
			{
				type: 'input',
				templateKey: 'plugin-eb-input.tpl.html'
			},
			{
				type: 'select',
				templateKey: 'plugin-eb-select.tpl.html'
			},
			{
				type: 'button',
				templateKey: 'plugin-eb-button.tpl.html'
			},
			{
				type: 'iconButton',
				templateKey: 'plugin-eb-icon-button.tpl.html'
			},
			{
				type: 'autocomplete',
				templateKey: 'plugin-eb-autocomplete.tpl.html'
			},
			{
				type: 'multiselect',
				templateKey: 'plugin-eb-multiselect.tpl.html'
			}
		];

		const settings = {
			defaults: {
				isValid: function () {
					return !this.validate || !(this.state = this.validate()).length;
				}
			}
		};

		return new ExpressionBuilder(settings)
			.build<IQueryBuilderSchema>(statements);
	}
}
