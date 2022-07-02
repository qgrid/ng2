import { Component, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { Grid, GridModel } from 'ng2-qgrid';

const EXAMPLE_TAGS = ['mouse-api-basic', 'Mouse api example'];

export declare class LogEntry {
  status: string;
  code: string;
  target: string;
}

@Component({
  selector: 'example-mouse-api-basic',
  templateUrl: 'example-mouse-api-basic.component.html',
  styleUrls: ['example-mouse-api-basic.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleMouseApiBasicComponent implements AfterViewInit {

  static id = EXAMPLE_TAGS[0];

  logEntries: Array<LogEntry> = [];
  title = EXAMPLE_TAGS[1];
  rows: Observable<Human[]>;
  gridModel: GridModel;

  constructor(
    dataService: DataService,
		private cdr: ChangeDetectorRef,
		private qgrid: Grid,
  ) {
    this.gridModel = qgrid.model();
    this.rows = dataService.getPeople();
  }

  ngAfterViewInit(): void {
    this.gridModel.mouseChanged.on(({ state }) => {
      const { status, target, code } = state;
      let targetString = '';
      if (target) {
        const { columnIndex, rowIndex } = target;
        targetString = `{ column: ${columnIndex}, row: ${rowIndex} }`;
      }

      this.logEntries.unshift({
        status: status,
        code: code as string,
        target: targetString,
      });

      this.cdr.detectChanges();
    });
  }
}
