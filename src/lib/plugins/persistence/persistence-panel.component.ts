import { Component, Optional, Input, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { PersistenceView, PersistenceItem } from 'ng2-qgrid/plugin/persistence/persistence.view';
import { Command } from 'ng2-qgrid/core/command/command';
import { PersistenceService } from 'ng2-qgrid/core/persistence/persistence.service';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-persistence-panel',
	templateUrl: './persistence-panel.component.html',
	providers: [PluginService]
})
export class PersistencePanelComponent implements OnInit {
	context: {
		$implicit: PersistenceView
	};

	constructor(private plugin: PluginService) {
	}

	ngOnInit() {
		const persistence = new PersistenceView(this.plugin.model);
		this.context = { $implicit: persistence };
	}
}
