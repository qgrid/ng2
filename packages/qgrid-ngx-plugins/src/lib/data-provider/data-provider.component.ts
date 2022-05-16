import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import { PipeUnit } from '@qgrid/core/public-api';
import { GridModel, GridPlugin } from '@qgrid/ngx';

@Component({
  selector: 'q-grid-data-provider',
  template: '',
  providers: [GridPlugin],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataProviderComponent implements OnInit {
  private next: (rows: any[]) => void;

  @Output() requestRows = new EventEmitter<GridModel>();

  @Input('rows') set rows(value: any[]) {
    if (Array.isArray(value)) {
      const next = this.next;
      if (next) {
        this.next = null;
        next(value);
      }
    }
  }

  constructor(
    private plugin: GridPlugin,
    private zone: NgZone,
  ) {
  }

  ngOnInit() {
    this.plugin.model.data({
      pipe: [
        (data, context, next) =>
          this.zone.run(() => {
            this.next = next;
            this.requestRows.emit(context.model);
          }),
        ...PipeUnit.view,
      ],
    }, { source: 'data.provider' });
  }
}
