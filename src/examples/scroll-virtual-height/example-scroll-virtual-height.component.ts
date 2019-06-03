import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-scroll-virtual-height',
	templateUrl: 'example-scroll-virtual-height.component.html',
	styleUrls: ['example-scroll-virtual-height.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleScrollVirtualHeightComponent {
	static id = 'scroll-virtual-height';

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople(100000);
	}
}
