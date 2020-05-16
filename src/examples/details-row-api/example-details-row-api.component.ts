import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Command, GridComponent, RowDetailsStatus } from 'ng2-qgrid';

@Component({
	selector: 'example-details-row-api',
	templateUrl: 'example-details-row-api.component.html',
	styleUrls: ['example-details-row-api.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDetailsRowApiComponent {
	static id = 'details-row-api';

	@ViewChild(GridComponent, { static: true }) grid: GridComponent;

	rows$: Observable<Atom[]>;

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

	disableExpand = new Command({
		execute: () => {
			const { model } = this.grid;

			model.row({
				toggle: new Command({
					canExecute: () => false
				})
			});
		}
	});

	enableExpand = new Command({
		execute: () => {
			const { model } = this.grid;

			model.row({
				toggle: new Command({
					canExecute: () => true
				})
			});
		}
	});

	constructor(dataService: DataService) {
		this.rows$ = dataService.getAtoms();
	}
}
