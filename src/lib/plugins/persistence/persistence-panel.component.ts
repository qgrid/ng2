import { Component, Optional, Input, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { PersistenceView, PersistenceItem } from 'ng2-qgrid/plugin/persistence/persistence.view';
import { Command } from 'ng2-qgrid/core/command/command';
import { PersistenceService } from 'ng2-qgrid/core/persistence/persistence.service';

@Component({
	selector: 'q-grid-persistence-panel',
	templateUrl: './persistence-panel.component.html'
})
export class PersistencePanelComponent extends PluginComponent implements OnInit, OnDestroy {
	private persistence: PersistenceView;

	constructor(@Optional() root: RootService) {
		super(root);
	}

	ngOnInit() {
		super.ngOnInit();

		this.persistence = new PersistenceView(this.model);
		this.context = { $implicit: this.persistence };
	}

	ngOnDestroy() {
		super.ngOnDestroy();

		this.persistence.dispose();
	}
}
