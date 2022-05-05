import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
  selector: 'q-grid-progress',
  templateUrl: './progress.component.html',
  providers: [GridPlugin],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent implements OnInit {
  // eslint-disable-next-line no-use-before-define
  context: { $implicit: ProgressComponent } = {
    $implicit: this,
  };

  get isBusy() {
    const { isBusy, queue } = this.plugin.model.progress();
    return isBusy || queue.length;
  }

  constructor(
    private plugin: GridPlugin,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    const { model, observeReply } = this.plugin;

    observeReply(model.progressChanged)
      .subscribe(() => this.cd.detectChanges());
  }
}
