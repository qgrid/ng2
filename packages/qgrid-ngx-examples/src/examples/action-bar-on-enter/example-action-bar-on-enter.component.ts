import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Action, Command, Grid } from 'ng2-qgrid';

const EXAMPLE_TAGS = ['action-bar-on-enter', 'Row actions appear on enter key press'];

@Component({
  selector: 'example-action-bar-on-enter',
  templateUrl: 'example-action-bar-on-enter.component.html',
  styleUrls: ['example-action-bar-on-enter.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleActionBarOnEnterComponent {
  static tags = EXAMPLE_TAGS;
  title = EXAMPLE_TAGS[1];

  rows = this.dataService.getAtoms();
  gridModel = this.qgrid.model();
  gridService = this.qgrid.service(this.gridModel);

  rowOptions = {
    trigger: 'focus',
    actions: [new Action(new Command(), 'Hello'), new Action(new Command(), 'World')],
  };

  pickCommand = new Command({
    execute: () => {
      const { cell } = this.gridModel.navigation();
      if (!cell) {
        return;
      }

      const { columns } = this.gridModel.view();
      const newColumnIndex = columns.findIndex(c => c.key === 'rowOptions');

      this.gridService.focus(cell.rowIndex, newColumnIndex);

      // Comment this out if don't need to revert focus back after action
      this.gridModel.editChanged.watch((e, off) => {
        if (e.hasChanges('status') && e.state.status === 'view') {
          this.gridService.focus(cell.rowIndex, cell.columnIndex);
          off();
        }
      });
    },
    canExecute: () => {
      const { items } = this.gridModel.selection();
      return items.length > 0;
    },
    shortcut: 'enter',
  });

  constructor(
    private dataService: DataService,
    private qgrid: Grid,
  ) {
  }
}
