import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
	selector: 'example-column-file-basic',
	templateUrl: 'example-column-file-basic.component.html',
	styleUrls: ['example-column-file-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleColumnFileBasicComponent {

	static id = 'column-file-basic';

	rows = [
		{
			'valid': 'https://rawgit.com/qgrid/ng2/master/CHANGELOG.md',
			'invalid': 'Lorem ipsum dolor',
			'withLabel': 'https://rawgit.com/qgrid/ng2/master/CHANGELOG.md',
			'empty': '',
			'customTemplate': 'https://rawgit.com/qgrid/ng2/master/CHANGELOG.md',
		},
	];

}
