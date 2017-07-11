import {Component, Input} from '@angular/core';
// import {PluginService} from '@grid/core/plugin';
import {PluginComponent} from '../plugin.component';
import {Command} from '@grid/core/infrastructure';
import {Csv} from '@grid/core/export/csv';
// import {downloadFactory} from './download';

@Component({
    selector: 'q-grid-export',
    template: require('./export.component.html')
})

export class ExportComponent extends PluginComponent {
    @Input() type: string;

    get rows() {
        return this.root.model.data().rows;
    }

    get columns() {
        return this.root.model.data().columns;
    }

    get id() {
        return this.root.model.grid().id;
    }

    csv = new Command({
        canExecute: () => this.type === 'csv',
        execute: () => {
            // const pluginService = new PluginService(this.model);
            // const fileSaver = pluginService.resolve('fileSaver');
            const csv = new Csv();
            const data = csv.write(this.rows, this.columns);
            // const download = downloadFactory(fileSaver);
            // download(this.id, data, `text/${this.type}`);

        }
    });
}
