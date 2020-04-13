import { Component, OnInit } from '@angular/core';
import { PersistenceView } from 'qgrid-plugins/persistence/persistence.view';
import { GridPlugin } from 'ngx-qgrid';
import { GridModelBuilder } from 'ngx-qgrid';

@Component({
	selector: 'q-grid-persistence-panel',
	templateUrl: './persistence-panel.component.html',
	providers: [GridPlugin]
})
export class PersistencePanelComponent implements OnInit {
	context: {
		$implicit: PersistenceView
	};

	constructor(
		private plugin: GridPlugin,
		private modelBuilder: GridModelBuilder
	) {
	}

	ngOnInit() {
		const persistence = new PersistenceView(this.plugin.model, () => this.modelBuilder.build());
		this.context = { $implicit: persistence };
	}
}
