import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = [
	'column-data-safe',
	'No errors exist despite of bad data'
];

@Component({
	selector: 'example-column-data-safe',
	templateUrl: 'example-column-data-safe.component.html',
	styleUrls: ['example-column-data-safe.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnDataSafeComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows = [
		{
			level0: {
				currency: 10,
				number: 12,
				date: '1983-09-18',
				boolean: true,
				email: 'john@mail.com',
				time: '12:00',
				image: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Hydrogen_Spectra.jpg',
				array: [1, 2, 3]
			}
		},
		{},
		{
			level0: {
				time: '13:00'
			}
		}

	];
}
