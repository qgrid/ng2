import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ColumnModel } from '@qgrid/core';

@Component({
  selector: 'q-grid-column-filter-by',
  templateUrl: './column-filter-by.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnFilterByComponent {
  @Input() column: ColumnModel;

  @Input() by: Set<string>;
  @Input() byBlanks: boolean;
  @Output() byBlanksChange = new EventEmitter();

  // eslint-disable-next-line no-use-before-define
  context: { $implicit: ColumnFilterByComponent } = {
    $implicit: this,
  };

  get isBlanks() {
    return this.byBlanks;
  }

  remove(item: string): void {
    this.by.delete(item);
  }

  removeByBlanks() {
    this.byBlanksChange.emit(false);
  }
}
