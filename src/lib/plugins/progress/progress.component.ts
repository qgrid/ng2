import { Component, Optional, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Command } from 'ng2-qgrid/core/command/command';
import { PluginComponent } from '../plugin.component';
import { RootService } from '../../infrastructure/component/root.service';

@Component({
	selector: 'q-grid-progress',
	templateUrl: './progress.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressComponent extends PluginComponent implements OnInit {
	constructor(@Optional() root: RootService, private changeDetector: ChangeDetectorRef) {
		super(root);

		this.models = ['progress'];
	}

	onReady() {
		this.model.progressChanged.watch(() =>
			this.changeDetector.detectChanges()
		);
	}

	get isBusy() {
		const { isBusy, queue } = this.model.progress();
		return isBusy || queue.length;
	}
}
