import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-select-row-command',
	templateUrl: 'example-select-row-command.component.html',
	styleUrls: ['example-select-row-command.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSelectRowCommandComponent implements AfterViewInit {
	@ViewChild(GridComponent) grid: GridComponent;
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}

	ngAfterViewInit() {
		const { model } = this.grid;

		model.selection({
			toggle: new Command({
				canExecute: e => e.items.length === 1
			})
		});
	}
}
