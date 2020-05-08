import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PersistencePlugin } from '@qgrid/plugins/persistence/persistence.plugin';
import { GridPlugin, GridModelBuilder } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-persistence-panel',
	templateUrl: './persistence-panel.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersistencePanelComponent implements OnInit {
	context: {
		$implicit: PersistencePlugin
	};

	constructor(
		private plugin: GridPlugin,
		private modelBuilder: GridModelBuilder
	) {
	}

	ngOnInit() {
		const persistence = new PersistencePlugin(this.plugin, () => this.modelBuilder.build());
		this.context = { $implicit: persistence };
	}
}
