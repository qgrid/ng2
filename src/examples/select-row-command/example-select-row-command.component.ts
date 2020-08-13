import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent, Command } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'select-row-command',
	'Rows can be selected using checkboxes. Only one row can be selected in the same time'
];

@Component({
	selector: 'example-select-row-command',
	templateUrl: 'example-select-row-command.component.html',
	styleUrls: ['example-select-row-command.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSelectRowCommandComponent implements AfterViewInit {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	@ViewChild(GridComponent) grid: GridComponent;
	rows$: Observable<Human[]> = this.dataService.getPeople();

	selectAll = new Command({
		execute: () => {
			const { model } = this.grid;
			model.selection({
				items: model.scene().rows
			});
		}
	});

	unselectAll = new Command({
		execute: () => {
			const { model } = this.grid;
			model.selection({
				items: []
			});
		}
	});

	reloadData = new Command({
		execute: () => {
		}
	});

	selectionToggle = new Command({
		canExecute: e => {
			const { model } = this.grid;
			return e.items[0] !== model.selection().items[0];
		}
	});

	constructor(private dataService: DataService) {
	}

	ngAfterViewInit() {
		const { model } = this.grid;

		model.selection({
			toggle: this.selectionToggle
		});
	}
}
