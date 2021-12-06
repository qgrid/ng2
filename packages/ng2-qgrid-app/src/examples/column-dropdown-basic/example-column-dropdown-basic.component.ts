import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';

const EXAMPLE_TAGS = [
	'column-dropdown-basic',
	'Cell value can be selected from dropdown menu'
];

@Component({
	selector: 'example-column-dropdown-basic',
	templateUrl: 'example-column-dropdown-basic.component.html',
	styleUrls: ['example-column-dropdown-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnDropdownBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows = [
		{
			'number': 0,
			'text': 'Lorem',
			'bool': true,
			'date': new Date(2018, 9, 12),
			'null': null,
			'undefined': undefined,
			'empty': '',
			'object': null,
			'multi': null
		}
	];

	boolFunctionFetchOptions = {
		fetch: row => [true, false, null].filter(item => item !== row.bool)
	};

	textValueFetchOptions = {
		fetch: ['Lorem', 'ipsum', 'dolor', 'sit', 'amet']
	};

	textPromiseFetchOptions = {
		fetch: new Promise(resolve =>
			setTimeout(
				() => resolve(['Lorem', 'ipsum', 'dolor', 'sit', 'amet']),
				5000
			)
		)
	};

	numberObservableFetchOptions = {
		fetch: of([Math.PI, Math.LN10, Math.LN2, Math.E, Math.LOG10E, Math.LOG2E, Math.SQRT1_2])
	};

	objectFetchOptions = {
		fetch: [
			{ label: 'hello' },
			{ label: 'world' }
		]
	};

	multiFetchOptions = {
		fetch: of([])
	};

	dateFetchOptions = {
		fetch: [
			new Date(2018, 9, 12),
			new Date(2019, 9, 12),
		]
	};

	getLabel(row: any): string {
		return row.object ? row.object.label : '';
	}

	getItemLabel(item: { label: string }): string {
		return item.label;
	}
}
