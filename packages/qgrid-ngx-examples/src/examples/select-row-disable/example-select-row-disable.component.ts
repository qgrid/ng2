import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import { Grid, Command } from 'ng2-qgrid';

const EXAMPLE_TAGS = ['select-row-disable', 'Rows can be selected using checkboxes. Some rows are disabled'];

@Component({
  selector: 'example-select-row-disable',
  templateUrl: 'example-select-row-disable.component.html',
  styleUrls: ['example-select-row-disable.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleSelectRowDisableComponent implements AfterViewInit {
  static tags = EXAMPLE_TAGS;
  title = EXAMPLE_TAGS[1];

  rows$ = this.dataService.getPeople();
  gridModel = this.qgrid.model();

  constructor(
    private dataService: DataService,
		private qgrid: Grid,
  ) {
  }

  ngAfterViewInit() {
    this.gridModel.selection({
      toggle: new Command({
        canExecute: ({ items }) => items.length === 1 && items[0].gender === 'male',
      }),
    });
  }
}
