import {Component, Input, Optional} from '@angular/core';
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
              private gridService: GridService,
              private vscroll: VScrollService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    const model = this.model;
    const table = this.root.table;
    const commandManager = this.root.commandManager;
    const gridService = this.gridService.service(model);

    this.view.style = new StyleView(model, table);
    this.view.head = new HeadView(model, table, 'q-grid-core-th');
    this.view.body = new BodyView(model, table);
    this.view.foot = new FootView(model, table);
    this.view.columns = new ColumnView(model, gridService);
    this.view.layout = new LayoutView(model, table, gridService);
    this.view.selection = new SelectionView(model, table, commandManager);
    this.view.group = new GroupView(model);
    this.view.pivot = new PivotView(model);
    this.view.highlight = new HighlightView(model, table, setTimeout);
    this.view.sort = new SortView(model);
    this.view.filter = new FilterView(model);
    this.view.edit = new EditView(model, table, commandManager);
    this.view.nav = new NavigationView(model, table, commandManager);
    this.view.pagination = new PaginationView(model);
    this.view.scroll = new ScrollView(model, table, this.vscroll, gridService);

    // TODO: how we can avoid that?
    // this.$scope.$watch(this.style.invalidate.bind(this.style));
    //

    model.selectionChanged.watch(e => {
      // TODO: add event
      // if (e.hasChanges('entries')) {
      //   this.root.selectionChanged.emit({
      //     state: model.selection(),
      //     changes: e.changes
      //   });
      // }

      if (e.hasChanges('unit') || e.hasChanges('mode')) {
        gridService.invalidate('selection', e.changes, PipeUnit.column);
      }
    });

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
    this.view.layout.destroy();
    this.view.nav.destroy();
    this.view.selection.destroy();
  }

  get model() {
    return this.root.model;
  }

  get visibility() {
    return this.model.visibility();
  }
}
