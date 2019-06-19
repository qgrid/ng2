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

	@ViewChild(GridComponent) grid: GridComponent;
	@ViewChild(PaneComponent) pane: PaneComponent;

	rows$: Observable<Human[]>;

	openPane = new Command({
		execute: () => this.pane.open('right'),
		canExecute: () => !!this.grid.model.navigation().cell,
	});

	constructor(dataService: DataService) {
		this.rows$ = dataService.getPeople();
	}
}
