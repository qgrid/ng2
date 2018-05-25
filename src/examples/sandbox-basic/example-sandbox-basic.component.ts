// import { Component, OnInit } from '@angular/core';
// import { DataService, Human } from './data.service';
// import { Grid, GridModel, Command } from 'ng2-qgrid';
// import { uniq, isUndefined } from '../core/utility/kit';
// import { map } from 'rxjs/operators';

// // import * as fileSaver from 'file-saver';
// // import * as xlsx from 'xlsx';
// // import * as pdf from 'jspdf';
// // import 'jspdf-autotable';

// @Component({
// 	selector: 'example-sandbox-basic',
// 	templateUrl: 'example-sandbox-basic.component.html',
// 	styleUrls: ['example-sandbox-basic.component.scss'],
// 	providers: [DataService]
// })
// export class ExampleSandboxBasic {
// 	public rows: Human[] = [];

// 	dataSet = '100';
// 	searchCommand = new Command();
// 	commitCommand = new Command({
// 		canExecute: e => e.column.type !== 'id'
// 	});

// 	public columns = [
// 		{
// 			key: 'id',
// 			title: 'ID',
// 			type: 'id',
// 			editor: 'number'
// 		},
// 		{
// 			key: 'avatar',
// 			title: 'Avatar',
// 			type: 'image',
// 			width: 80,
// 			value: (item, value) =>
// 				isUndefined(value) ? item.avatar : (item.avatar = value),
// 			labelPath: 'avatarFileName'
// 		},
// 		{
// 			key: 'name.last',
// 			title: 'Last Name',
// 			type: 'text',
// 			path: 'name.last'
// 		},
// 		{
// 			key: 'name.first',
// 			title: 'First Name',
// 			type: 'text',
// 			path: 'name.first'
// 		},
// 		{
// 			key: 'gender',
// 			title: 'Gender',
// 			type: 'text',
// 			value: (item, value) =>
// 				isUndefined(value) ? item.gender : (item.gender = value),
// 			editor: 'dropdown',
// 			editorOptions: {
// 				fetch: ['female', 'male']
// 			}
// 		},
// 		{
// 			key: 'birthday',
// 			title: 'Birthday',
// 			type: 'date',
// 			format: 'dd/MM/yyyy mm:ss'
// 		},
// 		{
// 			key: 'comment',
// 			title: 'Comment',
// 			type: 'text',
// 			value: (item, value) =>
// 				isUndefined(value) ? item.comment || '' : (item.comment = value),
// 			editor: 'text-area',
// 			width: 200,
// 			maxLength: 8000,
// 			viewWidth: 400
// 		},
// 		{
// 			key: 'password',
// 			title: 'Password',
// 			type: 'password',
// 			value: (item, value) =>
// 				isUndefined(value) ? item.password || '' : (item.password = value),
// 			isDefault: false
// 		},
// 		{
// 			key: 'teammates',
// 			title: 'Teammates',
// 			type: 'reference',
// 			value: (item, value) =>
// 				isUndefined(value) ? item.teammates || [] : (item.teammates = value),
// 			label: item =>
// 				(item.teammates || [])
// 					.map(mate => `${mate.name.last} ${mate.name.first}`)
// 					.join(', '),
// 			editorOptions: {
// 				modelFactory: () => {
// 					const model = this.grid.model();
// 					model
// 						.selection({
// 							mode: 'multiple',
// 							unit: 'row'
// 						})
// 						.columnList({
// 							generation: 'deep'
// 						})
// 						.data({
// 							rows: this.rows
// 						});

// 					return model;
// 				}
// 			}
// 		},
// 		{
// 			key: 'contact.address.zip',
// 			title: 'Zip',
// 			type: 'number',
// 			path: 'contact.address.zip',
// 			width: 70,
// 			isDefault: false
// 		},
// 		{
// 			key: 'contact.address.state',
// 			title: 'State',
// 			type: 'text',
// 			path: 'contact.address.state',
// 			width: 70
// 		},
// 		{
// 			key: 'contact.address.city',
// 			title: 'City',
// 			type: 'text',
// 			path: 'contact.address.city'
// 		},
// 		{
// 			key: 'contact.phone',
// 			title: 'Contact Phones',
// 			type: 'array',
// 			path: 'contact.phone',
// 			width: 250
// 		},
// 		{
// 			key: 'contact.email.primary',
// 			title: 'Primary Email',
// 			type: 'email',
// 			value: (item, value) =>
// 				isUndefined(value)
// 					? item.contact.email[0]
// 					: (item.contact.email[0] = value)
// 		},
// 		{
// 			key: 'contact.email.secondary',
// 			title: 'Secondary Email',
// 			type: 'email',
// 			value: (item, value) =>
// 				isUndefined(value)
// 					? item.contact.email.secondary || ''
// 					: (item.contact.email.secondary = value),
// 			editor: 'autocomplete',
// 			editorOptions: {
// 				fetch: (item, d, search = '') => {
// 					this.dataService.getPeople(this.dataSet).subscribe(people => {
// 						const emails = people.reduce<string[]>((result, human) => {
// 							return result.concat(
// 								human.contact.email.filter(
// 									email => email.indexOf(search) > -1
// 								)
// 							);
// 						}, []);

