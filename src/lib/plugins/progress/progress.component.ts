import { Component, Optional, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Command } from 'ng2-qgrid/core/command/command';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-progress',
	templateUrl: './progress.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [PluginService]
})
export class ProgressComponent implements OnInit {
	context: { $implicit: ProgressComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService, private changeDetector: ChangeDetectorRef) {
		this.models = ['progress'];
	}

	ngOnInit() {
		this.plugin.model.progressChanged.watch(() =>
			this.changeDetector.detectChanges()
		);
	}

	get isBusy() {
		const { isBusy, queue } = this.plugin.model.progress();
		return isBusy || queue.length;
	}
}
