import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';

// @deprecated
@Component({
	selector: 'q-grid-title',
	templateUrl: './title.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent implements OnInit {
	context: { $implicit: TitleComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef
	) {
	}

	ngOnInit() {
		const { model, observe } = this.plugin;
		observe(model.gridChanged)
			.subscribe(() => this.cd.detectChanges());
	}

	get value() {
		return this.plugin.model.grid().title;
	}
}
