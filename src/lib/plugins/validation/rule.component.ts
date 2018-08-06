import { Component, ContentChild, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { PluginService } from '../plugin.service';
import { TemplateHostService } from '../../template/template-host.service';

@Component({
	selector: 'q-grid-rule',
	template: '',
	providers: [TemplateHostService, PluginService]
})
export class RuleComponent implements OnChanges {
	@Input() for: string;
	@Input() key: string;

	// Common Rules
	@Input() required?: string;
	@Input('notEmptyList') not_empty_list?: string;
	@Input('anyObject') any_object?: string;

	// String Rules
	@Input('equal') eq?: string;
	@Input() string?: string;
	@Input('lengthBetween') length_between?: string;
	@Input('lengthEqual') length_equal?: string;
	@Input('minLength') min_length?: string;
	@Input('maxLength') max_length?: string;
	@Input('oneOf') one_of?: string;
	@Input('pattern') like?: string;

	// Numeric Rules
	@Input() integer?: string;
	@Input('positiveInteger') positive_integer?: string;
	@Input() decimal?: string;
	@Input('positiveDecimal') positive_decimal?: string;
	@Input('maxNumber') max_number?: string;
	@Input('minNumber') min_number?: string;

	// Special Rules
	@Input() email?: string;
	@Input() url?: string;
	@Input('isoDate') iso_date?: string;
	@Input('equalToField') equal_to_field?: string;
	@Input('listOf') list_of?: string;

	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	context: { $implicit: RuleComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: PluginService,
		private templateHost: TemplateHostService
	) {
		this.templateHost.key = () => `rule`;
	}

	ngOnChanges(changes: SimpleChanges) {
		const rule = {
			for: this.for,
			key: this.key
		};
		const { model } = this.plugin;
		const validation = model.validation;
		const rules = Array.from(validation().rules);

		Object.keys(changes).forEach(key => {
			if (!['for', 'key'].includes(key) && changes[key].firstChange) {
				rule[key] = this[key];
			}
		});
		rules.push(rule);
		validation({ rules });
	}
}
