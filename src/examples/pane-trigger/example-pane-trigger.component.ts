import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { Command, GridComponent, PaneComponent } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'pane-trigger',
	'Pane for selected row can be opened by clicking on the triangle button'
];

@Component({
	selector: 'example-pane-trigger',
	templateUrl: 'example-pane-trigger.component.html',
	styleUrls: ['example-pane-trigger.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePaneTriggerComponent implements AfterViewInit {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	@ViewChild(GridComponent) grid: GridComponent;
	@ViewChild(PaneComponent) pane: PaneComponent;

	rows$: Observable<Human[]>;
	selectedRow: Human;

	openPane = new Command({
		execute: () => this.pane.open('right'),
		canExecute: () => !!this.selectedRow,
	});

	constructor(dataService: DataService) {
		this.rows$ = dataService.getPeople();
	}

	ngAfterViewInit() {
		const { model } = this.grid;
		model.selectionChanged.watch(e => {
			if (e.hasChanges('items')) {
				this.selectedRow = e.state.items[0];
				this.openPane.canExecuteCheck.next();
			}
		});
	}
}
