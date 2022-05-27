import * as columnService from '@qgrid/core';
import { getValueFactory, isUndefined, uniq } from '@qgrid/core';
import { GridError, GridModel } from '@qgrid/ngx';
import { Expression } from '../expression-builder/model/expression';
import { ExpressionBuilder } from '../expression-builder/model/expression.builder';
import { Line } from '../expression-builder/model/line';
import { Node } from '../expression-builder/model/node';
import { typeMapping } from './schema/operator';

export interface Column {
  key: string;
  title: string;
  type: string;
}

export interface ColumnMap {
  [key: string]: Column;
}

type AcceptableValues = string | string[] | Promise<string[]> | boolean;

type QueryBuilderSetting =
  AcceptableValues |
  { [key: string]: boolean | ((node?: Node) => boolean) } |
  ((node?: Node, line?: Line, key?: string) => AcceptableValues | void);

export interface QueryBuilderSettings {
  [key: string]: QueryBuilderSetting;
}

interface QueryBuilderSchemaAttributes {
  [key: string]: boolean | string[] | ((node: Node) => boolean);
}

export interface IQueryBuilderSchema {
  apply(node?: Node): Node;
  attr(key: string, value: QueryBuilderSchemaAttributes): IQueryBuilderSchema;
  node(id: string, build: (schema: IQueryBuilderSchema) => void): IQueryBuilderSchema;
  group(id: string, build: (schema: IQueryBuilderSchema) => void): IQueryBuilderSchema;
  get(id: string): IQueryBuilderSchema;
  materialize(id: string): Node;

  autocomplete(id: string, settings?: QueryBuilderSettings): IQueryBuilderSchema;
  button(id: string, settings?: QueryBuilderSettings): IQueryBuilderSchema;
  input(id: string, settings?: QueryBuilderSettings): IQueryBuilderSchema;
  iconButton(id: string, settings?: QueryBuilderSettings): IQueryBuilderSchema;
  label(id: string, settings?: QueryBuilderSettings): IQueryBuilderSchema;
  multiselect(id: string, settings?: QueryBuilderSettings): IQueryBuilderSchema;
  select(id: string, settings?: QueryBuilderSettings): IQueryBuilderSchema;
}

export class QueryBuilderService {
  constructor(
    private model: GridModel,
  ) { }

  columns(): Column[] {
    const model = this.model;
    return model
      .columnList()
      .line
      .filter(column => Object.prototype.hasOwnProperty.call(typeMapping, column.type))
      .map(column => ({
        key: column.key,
        title: column.title,
        type: column.type,
      }));
  }

  columnMap(): ColumnMap {
    return this.columns().reduce((memo, column) => {
      memo[column.key as keyof ColumnMap] = column;
      return memo;
    }, {} as ColumnMap);
  }

  submit(expression: Expression) {
    const model = this.model;
    model.filter({
      by: expression,
    }, {
      source: 'query-builder.service',
    });
  }

  suggest(key: string, skip: number, take: number, search: string, selection?: string[]): Promise<string[]> {
    selection = (selection || []).map(item => ('' + item).toLowerCase());

    const model = this.model;
    const columnMap = columnService.mapColumns(model.columnList().line);
    const column = columnMap[key];
    if (!column) {
      throw new GridError('query-builder.service', `Column ${key} is not found`);
    }

    const getValue = getValueFactory(column);
    return new Promise(resolve => {
      const view = model
        .data()
        .rows
        .map(getValue)
        .filter(item =>
          !isUndefined(item) &&
          item !== '' &&
          item !== null &&
          selection.indexOf(('' + item).toLowerCase()) < 0,
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
        templateKey: 'plugin-eb-label.tpl.html',
      },
      {
        type: 'input',
        templateKey: 'plugin-eb-input.tpl.html',
      },
      {
        type: 'select',
        templateKey: 'plugin-eb-select.tpl.html',
      },
      {
        type: 'button',
        templateKey: 'plugin-eb-button.tpl.html',
      },
      {
        type: 'iconButton',
        templateKey: 'plugin-eb-icon-button.tpl.html',
      },
      {
        type: 'autocomplete',
        templateKey: 'plugin-eb-autocomplete.tpl.html',
      },
      {
        type: 'multiselect',
        templateKey: 'plugin-eb-multiselect.tpl.html',
      },
    ];

    const settings = {
      defaults: {
        isValid: function (this: { validate: () => string[]; state: string[] }) {
          return !this.validate || !(this.state = this.validate()).length;
        },
      },
    };

    return new ExpressionBuilder(settings)
      .build<IQueryBuilderSchema>(statements);
  }
}
