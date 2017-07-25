/* eslint-disable indent */
import {Component, Input, OnInit, Optional} from '@angular/core';

import {PluginComponent} from '../plugin.component';
import {Command} from '@grid/core/infrastructure';
import * as SortSevice from '@grid/core/sort/sort.service';
import {SORT_BAR_NAME} from '../definition';
import {TH_CORE_NAME} from '@grid/view/definition';
import {TemplatePath} from '@grid/core/template';
import {RootService} from '@grid/infrastructure/component';
import {TemplateHostService} from '@grid/template';

@Component({
  selector: 'q-grid-sort-bar',
  template: require('./sort-bar.component.html'),
  providers: []
})

export class SortBarComponent extends PluginComponent implements OnInit {
  @Input() model;

  private newSort;
  private selectedItems;

  constructor(@Optional() public root: RootService) {
    super(root);

    this.newSort = null;
    this.selectedItems = null;

  }

  public replace = new Command({
      execute: key => {
        const sort = this.model.sort;

        sort({
          by: key.map(item => ({[item]: 'asc'}))
        }, {
          source: 'sort.bar'
        });
      },
      canExecute: () => this.columns.length > 0
    }
  );

  public add = new Command({
      execute: key => {
        const sort = this.model.sort;
        const state = sort();
        const entry = {[key]: 'asc'};
        const temp = state.by.concat(entry);

        this.selectedItems = temp.slice();

        sort({
          by: temp
        }, {
          source: 'sort.bar'
        });

        this.newSort = null;
      },
      canExecute: () => this.columns.length > 0
    }
  );

  public remove = new Command({
    execute: entry => {
      const sort = this.model.sort;
      const state = sort();

      const key = SortSevice.key(entry);
      const index = SortSevice.index(state.by, key);

      const temp = Array.from(state.by);
      temp.splice(index, 1);
      this.selectedItems = temp.slice();

      sort({
        by: temp
      }, {
        source: 'sort.bar'
      });
    }
  });

  public drop = new Command({
    canExecute: e => e.source && e.source.key === TH_CORE_NAME && this.add.canExecute(e.source.value),
    execute: e => this.add.execute(e.source.value)
  });

  ngOnInit() {
    super.ngOnInit()
    const sortBy = this.model.sort().by;
    sortBy.forEach(key => this.add.execute(key));
  }

  get resource() {
    return this.model.sort().resource;
  }

  get columns() {
    return this.model.data().columns;
  }

  get sorts() {
    return this.model.sort().by;
  }

  title(entry) {
    const key = SortSevice.key(entry);
    const columns = this.columns;
    const index = columns.findIndex(c => c.key === key);
    return index >= 0 ? columns[index].title : '';
  }
}
