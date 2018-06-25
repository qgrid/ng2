import { Component } from '@angular/core';

@Component({
	selector: 'example-column-image-basic',
	templateUrl: 'example-column-image-basic.component.html',
	styleUrls: ['example-column-image-basic.component.scss']
})
export class ExampleColumnImageBasicComponent {
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