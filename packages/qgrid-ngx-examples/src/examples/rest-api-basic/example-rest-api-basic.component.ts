import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';

const EXAMPLE_TAGS = [
	'rest-api-basic',
	'REST-plugin demonstration. All actions are performed on server side'
];

@Component({
	selector: 'example-rest-api-basic',
	templateUrl: 'example-rest-api-basic.component.html',
	styleUrls: ['example-rest-api-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleRestApiBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];
}
