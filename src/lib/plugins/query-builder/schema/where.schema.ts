import { typeMapping as operators } from './operator';
import { suggestFactory, suggestsFactory } from './suggest.service';
import { QueryBuilderService, IQueryBuilderSchema } from '../query-builder.service';
import { isArray, noop } from 'ng2-qgrid/core/utility/kit';
import { Validator } from './validator';

export const getValue = (line, id, props) => {
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
			.node('#logical', function (schema) {
				schema
					.attr('serialize', {
						'#logical-op': ['value']
					})
					.attr('class', {
						'qb-logical': true,
						'qb-and': function (node) {
							const op = node.line.get('#logical-op');
							return op.expressions[0].value === 'AND';
						},
						'qb-or': function (node) {
							const op = node.line.get('#logical-op');
							return op.expressions[0].value === 'OR';
						}
					})
					.select('#logical-op', {
						classes: ['qb-operation'],
						options: ['AND', 'OR'],
						value: 'AND'
					})
					.node('#condition', function (schema) {
						schema
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
								getLabel: function (node, line, key) {
									const column = service.columns().filter(c => c.key === key)[0];
									return (column && column.title) || null;
								},
								getType: function (node, line, key) {
									const column = service.columns().filter(c => c.key === key)[0];
									return (column && column.type) || null;
								},
								change: function (node, line) {
									const field = this.value;
									const type = this.getType(field);
									const ops = operators[type] || [];
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
								getOptions: function (node, line) {
									const field = line.get('#field').expressions[0];
									const name = field.value;
									const type = field.getType(name);

									return type ? operators[type] : [];
								},
								value: 'EQUALS',
								change: function (node, line) {
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

											line.put('#operand', node, function (schema) {
												schema.input('#value', {
													classes: {
														'qb-operand': true,
														'qb-has-value': function () {
															return !!this.value;
														},
														'qb-invalid': function (node) {
															return !this.isValid(node);
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
													refresh: function (node, line) {
														this.options = this.suggest(node, line);
													}
												});
											});
											break;
										case 'between':
											line.put('#operand', node, function (schema) {
												schema
													.input('#from', {
														classes: {
															'qb-operand': true,
															'qb-has-value': function () {
																return !!this.value;
															},
															'qb-invalid': function (node) {
																return !this.isValid(node);
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
															'qb-has-value': function () {
																return !!this.value;
															},
															'qb-invalid': function (node) {
																return !this.isValid(node);
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
														refresh: function (node, line) {
															this.options = this.suggest(node, line);
														}
													});
											});
											break;
										case 'in':
											line.put('#operand', node, function (schema) {
												schema
													.label('#in-open', {
														text: '('
													})
													.multiselect('#in-operand', {
														classes: {
															'qb-operand': true,
															'qb-has-value': function () {
																return !!this.values.length;
															},
															'qb-invalid': function (node) {
																return !this.isValid(node);
															}
														},
														validate: function () {
															const field = line.get('#field').expressions[0].value;
															return validator.for(field)(this.values);
														},
														values: [],
														options: suggests,
														placeholderText: 'Select value',
														add: function (node, line, value) {
															if (value && this.values.indexOf(value) < 0) {
																this.values.push(value);
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
										'qb-has-value': function () {
											return !!this.value;
										},
										'qb-invalid': function (node) {
											return !this.isValid(node);
										}
									},
									value: null,
									validate: function (node, line) {
										const field = line.get('#field').expressions[0].value;
										return validator.for(field)(this.value);
									},
									placeholderText: 'Select value',
									suggest: suggest,
									options: null,
									refresh: function (node, line) {
										this.options = this.suggest(node, line);
									}
								});
							});
					});
			});
	}
}
