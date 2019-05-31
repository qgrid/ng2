import {Component, ChangeDetectionStrategy, ViewChild, AfterViewInit} from '@angular/core';
import {DataService, Atom} from '../data.service';
import {Observable} from 'rxjs';
import {GridComponent} from 'ng2-qgrid';

@Component({
	selector: 'example-action-bar-basic',
	templateUrl: 'example-select-row-disable-unselect.component.html',
	styleUrls: ['example-select-row-disable-unselect.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleSelectRowDisableUnselectComponent implements AfterViewInit {

	static id = 'select-row-disable-unselect';

	rows: Observable<Atom[]>;
	@ViewChild(GridComponent) grid: GridComponent;
	selection: any = [];

	constructor(private dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	public ngAfterViewInit(): void {
		const {model} = this.grid;

		model.selectionChanged.on(e => {
			const change = e.changes['items'];
			if (change) {
				this.selection = e.state.items;
				if (!change.newValue.length) {
					model.selection({
						items: change.oldValue,
					});
				}
			}
		});
	}

}
