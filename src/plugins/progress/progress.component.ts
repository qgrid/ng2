import { Component, Optional, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Command } from 'ng2-qgrid/core/command';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@Component({
	selector: 'q-grid-progress',
	templateUrl: './progress.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressComponent extends PluginComponent implements OnInit {
	constructor( @Optional() root: RootService, private changeDetector: ChangeDetectorRef) {
		super(root);

		this.models = ['progress'];
	}

	ngOnInit() {
		super.ngOnInit();

		this.model.progressChanged.watch(() => {
			this.changeDetector.detectChanges();
		});
	}

	get isBusy() {
		const progressState = this.model.progress();
		return progressState.isBusy || progressState.queue.length;
	}
}
