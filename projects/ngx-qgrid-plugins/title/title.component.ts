import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { PluginService } from '../plugin.service';

// @deprecated
@Component({
	selector: 'q-grid-title',
	templateUrl: './title.component.html',
	providers: [PluginService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent implements OnInit {
	context: { $implicit: TitleComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService, private cd: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.plugin.model.gridChanged.on(() => this.cd.detectChanges());
	}

	get value() {
		return this.plugin.model.grid().title;
	}
}
