import {Component, Optional} from '@angular/core';
import {Command} from '@grid/core/infrastructure';
import {PluginComponent} from '../plugin.component';
import {RootService} from '@grid/infrastructure/component';

@Component({
  selector: 'q-grid-progress',
  template: require('./progress.component.html')
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


