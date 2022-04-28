import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = ['column-url-basic', 'Cell value is an url'];

@Component({
	selector: 'example-column-url-basic',
	templateUrl: 'example-column-url-basic.component.html',
	styleUrls: ['example-column-url-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleColumnUrlBasicComponent {
	private label = 'QGRID';

	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows = [
		{
			'valid': 'http://github.com/qgrid/ng2',
			'invalid': 'Lorem ipsum dolor',
			'withLabel': 'http://github.com/qgrid/ng2',
			'null': null,
			'undefined': undefined,
			'empty': '',
			'customTemplate': 'http://github.com/qgrid/ng2',
		},
	];

	myLabel: (row: any, value?: any) => string | undefined;

	constructor() {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;
		this.myLabel = (...args) => {
			const [, value] = args;
			if (args.length > 1) {
				self.label = value;
				return;
			}

			return self.label;
		};
	}
}
