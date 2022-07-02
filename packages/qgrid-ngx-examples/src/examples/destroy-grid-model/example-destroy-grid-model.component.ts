import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Grid } from 'ng2-qgrid';
import { BehaviorSubject } from 'rxjs';

const EXAMPLE_TAGS = ['destroy-grid-model', 'Table content can be destroyed/restored using UI button'];

@Component({
  selector: 'example-destroy-grid-model',
  templateUrl: 'example-destroy-grid-model.component.html',
  styleUrls: ['example-destroy-grid-model.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleDestroyGridModelComponent {
  static tags = EXAMPLE_TAGS;
  title = EXAMPLE_TAGS[1];

  gridModel = this.qgrid.model();
  isVisible = false;

  handlerCount$ = new BehaviorSubject<number>(0);

  constructor(
    dataService: DataService,
    private qgrid: Grid,
  ) {
    dataService
      .getPeople()
      .subscribe(rows => this.gridModel.data({ rows }));

    this.gridModel.actionChanged.watch(e => {
      if (e.hasChanges('items')) {
        // one user event that should not be destroyed
        console.log('action items changed');
      }
    });
  }

  getHandlerCount(): number {
    const model = this.gridModel as { [key: string]: any };
    let count = 0;
    for (const key in model) {
      if (Object.prototype.hasOwnProperty.call(model, key) && key.endsWith('Changed')) {
        const event = model[key];

        // `handlers` is private really
        const { length } = event.handlers;
        if (length) {
          count += length;
          if (!this.isVisible) {
            console.warn(`${key} has some unsubscribed subscriptions`);
            console.warn(event.handlers);
          }
        }
      }
    }
    return count;
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;

    setTimeout(() => {
      this.handlerCount$.next(this.getHandlerCount());
    }, 500);
  }
}
