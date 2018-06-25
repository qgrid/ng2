import { Component,  } from '@angular/core';
import { Observable, from } from 'rxjs';

@Component({
	selector: 'example-column-autocomplete-basic',
	templateUrl: 'example-column-autocomplete-basic.component.html',
	styleUrls: ['example-column-autocomplete-basic.component.scss']
})
export class ExampleColumnAutocompletetBasicComponent {
	rows = [
		{
			'number': 0,
			'text': 'Lorem',
			'bool': true,
			'date': new Date(2018, 9, 12),
			'null': null,
			'undefined': undefined,
			'empty': ''
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
		fetch: from([[Math.PI, Math.LN10, Math.LN2, Math.E, Math.LOG10E, Math.LOG2E, Math.SQRT1_2]])
	};
}