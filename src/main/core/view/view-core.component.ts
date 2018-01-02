import { Component, OnDestroy, OnInit, Optional, DoCheck } from '@angular/core';
import { NgComponent, RootService } from 'ng2-qgrid/infrastructure/component';
import { VisibilityModel } from 'ng2-qgrid/core/visibility/visibility.model';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { jobLine } from 'ng2-qgrid/core/services';
import { GridService } from 'ng2-qgrid/main/grid';
import { CellService } from '../cell';
import { ViewCoreService } from './view-core.service';
import { ViewCtrl } from 'ng2-qgrid/core/view/view.ctrl';

@Component({
    selector: 'q-grid-core-view',
    templateUrl: './view-core.component.html',
    providers: [CellService]
})
export class ViewCoreComponent extends NgComponent
    implements OnInit, OnDestroy, DoCheck {
    private ctrl: ViewCtrl;

    constructor(
        private root: RootService,
        private view: ViewCoreService,
        private gridService: GridService
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        const model = this.root.model;
        this.view.init();

        const gridService = this.gridService.service(model);
        this.ctrl = new ViewCtrl(model, this.view, gridService);
    }

    ngOnDestroy() {
        super.ngOnDestroy();

        this.view.destroy();
        this.ctrl.dispose();
    }

    get model() {
        return this.root.model;
    }

    get visibility() {
        return this.model.visibility();
    }

    ngDoCheck() {
        const style = this.view.style;
        if (style.needInvalidate()) {
            const rowMonitor = style.monitor.row;
            const cellMonitor = style.monitor.cell;

            const domCell = cellMonitor.enter();
            const domRow = rowMonitor.enter();
            try {
                style.invalidate(domCell, domRow);
            } finally {
                rowMonitor.exit();
                cellMonitor.exit();
            }
        }
    }

    ngAfterViewChecked() {
        const scene = this.model.scene;
        if (scene().status === 'start') {
            scene(
                {
                    status: 'stop'
                },
                {
                    source: 'view-core.component',
                    behavior: 'core'
                }
            );
        }
    }
}
