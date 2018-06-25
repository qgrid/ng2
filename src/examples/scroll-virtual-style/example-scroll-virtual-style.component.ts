import { Component } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { Column, StyleCellContext } from 'ng2-qgrid';

@Component({
	selector: 'example-scroll-virtual-style',
	templateUrl: 'example-scroll-virtual-style.component.html',
	styleUrls: ['example-scroll-virtual-style.component.scss'],
	providers: [DataService]
})
export class ExampleScrollVirtualStyleComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}

	styleCell(row: Human, column: Column, ctx: StyleCellContext) {
		if (column.key === 'gender') {
			ctx.class(row.gender, { color: row.gender === 'female' ? 'red' : 'blue' });
		}
	}
}