import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridModel, Action, GridService, Command, Grid } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'action-bar-on-enter',
	'Data is shown on startup'
];

@Component({
	selector: 'example-action-bar-on-enter',
	templateUrl: 'example-action-bar-on-enter.component.html',
	styleUrls: ['example-action-bar-on-enter.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleActionBarOnEnterComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;
	gridModel: GridModel;
	gridService: GridService;

	rowOptions = {
		trigger: 'focus',
		actions: [
			new Action(new Command(), 'Hello'),
			new Action(new Command(), 'World')
		]
	};

	pickCommand = new Command({
		execute: () => {
			const { cell } = this.gridModel.navigation();
			const { columns } = this.gridModel.view();

			const newColumnIndex = columns.findIndex(c => c.key === 'rowOptions');

			this.gridService.focus(cell.rowIndex, newColumnIndex);

			// Comment this out if don't need to revert focus back after action
			this.gridModel.editChanged.watch((e, off) => {
				if (e.hasChanges('status') && e.state.status === 'view') {
					this.gridService.focus(cell.rowIndex, cell.columnIndex);
					off();
				}
			});
		},
		canExecute: () => {
			const { items } = this.gridModel.selection();
			return items.length > 0;
		},
		shortcut: 'enter'
	});

	constructor(dataService: DataService, qgrid: Grid) {
		this.rows = dataService.getAtoms();

		this.gridModel = qgrid.model();
		this.gridService = qgrid.service(this.gridModel);
	}
}
