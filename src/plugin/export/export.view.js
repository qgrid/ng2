import { PluginService } from '@grid/core/plugin';
import { Command } from '@grid/core/command';
import { Csv } from '@grid/core/export/csv';
import { Json } from '@grid/core/export/json';
import { Xml } from '@grid/core/export/xml';
import { downloadFactory } from './download';
import { Xlsx } from './xlsx';
import { Pdf } from './pdf';

export class ExportView {
	constructor(model, context) {
		this.model = model;
		this.type = context.type;
		this.csv = new Command({
			source: 'export',
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
		this.json = new Command({
			source: 'export',
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
		this.xml = new Command({
			source: 'export',
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
		this.xlsx = new Command({
			source: 'export',
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
		this.pdf = new Command({
			source: 'export',
			canExecute: () => this.type === 'pdf',
			execute: () => {
				const pluginService = new PluginService(this.model);
				const lib = pluginService.resolve('pdf');
				const pdf = new Pdf(lib);
				pdf.write(this.rows, this.columns, this.id);
			}
		});
	}

	get id() {
		return this.model.grid().id;
	}

	get rows() {
		return this.model.data().rows;
	}

	get columns() {
		return this.model.columnList().line;
	}
}
