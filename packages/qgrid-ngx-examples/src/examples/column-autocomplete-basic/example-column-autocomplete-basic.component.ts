import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';

const EXAMPLE_TAGS = [
	'column-autocomplete-basic',
	'Cell value can be entered using autocomplete feature'
];

@Component({
	selector: 'example-column-autocomplete-basic',
	templateUrl: 'example-column-autocomplete-basic.component.html',
	styleUrls: ['example-column-autocomplete-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnAutocompleteBasicComponent {
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
			'object': { label: 'foo', value: 1 }
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

	datePromiseFetchOptions = {
		fetch: new Promise(resolve =>
			setTimeout(
				() => resolve([new Date(2017, 7, 7), new Date(2016, 6, 6), new Date(2015, 5, 5)]),
				5000
			)
		)
	};

	numberObservableFetchOptions = {
		fetch: of([Math.PI, Math.LN10, Math.LN2, Math.E, Math.LOG10E, Math.LOG2E, Math.SQRT1_2])
	};

	multiFetchOptions = {
		fetch: of([])
	};

	objectFetchOptions = {
		fetch: [
			{ label: 'foo', value: 1 },
			{ label: 'bar', value: 2 }
		]
	};

	getLabel(row: any) {
		return row.object.label;
	}

	getItemLabel(item: { label: string }) {
		return item ? item.label : '';
	}
}
