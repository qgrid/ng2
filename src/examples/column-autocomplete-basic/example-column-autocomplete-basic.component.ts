import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Observable, of} from 'rxjs';

@Component({
	selector: 'example-column-autocomplete-basic',
	templateUrl: 'example-column-autocomplete-basic.component.html',
	styleUrls: ['example-column-autocomplete-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleColumnAutocompleteBasicComponent {

	rows = [
		{
			'number': 0,
			'text': 'Lorem',
			'bool': true,
			'date': new Date(2018, 9, 12),
			'null': null,
			'undefined': undefined,
			'empty': '',
		},
	];

	boolFunctionFetchOptions = {
		fetch: row => [true, false, null].filter(item => item !== row.bool),
	};

	textValueFetchOptions = {
		fetch: ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
	};

	textPromiseFetchOptions = {
		fetch: new Promise(resolve =>
			setTimeout(
				() => resolve(['Lorem', 'ipsum', 'dolor', 'sit', 'amet']),
				5000,
			),
		),
	};

	datePromiseFetchOptions = {
		fetch: new Promise(resolve =>
			setTimeout(
				() => resolve([new Date(2017, 7, 7), new Date(2016, 6, 6), new Date(2015, 5, 5)]),
				5000,
			),
		),
	};

	numberObservableFetchOptions: { fetch: Observable<number[]> } = {
		fetch: of([Math.PI, Math.LN10, Math.LN2, Math.E, Math.LOG10E, Math.LOG2E, Math.SQRT1_2]),
	};

	multiFetchOptions = {
		fetch: of([]),
	};

}
