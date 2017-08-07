import {Component, Input, OnInit, Optional} from '@angular/core';
import {PluginService} from '@grid/core/plugin';
import {PluginComponent} from '../plugin.component';
import {Command} from '@grid/core/command';
import {Json} from '@grid/core/export/json';
import {Xml} from '@grid/core/export/xml';
import {Csv} from '@grid/core/export/csv';
import {Xlsx} from './xlsx';
import {Pdf} from './pdf';
import {downloadFactory} from './download';
import {TemplateHostService} from '@grid/template';
import {RootService} from '@grid/infrastructure/component';

@Component({
    selector: 'q-grid-export',
    template: require('./export.component.html'),
    providers: [TemplateHostService]
})

export class ExportComponent extends PluginComponent implements OnInit {
    @Input() type: string;

    constructor(@Optional() public root: RootService, private templateHost: TemplateHostService) {
        super(root);
    }

    ngOnInit() {
        super.ngOnInit();
        this.templateHost.key = this.templateHostKey;
    }

    get rows() {
        return this.root.model.data().rows;
    }

    get columns() {
        return this.root.model.data().columns;
    }

    get id() {
        return this.root.model.grid().id;
    }

    get templateContentKey() {
        return [`content-${this.templateHostKey}`, 'plugin-export.tpl.html'];
    }

    get templateHostKey() {
        return `plugin-export-${this.type}.tpl.html`;
    }

    csv = new Command({
        canExecute: () => this.type === 'csv',
        execute: () => {
            const pluginService = new PluginService(this.model);
            const fileSaver = pluginService.resolve('fileSaver');
            const csv = new Csv();
            const data = csv.write(this.rows, this.columns);
            const download = downloadFactory(fileSaver);
            download(this.id, data, `text/${this.type}`);

        }
    });
    json = new Command({
        canExecute: () => this.type === 'json',
        execute: () => {
            const pluginService = new PluginService(this.model);
            const fileSaver = pluginService.resolve('fileSaver');
            const json = new Json();
            const data = json.write(this.rows, this.columns);
            const download = downloadFactory(fileSaver);
            download(this.id, data, `text/${this.type}`);
        }
    });
    xml = new Command({
        canExecute: () => this.type === 'xml',
        execute: () => {
            const pluginService = new PluginService(this.model);
            const fileSaver = pluginService.resolve('fileSaver');
            const xml = new Xml();
            const data = xml.write(this.rows);
            const download = downloadFactory(fileSaver);
            download(this.id, data, `application/${this.type}`);
        }
    });
    xlsx = new Command({
        canExecute: () => this.type === 'xlsx',
        execute: () => {
            const pluginService = new PluginService(this.model);
            const lib = pluginService.resolve('xlsx');
            const fileSaver = pluginService.resolve('fileSaver');
            const xlsx = new Xlsx(lib);
            const data = xlsx.write(this.rows, this.columns);
            const download = downloadFactory(fileSaver);
            download(this.id, data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx');
        }
    });
    pdf = new Command({
        canExecute: () => this.type === 'pdf',
        execute: () => {
            const pluginService = new PluginService(this.model);
            const lib = pluginService.resolve('pdf');
            const pdf = new Pdf(lib);
            pdf.write(this.rows, this.columns, this.id);
        }
    });
}
