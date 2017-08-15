import {Guard} from '@grid/core/infrastructure';
import {Injectable} from '@angular/core';
import {GroupView} from '@grid/core/group/group.view';
import {FilterView} from '@grid/core/filter/filter.view';
import {PivotView} from '@grid/core/pivot/pivot.view';
import {SortView} from '@grid/core/sort/sort.view';
import {PaginationView} from '@grid/core/pagination/pagination.view';
import {ColumnView} from '@grid/core/column/column.view';
import {HeadView} from '@grid/core/head/head.view';
import {BodyView} from '@grid/core/body/body.view';
import {FootView} from '@grid/core/foot/foot.view';
import {LayoutView} from '@grid/core/layout/layout.view';
import {SelectionView} from '@grid/core/selection/selection.view';
import {HighlightView} from '@grid/core/highlight/highlight.view';
import {EditView} from '@grid/core/edit/edit.view';
import {NavigationView} from '@grid/core/navigation/navigation.view';
import {ScrollView} from '@grid/core/scroll/scroll.view';
import {StyleView} from '@grid/core/style/style.view';
import {RowDetailsView} from '@grid/core/row-details/row.details.view';
import {RootService} from '@grid/infrastructure/component';
import {GridService} from '@grid/main/grid';
import {VScrollService} from '@grid/main/core/scroll';

@Injectable()
export class ViewCoreService {
  public group: GroupView = null;
  public filter: FilterView = null;
  public pivot: PivotView = null;
  public sort: SortView = null;
  public pagination: PaginationView = null;
  public columns: ColumnView = null;
  public head: HeadView = null;
  public body: BodyView = null;
  public foot: FootView = null;
  public layout: LayoutView = null;
  public selection: SelectionView = null;
  public highlight: HighlightView = null;
  public edit: EditView = null;
  public nav: NavigationView = null;
  public scroll: ScrollView = null;
  public style: StyleView = null;
  public rowDetails: RowDetailsView = null;

  constructor(private root: RootService,
              private gridServiceFactory: GridService,
              private vscroll: VScrollService) {
  }

  init() {
    const root = this.root;
    const model = root.model;
    const table = root.table;
    const commandManager = root.commandManager;
    const gridService = this.gridServiceFactory.service(model);

    this.style = new StyleView(model, table);
    this.head = new HeadView(model, table, 'q-grid-core-th');
    this.body = new BodyView(model, table);
    this.foot = new FootView(model, table);
    this.columns = new ColumnView(model, gridService);
    this.layout = new LayoutView(model, table, gridService);
    this.selection = new SelectionView(model, table, commandManager, gridService);
    this.group = new GroupView(model, commandManager);
    this.pivot = new PivotView(model);
    this.highlight = new HighlightView(model, table, setTimeout);
    this.sort = new SortView(model);
    this.filter = new FilterView(model);
    this.edit = new EditView(model, table, commandManager);
    this.nav = new NavigationView(model, table, commandManager);
    this.pagination = new PaginationView(model);
    this.scroll = new ScrollView(model, table, this.vscroll, gridService);
    this.rowDetails = new RowDetailsView(model, table, commandManager);
  }
}
