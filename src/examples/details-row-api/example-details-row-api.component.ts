import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Command, GridComponent, RowDetailsStatus } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'details-row-api',
	'Details section of every row can be expanded/collapsed using UI buttons in toolbar and chevron buttons'
];

@Component({
	selector: 'example-details-row-api',
	templateUrl: 'example-details-row-api.component.html',
	styleUrls: ['example-details-row-api.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDetailsRowApiComponent implements AfterViewInit {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	@ViewChild(GridComponent, { static: true }) grid: GridComponent;

	rows$: Observable<Atom[]>;
	canExpand = true;

	expandAllCommand = new Command({
		execute: () => {
			const { model } = this.grid;
			const { rows } = model.data();
			model.row({
				status: new Map(rows.map<[Atom, RowDetailsStatus]>(x => [x, new RowDetailsStatus(true)]))
			});
		}
	});

	collapseAllCommand = new Command({
		execute: () => {
			const { model } = this.grid;
			const { rows } = model.data();
			model.row({
				status: new Map(rows.map<[Atom, RowDetailsStatus]>(x => [x, new RowDetailsStatus(false)]))
			});
		}
	});

	expandSecondCommand = new Command({
		execute: () => {
			this.collapseAllCommand.execute();
			const { model } = this.grid;
			const theSecondRow = model.data().rows[1];

			model.row({
				status: new Map([[theSecondRow, new RowDetailsStatus(true)]])
			});
		}
	});

	toggle = new Command({
		canExecute: () => this.canExpand
	});

	disableExpand = new Command({
		execute: () => {
			this.canExpand = false;
			this.toggle.canExecuteCheck.next();
		}
	});

	enableExpand = new Command({
		execute: () => {
			this.canExpand = true;
			this.toggle.canExecuteCheck.next();
		}
	});

	constructor(dataService: DataService) {
		this.rows$ = dataService.getAtoms();
	}

	ngAfterViewInit() {
		const { model } = this.grid;
		model.row({
			toggle: this.toggle
		});
	}
}
