import {Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit} from '@angular/core';
import {TemplateCacheService} from '@grid/template';
import {RootComponent, RootService} from '@grid/infrastructure/component';
import {LayerService} from '../layer';
import {Table} from '@grid/core/dom';
import {AppError} from '@grid/core/infrastructure';
import {TableCommandManager} from '@grid/core/command';
import {isUndefined} from '@grid/core/utility';

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
export class GridComponent extends RootComponent implements OnInit {
    @Input() model;
    @Input('rows') dataRows;
    @Input('columns') dataColumns;
    @Input('pipe') dataPipe;
    @Input('selection') selectionItems;
    @Input() selectionMode;
    @Input() selectionUnit;
    @Input() selectionKey;
    @Input() groupBy;
    @Input() pivotBy;
    @Input() sortBy;
    @Input() sortMode;
    @Input() editMode;
    @Input() editEnter;
    @Input() editCommit;
    @Input() editCancel;
    @Input() editReset;
    @Input() styleRow;
    @Input() styleCell;
    @Input('actions') actionItems;

    @Output() selectionChanged = new EventEmitter<any>();

    constructor(private rootService: RootService) {
        super();

        this.models = ['data', 'selection', 'sort', 'group', 'pivot', 'edit', 'style', 'action'];
        this.modelChanged.watch(model => this.rootService.model = model);
    }

    ngOnInit() {
        super.ngOnInit();

        const markup = this.rootService.markup;
        const layerService = new LayerService(markup);
        const bag = this.rootService.bag;
        const model = this.rootService.model;

        const tableContext = {
            layer: name => layerService.create(name),
            model: element => bag.get(element) || null
        };

        const table = new Table(model, markup, tableContext);
        this.rootService.table = table;
        this.rootService.commandManager = new TableCommandManager(this.applyFactory(), table);

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

    applyFactory(gf = null, mode = 'async') {
        return (lf, timeout) => {
            if (isUndefined(timeout)) {
                switch (mode) {
                    case 'async': {
                        timeout = 0;
                        break;
                    }
                    case 'sync': {
                        const result = lf();
                        if (gf) {
                            gf();
                        }

                        return result;
                    }
                    default:
                        throw new AppError('grid', `Invalid mode ${mode}`);
                }
            }

            return setTimeout(() => {
                lf();

                if (gf) {
                    gf();
                }
            }, timeout);
        };
    }

    get visibility() {
        // TODO: get rid of that
        return this.model.visibility();
    }
}
