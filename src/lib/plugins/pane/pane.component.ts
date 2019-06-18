import { Component, Input, OnInit, OnDestroy, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { EditFormPanelView } from 'ng2-qgrid/plugin/edit-form/edit.form.panel.view';
import { PluginService } from '../plugin.service';
import { Td } from 'ng2-qgrid/core/dom/td';

@Component({
	selector: 'q-grid-pane',
	templateUrl: './pane.component.html',
	providers: [PluginService]
})
export class PaneComponent {
	@Output() cancel = new EventEmitter();
	@Output() reset = new EventEmitter();
	@Output() submit = new EventEmitter();

	constructor(private plugin: PluginService) {
	}
}
