import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ColumnListState, ColumnListStateGeneration, ColumnListStateTypeDetection } from '@qgrid/core';
import { GridPlugin } from '../plugin/grid-plugin';
import { StateAccessor } from '../state/state-accessor';
import { ColumnListService } from './column-list.service';

@Component({
  selector: 'q-grid-columns',
  template: `<ng-content></ng-content>
`,
  providers: [
    ColumnListService,
    GridPlugin,
    StateAccessor,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnListComponent implements OnChanges {
  private columnListAccessor = this.stateAccessor.setter(ColumnListState);

  @Input() set generation(generation: ColumnListStateGeneration) { this.columnListAccessor({ generation }); }
  @Input() set typeDetection(typeDetection: ColumnListStateTypeDetection) { this.columnListAccessor({ typeDetection }); }

  constructor(
    private plugin: GridPlugin,
    private stateAccessor: StateAccessor,
  ) {
  }

  ngOnChanges() {
    const { model } = this.plugin;
    this.stateAccessor.write(model);
  }
}
