import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { GridComponent, PaneComponent } from 'ng2-qgrid';
import { DataService, Atom } from '../data.service';

const EXAMPLE_TAGS = [
	'pane-with-selection',
	'Pane for each row can be opened by clicking on the corresponding row. Also you can select rows on left selection column'
];

@Component({
	selector: 'example-pane-with-selection-mode',
	templateUrl: 'example-pane-with-selection-mode.component.html',
	styleUrls: ['example-pane-with-selection-mode.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePaneWithSelectionComponent implements AfterViewInit {
	@ViewChild(GridComponent) grid: GridComponent;
	@ViewChild(PaneComponent) pane: PaneComponent;

	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	ngAfterViewInit(): void {
		this.grid.model.mouseChanged.on(({ state }) => {
			const { code, status, target } = state;
			if (code === 'left' && status === 'down') {
				if (target && target.column.type !== 'select') {
					this.pane.close('right');
					this.pane.open('right');
					Object.assign(this.pane.context, { value: target.row });
				}
			}
		});
	}
}
