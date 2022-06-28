import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  ColumnModel,
  Command,
  DataState,
  EditState,
  EditStateMethod,
  EditStateMode,
  EventListener,
  EventManager,
  eventPath,
  FilterState,
  FilterStateUnit,
  GridError,
  GridHost,
  GridState,
  GridStateInteractionMode,
  GroupState,
  GroupStateMode,
  GroupStateSummary,
  PivotState,
  ScrollState,
  ScrollStateMode,
  SelectionState,
  SelectionStateArea,
  SelectionStateMode,
  SelectionStateUnit,
  SortState,
  SortStateMode,
  StyleCellCallback,
  StyleRowCallback,
  StyleState,
  tableFactory,
  VisibilityState,
} from '@qgrid/core';
import { LayerService } from '../layer/layer.service';
import { GridPlugin } from '../plugin/grid-plugin';
import { StateAccessor } from '../state/state-accessor';
import { TemplateCacheService } from '../template/template-cache.service';
import { TemplateLinkService } from '../template/template-link.service';
import { TemplateService } from '../template/template.service';
import { ThemeService } from '../theme/theme.service';
import { Grid } from './grid';
import { GridLet } from './grid-let';
import { GridModel } from './grid-model';
import { GridModelBuilder } from './grid-model.builder';
import { GridRoot } from './grid-root';

@Component({
  selector: 'q-grid',
  providers: [
    Grid,
    GridPlugin,
    GridRoot,
    GridLet,
    LayerService,
    TemplateCacheService,
    TemplateLinkService,
    TemplateService,
    StateAccessor,
  ],
  styleUrls: ['../../../../qgrid-styles/index.scss'],
  templateUrl: './grid.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit, OnChanges {
  private firstSetup = true;

  private gridState = this.stateAccessor.setter(GridState);
  private dataState = this.stateAccessor.setter(DataState);
  private editState = this.stateAccessor.setter(EditState);
  private filterState = this.stateAccessor.setter(FilterState);
  private groupState = this.stateAccessor.setter(GroupState);
  private pivotState = this.stateAccessor.setter(PivotState);
  private selectionState = this.stateAccessor.setter(SelectionState);
  private scrollState = this.stateAccessor.setter(ScrollState);
  private sortState = this.stateAccessor.setter(SortState);
  private styleState = this.stateAccessor.setter(StyleState);

  themeComponent: any;

  @Input() set model(value: GridModel) {
    this.root.model = value;
  }

  get model(): GridModel {
    return this.root.model;
  }

  // @deprecated
  get visibility(): VisibilityState {
    // TODO: get rid of that
    const { model } = this.plugin;
    return model.visibility();
  }

  @Input('id') set gridId(id: string) { this.gridState({ id }); }
  @Input('header') set gridTitle(header: string) { this.gridState({ caption: header }); }
  @Input('caption') set gridCaption(caption: string) { this.gridState({ caption }); }
  @Input('interactionMode') set gridInteractionMode(interactionMode: GridStateInteractionMode) { this.gridState({ interactionMode }); }

  @Input('columns') set dataColumns(columns: Array<ColumnModel>) { if (Array.isArray(columns)) { this.dataState({ columns }); } }
  @Input('rows') set dataRows(rows: any[] | null) {
    if (Array.isArray(rows)) {
      this.dataState({ rows });
    }
  }

  @Input() set editCancel(cancel: Command) { this.editState({ cancel }); }
  @Input() set editCommit(commit: Command) { this.editState({ commit }); }
  @Input() set editEnter(enter: Command) { this.editState({ enter }); }
  @Input() set editMethod(method: EditStateMethod) { this.editState({ method }); }
  @Input() set editMode(mode: EditStateMode) { this.editState({ mode }); }
  @Input() set editReset(reset: Command) { this.editState({ reset }); }

  @Input() set filterUnit(unit: FilterStateUnit) { this.filterState({ unit }); }

  @Input() set groupBy(by: Array<string>) { this.groupState({ by }); }
  @Input() set groupMode(mode: GroupStateMode) { this.groupState({ mode }); }
  @Input() set groupSummary(summary: GroupStateSummary) { this.groupState({ summary }); }

  @Input() set pivotBy(by: Array<string>) { this.pivotState({ by }); }

  @Input('selection') set selectionItems(items: Array<any>) { this.selectionState({ items }); }
  @Input() set selectionArea(area: SelectionStateArea) { this.selectionState({ area }); }
  @Input() set selectionMode(mode: SelectionStateMode) { this.selectionState({ mode }); }
  @Input() set selectionUnit(unit: SelectionStateUnit) { this.selectionState({ unit }); }

  @Input() set scrollMode(mode: ScrollStateMode) { this.scrollState({ mode }); }

  @Input() set sortBy(by: Array<string>) { this.sortState({ by }); }
  @Input() set sortMode(mode: SortStateMode) { this.sortState({ mode }); }
  @Input() set sortTrigger(trigger: Array<string>) { this.sortState({ trigger }); }

  @Input() set styleCell(cell: StyleCellCallback | { [key: string]: StyleCellCallback }) { this.styleState({ cell }); }
  @Input() set styleRow(row: StyleRowCallback) { this.styleState({ row }); }

  constructor(
    private root: GridRoot,
    private plugin: GridPlugin,
    private elementRef: ElementRef,
    private zone: NgZone,
    private layerService: LayerService,
    private cd: ChangeDetectorRef,
    private stateAccessor: StateAccessor,
    private modelBuilder: GridModelBuilder,
    @Inject(DOCUMENT) private document: any,
    theme: ThemeService,
  ) {
    if (!theme.component) {
      throw new GridError(
        'grid.component',
        'Ensure that grid theme module was included',
      );
    }

    this.themeComponent = theme.component;
  }

  ngOnInit() {
    if (this.firstSetup) {
      this.setup();
    }

    const { model, disposable, observe } = this.plugin;
    const { nativeElement } = this.elementRef;

    if (nativeElement.classList.length) {
      model.style({
        classList: Array.from(nativeElement.classList),
      }, {
        source: 'grid.component',
      });
    }

    const host = new GridHost(
      nativeElement,
      this.plugin,
    );
    const listener = new EventListener(nativeElement, new EventManager(this));
    const docListener = new EventListener(this.document, new EventManager(this));

    this.zone.runOutsideAngular(() => {
      disposable.add(
        docListener.on('focusin', () => host.invalidateActive()),
      );

      disposable.add(
        docListener.on('mousedown', e => {
          if (model.edit().status === 'edit') {
            const path = eventPath(e);
            const clickedOutside = path.every(x => x !== nativeElement && !x.classList.contains('q-grid-editor-part'));
            if (clickedOutside) {
              model.edit({
                status: 'view',
              }, {
                source: 'document.click',
              });
            }
          }
        }));


      disposable.add(
        listener.on('keyup', e => host.keyUp(e, 'grid')),
      );
    });

    disposable.add(
      listener.on('keydown', e => host.keyDown(e, 'grid')),
    );


    observe(model.visibilityChanged)
      .subscribe(() => this.cd.detectChanges());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model || this.firstSetup) {
      this.setup();
    }

    this.stateAccessor.write(this.model);
  }

  private setup() {
    this.firstSetup = false;

    const model = this.model || this.modelBuilder.build();
    const table = tableFactory(model, name => this.layerService.create(name));

    this.root.model = model;
    this.root.table = table;
  }
}
