import { isArray, noop } from '@qgrid/core';
import { Expression, GroupExpression } from '../../expression-builder/model/expression';
import { Line } from '../../expression-builder/model/line';
import { Node } from '../../expression-builder/model/node';
import { IQueryBuilderSchema, QueryBuilderService, QueryBuilderSettings } from '../query-builder.service';
import { typeMapping } from './operator';
import { suggestFactory, suggestsFactory } from './suggest.service';
import { Validator } from './validator';

export const getValue = (line: Line, id: string, props: string[]): string => {
  const group = line.get(id) as GroupExpression;
  if (group) {
    if (group.expressions.length === 1) {
      const expr = group.expressions[0];
      const prop = props.filter(p => Object.prototype.hasOwnProperty.call(expr, p))[0];
      if (prop) {
        const value = expr[prop];
        if (isArray(value) && value.length) {
          return value[0];
        }

        return value;
      }
    }
  }

  return null;
};

export class WhereSchema {
  constructor(
    private service: QueryBuilderService,
  ) { }

  factory() {
    const service = this.service;
    const suggest = suggestFactory(service, '#field');
    const suggests = suggestsFactory(service, '#field');
    const validator = new Validator(service);

    const hasValue = function (this: QueryBuilderSettings) {
      return !!(this.value as string);
    };

    const isValid = function (this: QueryBuilderSettings & { isValid: (nd: Node) => boolean }, n: Node) {
      return !this.isValid(n);
    };

    const validate = function (line: Line) {
      return function (this: QueryBuilderSettings) {
        const field = line.get('#field').expressions[0].value;
        return validator.for(field)(this.value as string);
      };
    };

    const refresh = function (
      this: QueryBuilderSettings & { suggest: (nn: Node, ll: Line) => Promise<string[]> },
      n: Node,
      l: Line,
    ) {
      this.options = this.suggest(n, l);
    };

    return this.service
      .build()
      .node('#logical', function (logical) {
        logical
          .attr('serialize', {
            '#logical-op': ['value'],
          })
          .attr('class', {
            'qb-logical': true,
            'qb-and': function (node: Node) {
              const op = node.line.get('#logical-op');
              return op.expressions[0].value === 'AND';
            },
            'qb-or': function (node) {
              const op = node.line.get('#logical-op');
              return op.expressions[0].value === 'OR';
            },
          })
          .select('#logical-op', {
            classes: ['qb-operation'],
            options: ['AND', 'OR'],
            value: 'AND',
          })
          .node('#condition', function (condition) {
            condition
              .attr('serialize', {
                '#field': ['value'],
                '#operator': ['value'],
                '#value': ['value'],
                '#from': ['value'],
                '#to': ['value'],
                '#in-operand': ['values'],
              })
              .select('#field', {
                classes: ['qb-field'],
                options: service.columns().map(c => c.key),
                value: service.columns().length ? service.columns()[0].key : '',
                getLabel: function (node, line, key) {
                  const column = service.columns().filter(c => c.key === key)[0];
                  return (column && column.title) || null;
                },
                getType: function (node, line, key) {
                  const column = service.columns().filter(c => c.key === key)[0];
                  return (column && column.type) || null;
                },
                change: function (this: QueryBuilderSettings & { getType: (f: string) => string }, node, line) {
                  const field = this.value as string;
                  const type = this.getType(field);
                  const ops = typeMapping[type] || [];
                  const op = line.get('#operator').expressions[0];

                  if (ops.indexOf(op.value) < 0) {
                    op.value = ops.length ? ops[0] : null;
                    (op as Expression & { change: () => void }).change();
                  } else {
                    const operand = line.get('#operand').expressions[0] as (Expression & { validate: () => string[] });
                    if (operand.validate) {
                      const result = operand.validate();
                      if (result.length) {
                        operand.value = null;
                      }
                    } else {
                      operand.value = null;
                    }
                  }
                },
              })
              .select('#operator', {
                classes: ['qb-operator'],
                getOptions: function (node: Node, line: Line) {
                  const field: Expression = line.get('#field').expressions[0];
                  const name = field.value;
                  const type = (field as (Expression & { getType: (n: string) => string })).getType(name);

                  return type ? typeMapping[type] as string[] : [];
                },
                value: 'EQUALS',
                change: function (this: QueryBuilderSettings, node: Node, line: Line) {
                  switch ((this.value as string).toLowerCase()) {
                    case 'equals':
                    case 'not equals':
                    case 'greater than':
                    case 'less than':
                    case 'greater or eq. to':
                    case 'less or eq. to':
                    case 'like':
                    case 'not like':
                    case 'starts with':
                    case 'ends with':
                      line.put<IQueryBuilderSchema>('#operand', node, function (schema) {
                        schema.input('#value', {
                          classes: {
                            'qb-operand': true,
                            'qb-has-value': hasValue,
                            'qb-invalid': isValid,
                          },
                          value: getValue(line, '#operand', ['value', 'values']),
                          validate: validate(line),
                          placeholderText: 'Select value',
                          suggest: suggest,
                          options: null,
                          refresh: refresh,
                        });
                      });
                      break;
                    case 'between':
                      line.put<IQueryBuilderSchema>('#operand', node, function (operand) {
                        operand
                          .input('#from', {
                            classes: {
                              'qb-operand': true,
                              'qb-has-value': hasValue,
                              'qb-invalid': isValid,
                            },
                            validate: validate(line),
                            options: suggest,
                            value: null,
                            placeholderText: 'Select value',
                          })
                          .label('#and', {
                            classes: ['qb-operand', 'qb-operand-and-label'],
                            text: 'AND',
                          })
                          .input('#to', {
                            classes: {
                              'qb-operand': true,
                              'qb-has-value': hasValue,
                              'qb-invalid': isValid,
                            },
                            value: null,
                            validate: validate(line),
                            placeholderText: 'Select value',
                            suggest: suggest,
                            options: null,
                            refresh: refresh,
                          });
                      });
                      break;
                    case 'in':
                      line.put('#operand', node, function (schema: IQueryBuilderSchema) {
                        schema
                          .label('#in-open', {
                            text: '(',
                          })
                          .multiselect('#in-operand', {
                            classes: {
                              'qb-operand': true,
                              'qb-has-value': function (this: QueryBuilderSettings) {
                                return !!(this.values as string[]).length;
                              },
                              'qb-invalid': isValid,
                            },
                            validate: function (this: QueryBuilderSettings) {
                              const field = line.get('#field').expressions[0].value;
                              return validator.for(field)(this.values as string[]);
                            },
                            values: [],
                            options: suggests,
                            placeholderText: 'Select value',
                            add: function (this: QueryBuilderSettings, n, l, v) {
                              if (v && (this.values as string[]).indexOf(v) < 0) {
                                (this.values as string[]).push(v);
                              }
                            },
                          })
                          .label('#in-close', {
                            text: ')',
                          });
                      });
                      break;
                    case 'is empty':
                    case 'is not empty':
                      line.put('#operand', node, noop);
                      break;
                  }
                },
              })
              .group('#operand', function (schema: IQueryBuilderSchema) {
                schema.autocomplete('#value', {
                  classes: {
                    'qb-operand': true,
                    'qb-has-value': hasValue,
                    'qb-invalid': isValid,
                  },
                  value: null,
                  validate: function (this: QueryBuilderSettings, node: Node, line: Line) {
                    const field = line.get('#field').expressions[0].value;
                    return validator.for(field)(this.value as string);
                  },
                  placeholderText: 'Select value',
                  suggest: suggest,
                  options: null,
                  refresh: refresh,
                });
              });
          });
      });
  }
}
