import { Injectable } from '@angular/core';
import { typeMapping as operations } from './operator';
import { suggestFactory, suggestsFactory } from './suggest.service';
import { QueryBuilderService, IQueryBuilderSchema } from '../query-builder.service';
import { isArray, noop } from 'ng2-qgrid/core/utility/index';
import { Validator } from './validator';

export class WhereSchema {
	constructor(private service: QueryBuilderService) {
	}

	factory(): IQueryBuilderSchema {
		const service = this.service;
		const suggest = suggestFactory(service, '#field');
		const suggests = suggestsFactory(service, '#field');

		const getValue = (line, id, props) => {
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

		const validator = new Validator();

		return this.service.build()
			.node('#logical', function (schema) {
				schema
					.attr('serialize', {
						'#logical-op': ['value']
					})
					.select('#logical-op', {
						classes: ['cb-operation'],
						options: ['AND', 'OR'],
						value: 'AND'
					})
					.iconButton('#add-logical', {
						icon: 'add',
						click: function (node, line) {
							node.addChildAfter(node.clone());
						}
					})
					.iconButton('#remove-logical', {
						icon: 'close',
						isVisible: function (node) {
							return node.level > 1;
						},
						click: function (node) {
							node.remove();
						}
					})
					.node('#condition', function (schema) {
						schema
							.attr('placeholder', true)
							.attr('class', {
								placeholder: function (node) {
									return node.attr('placeholder');
								}
							})
							.attr('serialize', {
								'#field': ['value'],
								'#operator': ['value'],
								'#value': ['value'],
								'#from': ['value'],
								'#to': ['value'],
								'#in-operand': ['values'],
								'@attr': ['placeholder']
							})
							.select('#field', {
								classes: ['cb-operation', 'field'],
								options: service.columns().map(c => c.key),
								value: service.columns().length ? service.columns()[0].key : '',
								getLabel: function (node, line, key) {
									const column = service.columns().filter(c => c.key === key)[0];
									return (column && column.title) || null;
								},
								getType: function (node, line, key) {
									const column = service.columns().filter(c => c.key === key)[0];
									return (column && column.type) || 'TEXT';
								},
								change: function (node, line) {
									if (node.attr('placeholder')) {
										node.addAfter(node.clone());
										node.attr('placeholder', false);
									}

									const field = this.value,
										type = this.getType(field),
										ops = operations[type] || [],
										op = line.get('#operator').expressions[0];

									if (ops.indexOf(op.value) < 0) {
										op.value = ops.length ? ops[0] : null;
										op.change();
									} else {
										const operand = line.get('#operand').expressions[0];
										operand.state = validator.for(field)(operand.value);
										if (operand.state.length) {
											operand.value = null;
											operand.state = validator.for(field)(operand.value);
										}
									}
								}
							})
							.select('#operator', {
								classes: ['cb-operation'],
								getOptions: function (node, line) {
									const field = line.get('#field').expressions[0],
										name = field.value,
										type = field.getType(name);

									return type ? operations[type] : [];
								},
								value: 'EQUALS',
								change: function (node, line) {
									if (node.attr('placeholder')) {
										node.addAfter(node.clone());
										node.attr('placeholder', false);
									}

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
												schema.autocomplete('#value', {
													$watch: {
														'value': function () {
															const field = line.get('#field').expressions[0].value;
															this.state = validator.for(field)(this.value);
														}
													},
													state: [],
													classes: {
														'cb-operand': true,
														'has-value': function () {
															return !!this.value;
														},
														'invalid': function (node) {
															return !this.isValid(node);
														}
													},
													options: suggest,
													value: value,
													placeholderText: 'Select value'
												});
											});
											break;
										case 'between':
											line.put('#operand', node, function (schema) {
												schema
													.autocomplete('#from', {
														$watch: {
															'value': function () {
																const field = line.get('#field').expressions[0].value;
																this.state = validator.for(field)(this.value);
															}
														},
														classes: {
															'cb-operand': true,
															'has-value': function () {
																return !!this.value;
															},
															'invalid': function (node) {
																return !this.isValid(node);
															}
														},
														state: [],
														options: suggest,
														value: null,
														placeholderText: 'Select value'
													})
													.label('#and', {
														classes: ['cb-operand', 'cb-operand-and-label'],
														text: 'AND'
													})
													.autocomplete('#to', {
														$watch: {
															'value': function () {
																const field = line.get('#field').expressions[0].value;
																this.state = validator.for(field)(this.value);
															}
														},
														classes: {
															'cb-operand': true,
															'has-value': function () {
																return !!this.value;
															},
															'invalid': function (node) {
																return !this.isValid(node);
															}
														},
														state: [],
														options: suggest,
														value: null,
														placeholderText: 'Select value'
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
														$watch: {
															'values': function () {
																const field = line.get('#field').expressions[0].value;
																this.state = validator.for(field)(this.values);
															}
														},
														classes: {
															'cb-operand': true,
															'has-value': function () {
																return !!this.values.length;
															},
															'invalid': function (node) {
																return !this.isValid(node);
															}
														},
														state: [],
														values: [],
														options: suggests,
														placeholderText: 'Select value'
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
									$watch: {
										'value': function (newValue, oldValue, node, line) {
											const field = line.get('#field').expressions[0].value;
											this.state = validator.for(field)(this.value);
										}
									},
									classes: {
										'cb-operand': true,
										'has-value': function () {
											return !!this.value;
										},
										'invalid': function (node) {
											return !this.isValid(node);
										}
									},
									values: [],
									value: null,
									state: [],
									placeholderText: 'Select value',
									options: suggest,
									change: function (node, line) {
										if (this.value) {
											if (node.attr('placeholder')) {
												node.addAfter(node.clone());
												node.attr('placeholder', false);
											}
										}
									}
								});
							})
							.iconButton('#remove', {
								icon: 'close',
								isVisible: function (node, line) {
									return !node.attr('placeholder');
								},
								click: function (node) {
									node.remove();
								}
							});
					});
			});
	}
}
