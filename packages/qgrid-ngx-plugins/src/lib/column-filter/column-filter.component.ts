import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ColumnModel,
  Fetch,
  flatten,
  getValue,
  Guard,
  uniq,
} from '@qgrid/core';
import {
  Grid,
  GridError,
  GridPlugin,
  TemplateService,
  VscrollContext,
  VscrollService,
} from '@qgrid/ngx';
import { ColumnFilterPlugin, ColumnFilterState } from '@qgrid/plugins';
import { FocusAfterRender } from '../focus/focus.service';

@Component({
  selector: 'q-grid-column-filter',
  templateUrl: './column-filter.component.html',
  providers: [FocusAfterRender, GridPlugin],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnFilterComponent implements OnInit {
  private vscrollContext: VscrollContext;

  @Input() column: ColumnModel;
  @Input() search = '';

  @Output('submit') submitEvent = new EventEmitter<any>();
  @Output('cancel') cancelEvent = new EventEmitter<any>();

  context: {
    $implicit: ColumnFilterPlugin;
    // eslint-disable-next-line no-use-before-define
    plugin: ColumnFilterComponent;
    vscroll: VscrollContext;
  };

  get operators() {
    const { model } = this.plugin;
    return model
      .filter()
      .operatorFactory(this.column);
  }

  get hasOperators() {
    return this.operators && this.operators.length > 1;
  }

  constructor(
    public focusAfterRender: FocusAfterRender,
    private plugin: GridPlugin,
    private vscroll: VscrollService,
    private qgrid: Grid,
    private cd: ChangeDetectorRef,
    private templateService: TemplateService,
  ) {
  }

  ngOnInit() {
    const { model } = this.plugin;
    const { column } = this;

    const context = { column };
    const columnFilter = model.resolve(ColumnFilterState);
    const columnFilterPlugin = new ColumnFilterPlugin(this.plugin, context);

    columnFilterPlugin.submitEvent.on(() => this.submitEvent.emit());
    columnFilterPlugin.cancelEvent.on(() => this.cancelEvent.emit());

    const vscrollContext = this.vscroll.context({
      emit: f => {
        f();

        this.cd.markForCheck();
        this.cd.detectChanges();
      },
      threshold: columnFilter.state().threshold,
      fetch: (skip, take, d) => {
        const filterState = model.filter();
        const service = this.qgrid.service(model);
        // We need to close items property for correct reset behavior
        const items = columnFilterPlugin.items;
        if (column.key && filterState.fetch !== this.qgrid.noop) {
          const cancelBusy = service.busy();
          const select = filterState
            .fetch(column.key, {
              skip,
              take,
              value: columnFilterPlugin.getValue,
              search: '' + this.search,

              // @deprecated
              filter: '' + this.search,
            });

          const fetch = new Fetch(select);
          fetch.run();
          fetch.busy
            .then(page => {
              items.push(...page);
              d.resolve(items.length + (page.length === take ? take : 0));
              cancelBusy();
            })
            .catch(cancelBusy);
        } else {
          const cancelBusy = service.busy();
          const isBlank = model.filter().assertFactory().isNull;
          try {
            if (!items.length) {
              const source = model[columnFilter.state().source];
              Guard.notNull(source, 'source');

              const sourceState = source();
              Guard.hasProperty(sourceState, 'rows');

              let values: any[];
              if (columnFilterPlugin.column.type === 'array') {
                values = flatten(sourceState.rows.map(row => getValue(row, column)));
              } else {
                values = sourceState.rows.map(columnFilterPlugin.getValue);
              }

              const uniqValues = uniq(values);
              const notBlankValues = uniqValues.filter(x => !isBlank(x));

              // TODO: improve search also
              const search = ('' + this.search).toLowerCase();
              const filteredItems = search
                ? notBlankValues.filter(x => ('' + x).toLowerCase().indexOf(search) >= 0)
                : notBlankValues;

              filteredItems.sort(columnFilterPlugin.column.compare);
              columnFilterPlugin.items = filteredItems;
              columnFilterPlugin.hasBlanks =
                notBlankValues.length !== uniqValues.length &&
                (!search || 'blanks'.indexOf(search.toLowerCase()) >= 0);
            }

            d.resolve(columnFilterPlugin.items.length);
          } finally {
            cancelBusy();
          }
        }
      },
    });

    this.vscrollContext = vscrollContext;

    this.context = {
      $implicit: columnFilterPlugin,
      plugin: this,
      vscroll: vscrollContext,
    };
  }

  reset() {
    this.context.$implicit.items = [];
    this.vscrollContext.container.reset();
  }

  clear() {
    this.search = '';
    this.context.$implicit.reset.execute();
  }

  getOperatorTemplateKey(op: string) {
    const keys = this.buildTemplateKeys(op);
    for (const key of keys) {
      if (this.templateService.find(key)) {
        return key;
      }
    }

    throw new GridError(
      'column-filter.component',
      `Column filter template for operator ${op} is not found`,
    );
  }

  private buildTemplateKeys(op: string) {
    const { key, type } = this.column;
    const PREFIX = 'plugin-column-filter';

    const keys = [
      `${PREFIX}-${type}-the-${key}-${op}.tpl.html`,
      `${PREFIX}-the-${key}-${op}.tpl.html`,
      `${PREFIX}-the-${key}.tpl.html`,
      `${PREFIX}-${type}-${op}.tpl.html`,
      `${PREFIX}-${type}.tpl.html`,
      `${PREFIX}-${op}.tpl.html`,
    ];

    switch (op) {
      case 'isEmpty':
      case 'isNotEmpty':
      case 'isNull':
      case 'isNotNull': {
        keys.push(`${PREFIX}-${type}-the-${key}-label.tpl.html`);
        keys.push(`${PREFIX}-${type}-label.tpl.html`);
        keys.push(`${PREFIX}-label.tpl.html`);
        break;
      }
      case 'like':
      case 'notLike':
      case 'startsWith':
      case 'endsWith':
      case 'lessThan':
      case 'lessThanOrEquals':
      case 'greaterThan':
      case 'greaterThanOrEquals': {
        keys.push(`${PREFIX}-${type}-the-${key}-input.tpl.html`);
        keys.push(`${PREFIX}-${type}-input.tpl.html`);
        keys.push(`${PREFIX}-input.tpl.html`);
        break;
      }
    }

    keys.push(`${PREFIX}-contains.tpl.html`);
    return keys;
  }
}
