import {Component, Input, Output, ElementRef} from '@angular/core';
import {RootComponent} from '../root.component';

@Component({
  selector: 'q-grid',
  providers: [],
  templateUrl: './grid.component.html'
})
export class GridComponent extends RootComponent {
  protected names = ['data', 'selection', 'sort', 'group', 'pivot', 'edit'];

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

  constructor(private element: ElementRef) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.compile();

    console.log(this.model);
    this.model.viewChanged.watch(e => {
      if (e.hasChanges('columns')) {
        this.invalidateVisibility();
      }
    });
  }

  compile() {
    //const element = this.element.nativeElement;

    // let template = null;
    // let templateScope = null;
    //
    // this.$transclude((clone, scope) => {
    //   template = clone;
    //   templateScope = scope;
    //
    //   this.$element.append(clone);
    // });
    //
    // template.remove();
    // templateScope.$destroy();
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
