import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-progress',
	templateUrl: './progress.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [PluginService]
})
export class ProgressComponent implements OnInit, OnChanges {
	context: { $implicit: ProgressComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService, private cd: ChangeDetectorRef) {
	}

	ngOnChanges(changes: SimpleChanges) {
		this.plugin.keep(changes, ['progress']);
	}

	ngOnInit() {
		this.plugin.model.progressChanged.watch(() =>
			this.cd.detectChanges()
		);
	}

	get isBusy() {
		const { isBusy, queue } = this.plugin.model.progress();
		return isBusy || queue.length;
	}
}
