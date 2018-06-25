import { Component, Input, OnInit, Optional } from '@angular/core';
import { PluginService as ImportService } from 'ng2-qgrid/core/plugin/plugin.service';
import { PluginService } from '../plugin.service';
import { Command } from 'ng2-qgrid/core/command/command';
import { Json } from 'ng2-qgrid/core/export/json';
import { Xml } from 'ng2-qgrid/core/export/xml';
import { Csv } from 'ng2-qgrid/core/export/csv';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { Xlsx } from './xlsx';
import { Pdf } from './pdf';
import { downloadFactory } from './download';
import { TemplateHostService } from '../../template/template-host.service';

@Component({
	selector: 'q-grid-export',
	templateUrl: './export.component.html',
	providers: [TemplateHostService, PluginService]
})
export class ExportComponent implements OnInit {
	@Input() type: string;

	context: { $implicit: ExportComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService, private templateHost: TemplateHostService) {
	}

	ngOnInit() {
		this.templateHost.key = (source: string) => `${source}-${this.templateHostKey}`;
	}

	get rows() {
		return this.plugin.model.data().rows;
	}

	get columns() {
		return this.plugin.model.columnList().line;
	}

	get id() {
		return this.plugin.model.grid().id;
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
			const importService = new ImportService(this.plugin.model);
			const fileSaver = importService.resolve('fileSaver');
			const csv = new Csv();
			const data = csv.write(this.rows, this.columns);
			const download = downloadFactory(fileSaver);
			download(this.id, data, `text/${this.type}`);

		}
	});
	json = new Command({
		canExecute: () => this.type === 'json',
		execute: () => {
			const importService = new ImportService(this.plugin.model);
			const fileSaver = importService.resolve('fileSaver');
			const json = new Json();
			const data = json.write(this.rows, this.columns);
			const download = downloadFactory(fileSaver);
			download(this.id, data, `text/${this.type}`);
		}
	});
	xml = new Command({
		canExecute: () => this.type === 'xml',
		execute: () => {
			const importService = new ImportService(this.plugin.model);
			const fileSaver = importService.resolve('fileSaver');
			const xml = new Xml();
			const data = xml.write(this.rows);
			const download = downloadFactory(fileSaver);
			download(this.id, data, `application/${this.type}`);
		}
	});
	xlsx = new Command({
		canExecute: () => this.type === 'xlsx',
		execute: () => {
			const importService = new ImportService(this.plugin.model);
			const lib = importService.resolve('xlsx');
			const fileSaver = importService.resolve('fileSaver');
			const xlsx = new Xlsx(lib);
			const data = xlsx.write(this.rows, this.columns);
			const download = downloadFactory(fileSaver);
			download(this.id, data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx');
		}
	});
	pdf = new Command({
		canExecute: () => this.type === 'pdf',
		execute: () => {
			const importService = new ImportService(this.plugin.model);
			const lib = importService.resolve('pdf');
			const pdf = new Pdf(lib);
			pdf.write(this.rows, this.columns, this.id);
		}
	});
}
