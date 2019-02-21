import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Command } from 'ng2-qgrid';

@Component({
	selector: 'example-details-row-api',
	templateUrl: 'example-details-row-api.component.html',
	styleUrls: ['example-details-row-api.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDetailsRowApiComponent {
	rows: Observable<Atom[]>;

	expandAllCommand = new Command();
	collapseAllCommand = new Command();
	expandSecondCommand = new Command();
	disableExpandCommand = new Command();
	allowExpandCommand = new Command();

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
