import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { Command, GridComponent, PaneComponent } from 'ng2-qgrid';

@Component({
	selector: 'example-edit-row-custom',
	templateUrl: './example-edit-row-custom.component.html',
	styleUrls: ['./example-edit-row-custom.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExampleEditRowCustomComponent {
	static id = 'edit-row-custom';

	rows: Observable<Human[]>;
	@ViewChild(GridComponent) grid: GridComponent;
	@ViewChild(PaneComponent) pane: PaneComponent;

	openPane = new Command({
		execute: () => this.pane.open('right'),
		canExecute: () => !!this.activeCell,
	});

	get activeCell() {
		return this.grid.model.navigation().cell;
	}

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