// 						d.resolve(emails);
// 					});
// 				}
// 			}
// 		},
// 		{
// 			key: 'likes',
// 			title: 'Likes',
// 			type: 'array'
// 		},
// 		{
// 			key: 'salary',
// 			title: 'Salary',
// 			type: 'currency',
// 			value: (item, v) => (isUndefined(v) ? item.salary || 0 : (item.salary = v))
// 		},
// 		{
// 			key: 'memberSince',
// 			title: 'Member Since',
// 			type: 'date',
// 			isDefault: false
// 		},
// 		{
// 			key: 'modifiedTime',
// 			title: 'Modified Time',
// 			type: 'time',
// 			value: (item, value) =>
// 				isUndefined(value) ? item.modified || '' : (item.modified = value)
// 		},
// 		{
// 			key: 'webPage',
// 			title: 'Web Page',
// 			type: 'url',
// 			value: (item, value) =>
// 				isUndefined(value)
// 					? item.webPage ||
// 					`https://corp.portal.com/${item.name.last}.${item.name.first}`
// 					: (item.webPage = value),
// 			label: (item, label) =>
// 				isUndefined(label)
// 					? item.webPageLabel || `${item.name.last} ${item.name.first}`
// 					: (item.webPageLabel = label)
// 		},
// 		{
// 			key: 'attachment',
// 			title: 'Attachment',
// 			type: 'file',
// 			value: (item, value) =>
// 				isUndefined(value) ? item.attachment : (item.attachment = value),
// 			label: (item, label) =>
// 				isUndefined(label)
// 					? item.attachmentLabel || null
// 					: (item.attachmentLabel = label),
// 			fetch: (item, d) => d.resolve()
// 		},
// 		{
// 			key: 'isOnline',
// 			title: 'Online',
// 			type: 'bool',
// 			value: (item, value) =>
// 				isUndefined(value)
// 					? isUndefined(item.isOnline) ? null : item.isOnline
// 					: (item.isOnline = value)
// 		}
// 	];

// 	gridModel: GridModel;
// 	filterFetch = this.fetch.bind(this);

// 	constructor(private dataService: DataService, public grid: Grid) {
// 		this.gridModel = grid.model();

// 		const persistence = this.gridModel.persistence;
// 		const storage = persistence().storage;
// 		persistence({
// 			storage: {
// 				getItem: id => {
// 					return new Promise(resolve => {
// 						storage.getItem(id).then(myPresets => {
// 							this.dataService.getPresets().subscribe(presets => {
// 								const persistenceState = this.gridModel.persistence();
// 								const allPresets = presets.concat(myPresets || []);
// 								resolve(allPresets);
// 							});
// 						});
// 					});
// 				},
// 				setItem: storage.setItem.bind(storage)
// 			}
// 		});

// 		this.loadData();
// 	}

// 	dataSetChange() {
// 		const service = this.grid.service(this.gridModel);
// 		service
// 			.invalidate()
// 			.then(() => {
// 				service.focus();
// 			});
// 	}

// 	loadData() {
// 		// this.dataService
// 		// 	.getPeople(this.dataSet)
// 		// 	.subscribe(people => {
// 		// 		this.rows = people;

// 		// 		people.forEach((row, i) => (row.id = i));
// 		// 		people[0].password = 'foo';
// 		// 		people[3].password = 'bar';
// 		// 		people[4].comment =
// 		// 			'Johnson Creek is a 25-mile (40 km) tributary of the Willamette River in the Portland.';
// 		// 	});


// 		this.gridModel.data({
// 			pipe: [
// 				(memo, context, next) =>
// 					this.dataService
// 						.getPeople(this.dataSet)
// 						.subscribe(people => {
// 							people.forEach((row, i) => (row.id = i));
// 							people[0].password = 'foo';
// 							people[3].password = 'bar';
// 							people[4].comment = 'Johnson Creek is a 25-mile (40 km) tributary of the Willamette River in the Portland.';
// 							next(people);
// 						})
// 			].concat(this.grid.pipeUnit.default)
// 		});
// 	}

// 	private fetch(key: string, context) {
// 		return this.dataService.getPeople(this.dataSet).pipe(
// 			map(people => {
// 				const data = people.map(context.value);
// 				const uniqData = uniq(data);
// 				const search = context.filter.toLowerCase();
// 				const filteredData = search
// 					? uniqData.filter(x => ('' + x).toLowerCase().indexOf(search) >= 0)
// 					: uniqData;

// 				filteredData.sort();
// 				const page = filteredData.slice(context.skip, context.skip + context.take);
// 				return page;
// 			}));
// 	}

// 	clearData() {
// 		this.rows = [];
// 	}
// }