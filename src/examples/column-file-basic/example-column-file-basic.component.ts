import { Component } from '@angular/core';

@Component({
	selector: 'example-column-file-basic',
	templateUrl: 'example-column-file-basic.component.html',
	styleUrls: ['example-column-file-basic.component.scss']
})
export class ExampleColumnFileBasicComponent {
	rows = [
		{
			'valid': 'https://rawgit.com/qgrid/ng2/master/CHANGELOG.md',
			'invalid': 'Lorem ipsum dolor',
			'withLabel': 'https://rawgit.com/qgrid/ng2/master/CHANGELOG.md',
			'empty': '',
			'customTemplate': 'https://rawgit.com/qgrid/ng2/master/CHANGELOG.md'
		}
	];
}