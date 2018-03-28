import {Component, OnInit, Optional} from '@angular/core';
import {RootService} from 'ng2-qgrid/infrastructure/component/root.service';
import {PluginComponent} from '../plugin.component';

@Component({
	selector: 'q-grid-status-bar',
	templateUrl: './status-bar.component.html'
})
export class StatusBarComponent extends PluginComponent implements OnInit {
	constructor(@Optional() root: RootService) {
		super(root);
	}

	private rowIndex;
	private columnIndex;

	ngOnInit() {
		this.using(this.model.navigationChanged.on(e => {
			const cell = e.state.cell;

			this.rowIndex = cell.rowIndex;
			this.columnIndex = cell.columnIndex;
		}));
	}
}
