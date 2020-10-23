import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-sample-orders',
	templateUrl: 'example-sample-orders.component.html',
	styleUrls: ['example-sample-orders.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSampleOrdersComponent {
	static id = 'sample-orders';

	rows$: Observable<any> = this.http.get<any[]>('assets/samples/orders.json');

	constructor(private http: HttpClient) {
	}
}
