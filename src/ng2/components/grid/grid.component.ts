import {Component, OnInit, Input, Output} from '@angular/core';

@Component({
  selector: 'q-grid',
  providers: [],
  template: `
    <ul>
      <li *ngFor="let row of rows">{{row}}</li>
    </ul>`
})
export class GridComponent implements OnInit {
  @Input() rows: any[] = [];

  constructor() {
  }

  public ngOnInit() {
  }
}
