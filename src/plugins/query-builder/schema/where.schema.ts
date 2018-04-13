import { Injectable } from '@angular/core';
import { typeMapping as operations } from './operator';
import { suggestFactory, suggestsFactory } from './suggest.service';
import { QueryBuilderService } from '../query-builder.service';
import { isArray } from 'ng2-qgrid/core/utility/index';
import { ValidatorService } from '../validation/validator.service';

@Injectable()
export class WhereSchema {
	constructor(private service: QueryBuilderService,
		private validator: ValidatorService) {
	}

	factory() {
		const suggest = suggestFactory(this.service, '#field');
		const suggests = suggestsFactory(this.service, '#field');

		const getValue = (line, id, props) => {
			const group = line.get(id);
			if (group) {
				if (group.expressions.length === 1) {
					const expr = group.expressions[0];
					const prop = props.filter(p => expr.hasOwnProperty(p))[0];
					if (prop) {
						const value = expr[prop];
						if (isArray(value) && value.length) {
							return value[0]
						}

						return value;
					}
				}
			}

			return null;
		};

		const validator = this.validator.factory({});

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
								options: context.fields.map(function (f) {
									return f.name;
								}),
								value: context.fields.length ? context.fields[0].name : '',
								getLabel: function (node, line, name) {
									var field = context.fields.filter(function (f) {
										return f.name === name;
									})[0];

									return (field && field.label) || null
								},
								getType: function (node, line, name) {
									var field = context.fields.filter(function (f) {
										return f.name === name;
									})[0];

									return (field && field.type) || 'TEXT';
								},
								change: function (node, line) {
									if (node.attr('placeholder')) {
										node.addAfter(node.clone());
										node.attr('placeholder', false);
									}

									var field = this.value,
										type = this.getType(field),
										ops = operations[type] || [],
										op = line.get('#operator').expressions[0];

									if (ops.indexOf(op.value) < 0) {
										op.value = ops.length ? ops[0] : null;
										op.change();
									}
									else {
										var operand = line.get('#operand').expressions[0];
										operand.state = validator(field)(operand.value);
										if (operand.state.length) {
											operand.value = null;
											operand.state = validator(field)(operand.value);
										}
									}
								}
							})
							.select('#operator', {
								classes: ['cb-operation'],
								getOptions: function (node, line) {
									var field = line.get('#field').expressions[0],
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
											var value = getValue(line, '#operand', ['value', 'values']);

											line.put('#operand', node, function (schema) {
												schema.autocomplete('#value', {
													$watch: {
														'value': function () {
															var field = line.get('#field').expressions[0].value;
															this.state = validator(field)(this.value);
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
																var field = line.get('#field').expressions[0].value;
																this.state = validator(field)(this.value);
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
																var field = line.get('#field').expressions[0].value;
																this.state = validator(field)(this.value);
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
																var field = line.get('#field').expressions[0].value;
																this.state = validator(field)(this.values);
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
											line.put('#operand', node, angular.noop);
											break;
									}
								}
							})
							.group('#operand', function (schema) {
								schema.autocomplete('#value', {
									$watch: {
										'value': function (newValue, oldValue, node, line) {
											var field = line.get('#field').expressions[0].value;
											this.state = validator(field)(this.value);
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
								})
							})
							.iconButton('#remove', {
								icon: 'close',
								isVisible: function (node, line) {
									return !node.attr('placeholder');
								},
								click: function (node) {
									node.remove();
								}
							})
					})
			});
	}
}
};
