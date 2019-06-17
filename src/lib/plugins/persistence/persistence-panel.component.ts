import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PersistenceView } from 'ng2-qgrid/plugin/persistence/persistence.view';
import { PluginService } from '../plugin.service';
import { ModelBuilderService } from 'lib/main/model/model-builder.service';

@Component({
	selector: 'q-grid-persistence-panel',
	templateUrl: './persistence-panel.component.html',
	providers: [PluginService]
})
export class PersistencePanelComponent implements OnInit {
	context: {
		$implicit: PersistenceView
	};

	constructor(
		private plugin: PluginService,
		private modelBuilder: ModelBuilderService
	) {
	}

	ngOnInit() {
		const persistence = new PersistenceView(this.plugin.model, () => this.modelBuilder.build());
		this.context = { $implicit: persistence };
	}
}
