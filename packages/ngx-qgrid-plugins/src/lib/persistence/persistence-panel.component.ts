import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GridModelBuilder, GridPlugin } from '@qgrid/ngx';
import { PersistencePlugin } from '@qgrid/plugins';

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
