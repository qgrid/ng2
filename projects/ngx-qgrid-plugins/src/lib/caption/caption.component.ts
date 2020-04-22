import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
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

	constructor(private plugin: GridPlugin, private cd: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.plugin.model.gridChanged.on(() => this.cd.detectChanges());
	}

	get value() {
		const { caption, title } = this.plugin.model.grid();
		return caption || title;
	}
}
