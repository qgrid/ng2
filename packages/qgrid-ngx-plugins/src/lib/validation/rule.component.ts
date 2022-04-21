import {
	Component,
	Input,
	OnChanges,
	SimpleChanges,
	TemplateRef,
	ViewChild,
	ChangeDetectionStrategy
} from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';
import { TemplateHostService } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-rule',
	templateUrl: './rule.component.html',
	providers: [TemplateHostService, GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RuleComponent implements OnChanges {
	@Input() for: string;
	@Input() key: string;

	// Common Rules
	@Input() required: string;
	@Input('notEmptyList') not_empty_list: string;
	@Input('anyObject') any_object: string;

	// String Rules
	@Input('equal') eq: string;
	@Input() string: string;
	@Input('lengthBetween') length_between: number[];
	@Input('lengthEqual') length_equal: number;
	@Input('minLength') min_length: number;
	@Input('maxLength') max_length: number;
	@Input('oneOf') one_of: string[];
	@Input('pattern') like: string;

	// Numeric Rules
	@Input() integer: string;
	@Input('positiveInteger') positive_integer: string;
	@Input() decimal: string;
	@Input('positiveDecimal') positive_decimal: string;
	@Input('maxNumber') max_number: number;
	@Input('minNumber') min_number: number;

	// Special Rules
	@Input() email: string;
	@Input() url: string;
	@Input('isoDate') iso_date: string;
	@Input('equalToField') equal_to_field: string;
	@Input('listOf') list_of: string[];

	@ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

	context: { $implicit: RuleComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: GridPlugin,
		private templateHost: TemplateHostService
	) {
		this.templateHost.key = () => 'rule';
	}

	ngOnChanges(changes: SimpleChanges) {
		const rule = {
			for: this.for,
			key: this.key
		};

		const { model } = this.plugin;
		const validation = model.validation;
		const rules = Array.from(validation().rules);

		Object
			.keys(changes)
			.forEach(key => {
				if (!['for', 'key'].includes(key) && changes[key].firstChange) {
					rule[key] = this[key];
				}
			});

		rules.push(rule);
		validation({ rules });
	}
}
