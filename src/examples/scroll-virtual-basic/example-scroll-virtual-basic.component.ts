import { Component } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-scroll-virtual-basic',
	templateUrl: 'example-scroll-virtual-basic.component.html',
	styleUrls: ['example-scroll-virtual-basic.component.scss'],
	providers: [DataService]
})
export class ExampleVirtualScrollBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}