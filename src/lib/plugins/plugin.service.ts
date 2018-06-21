import { Injectable, OnDestroy, SimpleChanges } from '@angular/core';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';
import { ModelProxy } from 'ng2-qgrid/core/infrastructure/model.proxy';
import { RootService } from '../infrastructure/component/root.service';
import { ModelBinder } from 'ng2-qgrid/core/infrastructure/model.bind';
import { Model as GridModel } from 'ng2-qgrid/core/infrastructure/model';
import { Table as DomTable } from 'ng2-qgrid/core/dom/table';

export { Model as GridModel, ModelEventArg as GridEventArg, ModelEvent as GridEvent } from 'ng2-qgrid/core/infrastructure/model';
export { Table as DomTable } from 'ng2-qgrid/core/dom/table';


@Injectable()
export class PluginService implements OnDestroy {
    private modelProxy: ModelProxy = null;

    constructor(private root: RootService) { }

    get model(): GridModel {
        const { model } = this.root;
        if (!this.modelProxy) {
            Guard.notNull(model, 'model');

            this.modelProxy = new ModelProxy(model);
            return this.modelProxy.subject;
        }

        if (model !== this.modelProxy.target) {
            this.modelProxy.dispose();
            Guard.notNull(model, 'model');

            this.modelProxy = new ModelProxy(model);
            return this.modelProxy.subject;
        }

        return this.modelProxy.subject;
    }

    get table(): DomTable {
        const { table } = this.root;
        Guard.notNull(table, 'table');

        return table;
    }

    keep(changes: SimpleChanges, models: string[]) {
        const host = {};
        for (let key in changes) {
            const change = changes[key];
            host[key] = change.currentValue;
        }

        const binder = new ModelBinder(host);
        const commit = binder.bound(this.model, models, false, false);
        commit();
    }

    ngOnDestroy() {
        if (this.modelProxy) {
            this.modelProxy.dispose();
            this.modelProxy = null;
        }
    }
}
