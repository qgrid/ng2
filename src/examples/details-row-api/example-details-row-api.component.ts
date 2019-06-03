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
export class ExampleDetailsRowApiComponent implements AfterViewInit {
	static id = 'details-row-api';

	@ViewChild(GridComponent) grid: GridComponent;
	rows: Observable<Atom[]>;
	enableExpand = true;

	expandAllCommand = new Command({
		execute: () => {
			const { model } = this.grid;
			model.row({
				status: new Map(model.data().rows.map<[Atom, RowDetailsStatus]>(x => [x, new RowDetailsStatus(true)]))
			});
		}
	});

	collapseAllCommand = new Command({
		execute: () => {
			const { model } = this.grid;
			model.row({
				status: new Map(model.data().rows.map<[Atom, RowDetailsStatus]>(x => [x, new RowDetailsStatus(false)]))
			});
		}
	});

	expandSecondCommand = new Command({
		execute: () => {
			this.collapseAllCommand.execute();
			const { model } = this.grid;
			model.row({
				status: new Map([[model.data().rows[1], new RowDetailsStatus(true)]])
			});
		}
	});

	disableExpandAllCommand = new Command({ execute: () => this.enableExpand = false });
	allowExpandAllCommand = new Command({ execute: () => this.enableExpand = true });

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	ngAfterViewInit() {
		const { model } = this.grid;

		model.row({
			toggle: new Command({
				canExecute: ({ row }) => this.enableExpand
			})
		});
	}
}
