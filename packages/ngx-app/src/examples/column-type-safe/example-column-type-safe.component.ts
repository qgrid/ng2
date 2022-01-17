import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = [
	'column-type-safe',
	'Grid is stable despite of wrong cell data type'
];

@Component({
	selector: 'example-column-type-safe',
	templateUrl: 'example-column-type-safe.component.html',
	styleUrls: ['example-column-type-safe.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnTypeSafeComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows = [
		{
			notNumber: '1',
			notCurrency: '10',
			notDate: '1983-09-18',
			notBoolean: 'true',
			notEmail: 'john@mail.com',
			notTime: '12:00',
			notImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Hydrogen_Spectra.jpg',
			notArray: ['1', '2', '3']
		},
		{
			notNumber: 'some text',
			notCurrency: 'some text',
			notDate: 'some text',
			notBoolean: 'some text',
			notEmail: 'some text',
			notTime: 'some text',
			notImage: 'some text',
			notArray: 'some text'
		}
	];
}
