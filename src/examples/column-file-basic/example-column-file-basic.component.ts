import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = [
	'column-file-basic',
	'Cell value contains uploaded file'
];

@Component({
	selector: 'example-column-file-basic',
	templateUrl: 'example-column-file-basic.component.html',
	styleUrls: ['example-column-file-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnFileBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

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
