import {Component, Optional} from '@angular/core';
import {NgComponent, RootService} from '@grid/infrastructure/component';
import {Table} from '@grid/core/dom';
import {BodyView} from '@grid/core/body';
import {HeadView} from '@grid/core/head';
import {FootView} from '@grid/core/foot';
import {LayoutView} from '@grid/core/layout';
import {GroupView} from '@grid/core/group';
import {PivotView} from '@grid/core/pivot';
import {NavigationView} from '@grid/core/navigation';
import {HighlightView} from '@grid/core/highlight';
import {SortView} from '@grid/core/sort';
import {FilterView} from '@grid/core/filter';
import {EditView} from '@grid/core/edit';
import {SelectionView} from '@grid/core/selection';
import {PaginationView} from '@grid/core/pagination';
import {TableView} from '@grid/core/table';
import {StyleView} from '@grid/core/style';
import {ColumnView} from '@grid/core/column';
import {ScrollView} from '@grid/core/scroll';
import {RowDetailsView} from '@grid/core/row-details';
import {isUndefined} from '@grid/core/utility';
import {PipeUnit} from '@grid/core/pipe/units';
import {AppError} from '@grid/core/infrastructure';
import {ViewCoreService} from './view-core.service';
import {GridService} from '@grid/main/grid';
import {VScrollService} from '../scroll';
import {CellService} from '../cell';

@Component({
  selector: 'q-grid-core-view',
  templateUrl: './view-core.component.html',
  providers: [
    ViewCoreService,
    CellService
  ]
})
export class ViewCoreComponent extends NgComponent {
  constructor(@Optional() private root: RootService,
              private view: ViewCoreService,
              private gridService: GridService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.view.init();
    
    const model = this.model;
    const gridService = this.gridService.service(model);

    // model.selectionChanged.watch(e => {
    //   // TODO: add event
    //   // if (e.hasChanges('entries')) {
    //   //   this.root.selectionChanged.emit({
    //   //     state: model.selection(),
    //   //     changes: e.changes
    //   //   });
    //   // }
    //
    // });

    const triggers = model.data().triggers;
    // TODO: think about invalidation queue
    let needInvalidate = true;
    Object.keys(triggers)
      .forEach(name =>
        model[name + 'Changed']
          .watch(e => {
            const changes = Object.keys(e.changes);
            if (e.tag.behavior !== 'core' && triggers[name].find(key => changes.indexOf(key) >= 0)) {
              needInvalidate = false;
              gridService.invalidate(name, e.changes);
            }
          }));

    if (needInvalidate) {
      gridService.invalidate('grid');
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    const view = this.view;
    view.style.dispose();
    view.head.dispose();
    view.body.dispose();
    view.foot.dispose();
    view.columns.dispose();
    view.layout.dispose();
    view.selection.dispose();
    view.group.dispose();
    view.pivot.dispose();
    view.highlight.dispose();
    view.sort.dispose();
    view.filter.dispose();
    view.edit.dispose();
    view.nav.dispose();
    view.pagination.dispose();
    view.scroll.dispose();
    view.rowDetails.dispose();
  }

  get model() {
    return this.root.model;
  }

  get visibility() {
    return this.model.visibility();
  }
}
