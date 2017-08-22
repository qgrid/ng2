import {Component, Optional} from '@angular/core';
import {Command} from 'ng2-qgrid/core/command';
import {PluginComponent} from '../plugin.component';
import {RootService} from 'ng2-qgrid/infrastructure/component';

@Component({
	selector: 'q-grid-progress',
	templateUrl: './progress.component.html'
})
export class ProgressComponent extends PluginComponent {
	constructor(@Optional() root: RootService) {
		super(root);

		this.models = ['progress'];
	}

	get isBusy() {
		const progressState = this.model.progress();
		return progressState.isBusy || progressState.queue.length;
	}
}
