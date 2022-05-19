import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  SimpleChange,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { GridError, TdCoreDirective, TemplateHostService } from '@qgrid/ngx';

@Component({
  selector: 'q-grid-live-cell',
  templateUrl: './live-cell.tpl.html',
  providers: [TemplateHostService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveCellComponent implements OnInit, OnDestroy {
  @Input() cell: TdCoreDirective;
  @Input() duration = 500;

  @HostBinding('class') class: string;

  @ViewChild('currency', { static: true }) currencyTemplate: TemplateRef<HTMLElement>;
  @ViewChild('number', { static: true }) numberTemplate: TemplateRef<HTMLElement>;
  @ViewChild('time', { static: true }) timeTemplate: TemplateRef<HTMLElement>;
  @ViewChild('text', { static: true }) textTemplate: TemplateRef<HTMLElement>;

  timeoutId: ReturnType<typeof setTimeout> = null;

  constructor(private zone: NgZone) {
  }

  ngOnInit() {
    if (!this.cell.changes) {
      throw new GridError('live-cell.component', 'No changes found');
    }
    this.class = `q-grid-live-cell q-grid-live-cell-${this.cell.column.type} `;

    if (this.getDifference(this.cell.changes)) {
      this.class += this.getDifference(this.cell.changes) > 0 ? 'q-grid-live-cell-up ' : 'q-grid-live-cell-down ';
    }
    this.zone.runOutsideAngular(() => {
      this.timeoutId = setTimeout(() => {
        this.cell.mode('view');
      }, this.duration);
    });
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  getDifference(value: SimpleChange) {
    switch (this.cell.column.type) {
      case 'number':
      case 'currency':
        return +value.currentValue - +value.previousValue;
      default:
        return 0;
    }
  }

  getTemplate() {
    switch (this.cell.column.type) {
      case 'currency':
        return this.currencyTemplate;
      case 'time':
        return this.timeTemplate;
      case 'number':
        return this.numberTemplate;
      default:
        return this.textTemplate;
    }
  }
}
