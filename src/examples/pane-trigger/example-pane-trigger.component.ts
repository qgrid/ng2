import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { Command, GridComponent, PaneComponent } from 'ng2-qgrid';

@Component({
	selector: 'example-pane-trigger',
	templateUrl: 'example-pane-trigger.component.html',
	styleUrls: ['example-pane-trigger.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePaneTriggerComponent {
	static id = 'pane-trigger';

	@ViewChild(GridComponent, { static: true }) grid: GridComponent;
	@ViewChild(PaneComponent, { static: true }) pane: PaneComponent;

	rows$: Observable<Human[]>;
	selectedRow: Human;

	openPane = new Command({
		execute: () => {
			this.selectedRow = this.cell.row;
			this.pane.open('right');
		},
		canExecute: () => !!this.cell,
	});

	constructor(dataService: DataService) {
		this.rows$ = dataService.getPeople();
	}

	private get cell() {
		const { model } = this.grid;
		return model.selection().items[0];
	}
}
