import { Command } from '@qgrid/core/command/command';
import { CsvExport } from '@qgrid/core/export/csv/csv';
import { JsonExport } from '@qgrid/core/export/json/json';
import { XmlExport } from '@qgrid/core/export/xml/xml';
import { PluginService } from '@qgrid/core/plugin/plugin.service';
import { downloadFactory } from './download';
import { PdfWriter } from './pdf';
import { XlsxWriter } from './xlsx';

export class ExportPlugin {
	constructor(model, type) {
		this.model = model;
		this.type = type;

		this.csv = new Command({
			source: 'export',
			canExecute: () => this.type === 'csv',
			execute: () => {
				const pluginService = new PluginService(this.model);
				const fileSaver = pluginService.resolve('fileSaver');
				const csv = new CsvExport();
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
				const json = new JsonExport();
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
				const xml = new XmlExport();
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
				const xlsx = new XlsxWriter(lib);
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
				const pdf = new PdfWriter(lib);
				pdf.write(this.rows, this.columns, this.id);
			}
		});
	}

	get columns() {
		return this.model.columnList().line;
	}

	get rows() {
		return this.model.data().rows;
	}

	get id() {
		return this.model.grid().id;
	}
}
