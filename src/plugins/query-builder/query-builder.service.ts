import { Injectable } from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { isUndefined, yes } from 'ng2-qgrid/core/utility/index';
import { ExpressionBuilder } from '../expression-builder/model/expression.builder';
import { INodeSchema } from '../expression-builder/model/node.schema';
import { Node } from '../expression-builder/model/node';

export declare type Column = { key: string, title: string, type: string };
export declare type ColumnMap = { [key: string]: Column };

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

@Injectable()
export class QueryBuilderService {
	constructor(private root: RootService) {
	}

	columns(): Array<Column> {
		const model = this.root.model;
		return model
			.data()
			.columns;
	}

	columnMap(): ColumnMap {
		const model = this.root.model;
		return this.columns().reduce((memo, column) => {
			memo[column.key] = column;
			return memo;
		}, {});
	}

	submit(expression) {
		const model = this.root.model;
		model.filter({
			by: expression
		}, {
				source: 'query-builder.service'
			});
	}

	suggest(key, skip, take, search, selection?: Array<string>): Promise<string[]> {
		selection = (selection || []).map(item => ('' + item).toLowerCase());

		const model = this.root.model;
		return new Promise(resolve => {
			const view = model.data().rows
				.map(item => item[key])
				.filter(item =>
					!isUndefined(item) &&
					item !== '' &&
					item !== null &&
					selection.indexOf(('' + item).toLowerCase()) < 0
				);

			// const uniqueView = unique(view);
			// const sortedView = sort(uniqueView);
			// const filterView = filter(sortedView, search);
			// const toggleView = filterView.length ? filterView : sortedView;
			// const pageView = limitTo(limitTo(toggleView, Math.min(toggleView.length, skip) - toggleView.length), take);

			resolve(view);
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
				isVisible: yes,
				isValid: function (node) {
					return node.attr('placeholder') ||
						(!this.state || !this.state.length);
				}
			}
		};

		return new ExpressionBuilder(settings)
			.build<IQueryBuilderSchema>(statements);
	}
}
