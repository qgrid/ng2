import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Grid, GridModel, PaneComponent } from 'ng2-qgrid';
import { DataService, Atom } from '../data.service';

const EXAMPLE_TAGS = [
	// eslint-disable-next-line array-element-newline
	'pane-with-selection',
	'Pane for each row can be opened by clicking on the corresponding row. Also you can select rows on left selection column',
];

@Component({
	selector: 'example-pane-with-selection-mode',
	templateUrl: 'example-pane-with-selection-mode.component.html',
	styleUrls: ['example-pane-with-selection-mode.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplePaneWithSelectionComponent implements AfterViewInit {
	@ViewChild(PaneComponent) pane: PaneComponent;

	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows$: Observable<Atom[]>;
	gridModel: GridModel;

	constructor(
		dataService: DataService,
		private qgrid: Grid,
	) {
		this.rows$ = dataService.getAtoms();
		this.gridModel = qgrid.model();
	}

	ngAfterViewInit(): void {
		this.gridModel.mouseChanged.on(({ state }) => {
			const { code, status, target } = state;
			if (code === 'left' && status === 'down') {
				if (target && target.column.type !== 'select') {
					this.pane.open('right', target.row);
				}
			}
		});
	}
}
