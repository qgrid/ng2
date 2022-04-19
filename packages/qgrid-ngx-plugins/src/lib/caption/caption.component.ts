import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-caption',
	templateUrl: './caption.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaptionComponent implements OnInit {
	context: { $implicit: CaptionComponent } = {
		$implicit: this
	};

	get value() {
		const { caption, title } = this.plugin.model.grid();
		return caption || title;
	}

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
}
