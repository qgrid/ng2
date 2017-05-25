import {Component, Input, OnInit} from "@angular/core";
import {isUndefined, clone} from '@grid/core/services/utility';
import {ColumnListService} from "@grid/main/column/column-list.service";
import * as columnService from '@grid/core/column/column.service';
import {columnFactory} from '@grid/core/column/column.factory';
import {RootService} from "@grid/infrastructure/component";

@Component({
  selector: 'q-grid-column',
  template: '<ng-content></ng-content>'
})
export class ColumnComponent implements OnInit {
  @Input() public type: string;
  @Input() public key: string;
  @Input() public title: string;
  @Input() public value: any;
  @Input() public pin: string;
  @Input() public editor: string;
  @Input() public editorOptions: any;

  @Input() public width: number;
  @Input() public minWidth: number;
  @Input() public maxWidth: number;

  @Input() public canEdit: boolean;
  @Input() public canResize: boolean;
  @Input() public canSort: boolean;
  @Input() public canMove: boolean;
  @Input() public canFilter: boolean;
  @Input() public canHighlight: boolean;
  @Input() public canFocus: boolean;

  @Input() public isVisible: boolean;
  @Input() public index: number;

  @Input() public label: any;

  constructor(private root: RootService,
              private columnList: ColumnListService) {
  }

  ngOnInit() {
    const withKey = !isUndefined(this.key);
    if (!withKey) {
      if (!isUndefined(this.editor)) {
        this.key = `$default.${this.editor}`;
      } else if (!isUndefined(this.type)) {
        this.key = `$default.${this.type}`;
      } else {
        this.key = '$default';
      }
    }

    const model = this.root.model;
    const createColumn = columnFactory(model);
    const data = model.data;
    const dataState = data();
    const columns = clone(dataState.columns);
    let column = columnService.find(columns, this.key);
    if (column) {
      createColumn(this.type || 'text', column);
    }
    else {
      column = createColumn(this.type || 'text').model;
      column.key = this.key;
      columns.source = 'template';
      columns.push(column);
    }

    this.columnList.copy(column, this);
    // HACK: to understand if need to pass {$row: row} instead of just row in cell.core.js
    if (!isUndefined(this.value)) {
      column.$value = isUndefined(this.value) ? null : this.value;
    }

    if (!isUndefined(this.label)) {
      column.$label = isUndefined(this.label) ? null : this.label;
    }

    if (withKey) {
      this.columnList.add(column);
    }
    else {
      const settings = Object.keys(this)
        .filter(key => !isUndefined(this[key]) && column.hasOwnProperty(key))
        .reduce((memo, key) => {
          memo[key] = column[key];
          return memo;
        }, {});

      this.columnList.register(settings);
    }
  }
}
