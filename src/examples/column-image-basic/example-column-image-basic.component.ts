import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = [
	'column-image-basic',
	'Cell value contains uploaded image'
];

@Component({
	selector: 'example-column-image-basic',
	templateUrl: 'example-column-image-basic.component.html',
	styleUrls: ['example-column-image-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnImageBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows = [
		{
			'valid': 'https://rawgit.com/qgrid/doc/master/themes/qgrid/source/assets/favicons/android-chrome-192x192.png',
			'invalid': 'Lorem ipsum dolor',
			'withLabel': 'https://rawgit.com/qgrid/doc/master/themes/qgrid/source/assets/favicons/android-chrome-512x512.png',
			'empty': '',
			'customTemplate': 'https://rawgit.com/qgrid/doc/master/themes/qgrid/source/assets/favicons/favicon-32x32.png'
		}
	];
}
