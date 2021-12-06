import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = [
	'generate-column-check',
	'Column generation based on data source'
];

@Component({
	selector: 'example-generate-column-check',
	templateUrl: 'example-generate-column-check.component.html',
	styleUrls: ['example-generate-column-check.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleGenerateColumnCheckComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows = [
		{
			number: '1',
			notNumber: '1',
			notDate: '1983-09-18',
			notBoolean: 'true',
			notEmail: 'john@mail.com',
			notTime: '12:00',
			notImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Hydrogen_Spectra.jpg',
			notArray: ['1', '2', '3']
		},
		{
			number: '',
			notNumber: 'some text',
			notDate: 'some text',
			notBoolean: 'some text',
			notEmail: 'some text',
			notTime: 'some text',
			notImage: 'some text',
			notArray: 'some text'
		}
	];
}
