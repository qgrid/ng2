import { isArray, noop } from '@qgrid/core';
import { IQueryBuilderSchema, QueryBuilderService } from '../query-builder.service';
import { typeMapping } from './operator';
import { suggestFactory, suggestsFactory } from './suggest.service';
import { Validator } from './validator';

export const getValue = (line: any, id: string, props: any[]) => {
	const group = line.get(id);
	if (group) {
		if (group.expressions.length === 1) {
			const expr = group.expressions[0];
			const prop = props.filter(p => expr.hasOwnProperty(p))[0];
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
	constructor(private service: QueryBuilderService) {
	}

	factory(): IQueryBuilderSchema {
		const service = this.service;
		const suggest = suggestFactory(service, '#field');
		const suggests = suggestsFactory(service, '#field');
		const validator = new Validator(service);

		return this.service.build()
			.node('#logical', function (logical) {
				logical
					.attr('serialize', {
						'#logical-op': ['value']
					})
					.attr('class', {
						'qb-logical': true,
						'qb-and': function (node: any) {
							const op = node.line.get('#logical-op');
							return op.expressions[0].value === 'AND';
						},
						'qb-or': function (node: any) {
							const op = node.line.get('#logical-op');
							return op.expressions[0].value === 'OR';
						}
					})
					.select('#logical-op', {
						classes: ['qb-operation'],
						options: ['AND', 'OR'],
						value: 'AND'
					})
					.node('#condition', function (condition) {
						condition
							.attr('serialize', {
								'#field': ['value'],
								'#operator': ['value'],
								'#value': ['value'],
								'#from': ['value'],
								'#to': ['value'],
								'#in-operand': ['values']
							})
							.select('#field', {
								classes: ['qb-field'],
								options: service.columns().map(c => c.key),
								value: service.columns().length ? service.columns()[0].key : '',
								getLabel: function (node: any, line: any, key: string) {
									const column = service.columns().filter(c => c.key === key)[0];
									return (column && column.title) || null;
								},
								getType: function (node: any, line: any, key: string) {
									const column = service.columns().filter(c => c.key === key)[0];
									return (column && column.type) || null;
								},
								change: function (node: any, line: any) {
									const field = this.value;
									const type = this.getType(field);
									const ops = typeMapping[type] || [];
									const op = line.get('#operator').expressions[0];

									if (ops.indexOf(op.value) < 0) {
										op.value = ops.length ? ops[0] : null;
										op.change();
									} else {
										const operand = line.get('#operand').expressions[0];
										if (operand.validate) {
											const result = operand.validate();
											if (result.length) {
												operand.value = null;
											}
										} else {
											operand.value = null;
										}
									}
								}
							})
							.select('#operator', {
								classes: ['qb-operator'],
								getOptions: function (node: any, line: any) {
									const field = line.get('#field').expressions[0];
									const name = field.value;
									const type = field.getType(name);

									return type ? typeMapping[type] : [];
								},
								value: 'EQUALS',
								change: function (node: any, line: any) {
									switch (this.value.toLowerCase()) {
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
											const value = getValue(line, '#operand', ['value', 'values']);

											line.put('#operand', node, function (schema: any) {
												schema.input('#value', {
													classes: {
														'qb-operand': true,
														'qb-has-value': function (): boolean {
															return !!this.value;
														},
														'qb-invalid': function (n: any): boolean {
															return !this.isValid(n);
														}
													},
													value: value,
													validate: function () {
														const field = line.get('#field').expressions[0].value;
														return validator.for(field)(this.value);
													},
													placeholderText: 'Select value',
													suggest: suggest,
													options: null,
													refresh: function (n: any, l: any) {
														this.options = this.suggest(n, l);
													}
												});
											});
											break;
										case 'between':
											line.put('#operand', node, function (operand: any) {
												operand
													.input('#from', {
														classes: {
															'qb-operand': true,
															'qb-has-value': function (): boolean {
																return !!this.value;
															},
															'qb-invalid': function (n: any): boolean {
																return !this.isValid(n);
															}
														},
														validate: function () {
															const field = line.get('#field').expressions[0].value;
															return validator.for(field)(this.value);
														},
														options: suggest,
														value: null,
														placeholderText: 'Select value'
													})
													.label('#and', {
														classes: ['qb-operand', 'qb-operand-and-label'],
														text: 'AND'
													})
													.input('#to', {
														classes: {
															'qb-operand': true,
															'qb-has-value': function (): boolean {
																return !!this.value;
															},
															'qb-invalid': function (n: any): boolean {
																return !this.isValid(n);
															}
														},
														value: null,
														validate: function () {
															const field = line.get('#field').expressions[0].value;
															return validator.for(field)(this.value);
														},
														placeholderText: 'Select value',
														suggest: suggest,
														options: null,
														refresh: function (n: any, l: any) {
															this.options = this.suggest(n, l);
														}
													});
											});
											break;
										case 'in':
											line.put('#operand', node, function (schema: any) {
												schema
													.label('#in-open', {
														text: '('
													})
													.multiselect('#in-operand', {
														classes: {
															'qb-operand': true,
															'qb-has-value': function (this: any): boolean {
																return !!this.values.length;
															},
															'qb-invalid': function (this: any, n: any): boolean {
																return !this.isValid(n);
															}
														},
														validate: function () {
															const field = line.get('#field').expressions[0].value;
															return validator.for(field)(this.values);
														},
														values: [],
														options: suggests,
														placeholderText: 'Select value',
														add: function (n: any, l: any, v: any) {
															if (v && this.values.indexOf(v) < 0) {
																this.values.push(v);
															}
														}
													})
													.label('#in-close', {
														text: ')'
													});
											});
											break;
										case 'is empty':
										case 'is not empty':
											line.put('#operand', node, noop);
											break;
									}
								}
							})
							.group('#operand', function (schema) {
								schema.autocomplete('#value', {
									classes: {
										'qb-operand': true,
										'qb-has-value': function (): boolean {
											return !!this.value;
										},
										'qb-invalid': function (node: any): boolean {
											return !this.isValid(node);
										}
									},
									value: null,
									validate: function (node: any, line: any) {
										const field = line.get('#field').expressions[0].value;
										return validator.for(field)(this.value);
									},
									placeholderText: 'Select value',
									suggest: suggest,
									options: null,
									refresh: function (node: any, line: any) {
										this.options = this.suggest(node, line);
									}
								});
							});
					});
			});
	}
}
