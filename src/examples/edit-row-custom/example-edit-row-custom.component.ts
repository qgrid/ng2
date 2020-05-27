import { Component, ViewChild, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
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

export class ExampleEditRowCustomComponent implements AfterViewInit {
	static id = 'edit-row-custom';

	rows$: Observable<Human[]>;

	@ViewChild(GridComponent, { static: true }) grid: GridComponent;
	@ViewChild(PaneComponent, { static: true }) pane: PaneComponent;

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
