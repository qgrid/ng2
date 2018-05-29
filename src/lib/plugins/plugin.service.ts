import { Injectable } from '@angular/core';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Table } from 'ng2-qgrid/core/dom/table';
import { RootService } from '../infrastructure/component/root.service';

@Injectable()
export class PluginService {
    constructor(private root: RootService) { }

    get model() {
        const { model } = this.root;
        Guard.notNull(model, 'model');

        return model;
    }

    get table() {
        const { table } = this.root;
        Guard.notNull(table, 'table');

        return table;
    }
}
