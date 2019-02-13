import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-caption',
	templateUrl: './caption.component.html',
	providers: [PluginService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaptionComponent implements OnInit {
	context: { $implicit: CaptionComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService, private cd: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.plugin.model.gridChanged.on(() => this.cd.detectChanges());
	}

	get value() {
		const { caption, title } = this.plugin.model.grid();
		return caption || title;
	}
}
