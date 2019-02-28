import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'example-generate-column-check',
	templateUrl: 'example-generate-column-check.component.html',
	styleUrls: ['example-generate-column-check.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleGenerateColumnCheckComponent {
	rows = [
		{
			notNumber: '1',
			notDate: '1983-09-18',
			notBoolean: 'true',
			notArray: ['1', '2', '3'],
			notEmail: 'john@mail.com',
			notTime: '12:00PM',
			notImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Hydrogen_Spectra.jpg'
		},
		{
			notNumber: 'some text',
			notDate: 'some text',
			notBoolean: 'some text',
			notArray: 'some text',
			notEmail: 'some text',
			notTime: 'some text',
			notImage: 'some text'
		}
	];
}
