import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent, RowDetailsStatus, Command, RowDetails } from 'ng2-qgrid';

@Component({
	selector: 'example-details-row-custom',
	templateUrl: 'example-details-row-custom.component.html',
	styleUrls: ['example-details-row-custom.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleDetailsRowCustomComponent implements AfterViewInit {
	static id = 'details-row-custom';

	@ViewChild(GridComponent) grid: GridComponent;
	rows$: Observable<Atom[]>;

	toggleExpand = new Command({
		execute: (row) => {
			const { model } = this.grid;
			if (row) {
				const { status } = model.row();
				if (!status.has(row)) {
					model.row({
						status: new Map([[row, new RowDetailsStatus(true)]])
					});

					return;
				}
			}

			model.row({
				status: new Map()
			});
		}
	});

	constructor(dataService: DataService) {
		this.rows$ = dataService.getAtoms();
	}

	ngAfterViewInit() {
		const { model } = this.grid;

		model.keyboardChanged.on(e => {
			if (e.tag.source === 'keydown') {
				const { codes } = e.state;
				switch (codes[0]) {
					case 'enter':
					case 'space': {
						const focusedRow = model.navigation().row;
						this.toggleExpand.execute(focusedRow);
						break;
					}
					case 'alt': {
						const rowNo = Number.parseInt(codes[1], 10);
						if (!Number.isNaN(rowNo)) {
							const { rows } = model.view();
							const altRow = rows[rowNo];
							if (altRow) {
								this.toggleExpand.execute(altRow);
							}
						}
						break;
					}
				}
			}
		});

		model.style({
			row: (row, context) => {
				const ROW_DETAILS_HEIGHT = 140;
				if (row instanceof RowDetails) {
					context.class('row-details-height', {
						height: `${ROW_DETAILS_HEIGHT}px`,
						'max-height': `${ROW_DETAILS_HEIGHT}px`,
						'min-height': `${ROW_DETAILS_HEIGHT}px`
					});
				}
			}
		});
	}
}
