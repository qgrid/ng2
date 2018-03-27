import {AfterViewInit, Component, HostListener, Input, OnInit, Optional} from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { Shortcut } from 'ng2-qgrid/core/shortcut/shortcut';

@Component({
	selector: 'q-grid-status-bar',
	templateUrl: './status-bar.component.html'
})
export class StatusBarComponent extends PluginComponent {

	constructor(@Optional() root: RootService) {
		super(root);
	}

	private rowIndex = 0;
	private columnIndex = 0;

	@HostListener('document:mouseup', ['$event']) mouseUp(event) {
		this.cellLocation(event);
	}

	@HostListener('document:keyup', ['$event']) keyUp(event) {
		this.cellLocation(event);
	}

	cellLocation(e) {
		const isTableBody = e.currentTarget.activeElement.localName === 'tbody';

		if (isTableBody) {
			const navigation = this.model.navigation();

			this.rowIndex = navigation.cell.rowIndex;
			this.columnIndex = navigation.cell.columnIndex;
		}
	}
}
