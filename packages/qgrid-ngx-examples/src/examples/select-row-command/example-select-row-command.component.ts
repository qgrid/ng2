import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { Grid, GridModel, Command } from 'ng2-qgrid';

const EXAMPLE_TAGS = ['select-row-command', 'Rows can be selected using checkboxes. Only one row can be selected in the same time'];

@Component({
  selector: 'example-select-row-command',
  templateUrl: 'example-select-row-command.component.html',
  styleUrls: ['example-select-row-command.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleSelectRowCommandComponent implements AfterViewInit {
  static tags = EXAMPLE_TAGS;
  title = EXAMPLE_TAGS[1];

  rows$: Observable<Human[]> = this.dataService.getPeople();
  gridModel: GridModel;

  selectAll = new Command({
    execute: () => {
      this.gridModel.selection({
        items: this.gridModel.scene().rows,
      });
    },
  });

  unselectAll = new Command({
    execute: () => {
      this.gridModel.selection({
        items: [],
      });
    },
  });

  reloadData = new Command({
    execute: () => {
    },
  });

  selectionToggle = new Command<{ items: any[] }>({
    canExecute: e => e.items[0] !== this.gridModel.selection().items[0],
  });

  constructor(
    private dataService: DataService,
    private qgrid: Grid,
  ) {
    this.gridModel = qgrid.model();
  }

  ngAfterViewInit() {
    this.gridModel.selection({
      toggle: this.selectionToggle,
    });
  }
}
