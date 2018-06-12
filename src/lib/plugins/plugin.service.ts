import { Injectable, OnDestroy, SimpleChanges, bind } from '@angular/core';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Table } from 'ng2-qgrid/core/dom/table';
import { ModelProxy } from 'ng2-qgrid/core/infrastructure/model.proxy';
import { RootService } from '../infrastructure/component/root.service';
import { ModelBinder } from 'ng2-qgrid/core/infrastructure/model.bind';

@Injectable()
export class PluginService implements OnDestroy {
    private modelProxy: ModelProxy = null;

    constructor(private root: RootService) { }

    get model() {
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

    get table() {
        const { table } = this.root;
        Guard.notNull(table, 'table');

        return table;
    }

    tie(host: any, models: string[]) {
        const binder = new ModelBinder(host);
        binder.bound(this.model, models, true, false);
    }

    ngOnDestroy() {
        if (this.modelProxy) {
            this.modelProxy.dispose();
            this.modelProxy = null;
        }
    }
}
