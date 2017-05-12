import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {TemplateCacheService} from '@grid/src/template';
import {RootComponent} from '../../root.component';
import {RootService} from '../../root.service';

@Component({
  selector: 'q-grid',
  providers: [
    RootService,
    TemplateCacheService
  ],
  styles: [
    require('@grid/assets/index.scss'),
    require('@grid/theme/index.scss')
  ],
  template: require('./grid.component.html'),
  encapsulation: ViewEncapsulation.None
})
export class GridComponent extends RootComponent {
  @Input() model;
  @Input('rows') dataRows;
  @Input('columns') dataColumns;
  @Input('pipe') dataPipe;
  @Input('selection') selectionItems;
  @Input() selectionMode;
  @Input() selectionUnit;
  @Input() selectionKey;
  @Output() onSelectionChanged;
  @Input() groupBy;
  @Input() pivotBy;
  @Input() sortBy;
  @Input() sortMode;
  @Input() editMode;
  @Input() editEnter;
  @Input() editCommit;
  @Input() editCancel;
  @Input() editReset;
  @Output() selectionChanged = new EventEmitter<any>();

  constructor(private rootService: RootService) {
    super();

    this.models = ['data', 'selection', 'sort', 'group', 'pivot', 'edit'];
    this.modelChanged.watch(model => this.rootService.model = model);
  }

  ngOnInit() {
    super.ngOnInit();

    this.model.viewChanged.watch(e => {
      if (e.hasChanges('columns')) {
        this.invalidateVisibility();
      }
    });
  }

  invalidateVisibility() {
    const columns = this.model.data().columns;
    const visibility = this.model.visibility;
    visibility({
      pin: {
        left: columns.some(c => c.pin === 'left'),
        right: columns.some(c => c.pin === 'right')
      }
    });
  }

  get visibility() {
    // TODO: get rid of that
    return this.model.visibility();
  }
}
