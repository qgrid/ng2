import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';

@Component({
	selector: 'example-rest-api-basic',
	templateUrl: 'example-rest-api-basic.component.html',
	styleUrls: ['example-rest-api-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleRestApiBasicComponent {
	static id = 'rest-api-basic';
}
