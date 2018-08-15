import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { Column, BoolColumn, Grid, PipeContext, GridComponent, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-edit-row-basic',
	templateUrl: 'example-edit-row-basic.component.html',
	styleUrls: ['example-edit-row-basic.component.scss'],
	providers: [DataService]
})
export class ExampleEditRowBasicComponent implements OnInit {
	rows: Observable<Human[]>;
	columns: Array<Column | BoolColumn>;
	@ViewChild(GridComponent) myGrid: GridComponent;

	constructor(private dataService: DataService, private qgrid: Grid) {
		this.rows = dataService.getPeople();
	}

	ngOnInit() {
		const isUndef = x => x === undefined;

		this.columns = [
			{
				key: 'avatar',
				title: 'Avatar',
				type: 'image',
				width: 80,
				value: (item, value) => isUndef(value) ? item.avatar : item.avatar = value,
				labelPath: 'avatarFileName'
			},
			{
				key: 'name.last',
				title: 'Last Name',
				type: 'text',
				path: 'name.last'
			},
			{
				key: 'name.first',
				title: 'First Name',
				type: 'text',
				path: 'name.first'
			},
			{
				key: 'gender',
				title: 'Is Female',
				type: 'bool',
				trueValue: 'female',
				falseValue: 'male'
			},
			{
				key: 'birthday',
				title: 'Birthday',
				type: 'date'
			},
			{
				key: 'teammates',
				title: 'Teammates',
				type: 'reference',
				value: (item, value) => isUndef(value) ? item.teammates || [] : item.teammates = value,
				label: (item) => {
					const { rows } = this.myGrid.model.data();
					return (item.teammates || [])
						.map(x => `${x.name.last} ${x.name.first}`)
						.join(', ');
				},
				editorOptions: {
					modelFactory: () => {
						const { rows } = this.myGrid.model.data();
						const model = this.qgrid.model();
						model
							.selection({
								mode: 'multiple',
								unit: 'row',
								key: {
									row: x => rows.findIndex(r => r.name.last === x.name.last && r.name.first === x.name.first)
								}
							})
							.columnList({
								generation: 'deep'
							}) 
							.data({
								pipe: [
									(_: any[], context: PipeContext, next: (rows: any[]) => void) => {
										this.dataService.getPeople(10).subscribe(people => next(people));
									}
								].concat(this.qgrid.pipeUnit.default)
							});

						return model;
					}
				}
			},
			{
				key: 'comment',
				title: 'Comment',
				type: 'text',
				value: (item, value) => isUndef(value) ? item.comment || '' : item.comment = value,
				editor: 'text-area'
			},
			{
				key: 'password',
				title: 'Password',
				type: 'password',
				value: (item, value) => isUndef(value) ? item.password || '' : item.password = value
			},
			{
				key: 'contact.address.zip',
				title: 'Zip',
				type: 'id',
				path: 'contact.address.zip'
			},
			{
				key: 'contact.address.state',
				title: 'State',
				type: 'text',
				path: 'contact.address.state'
			},
			{
				key: 'contact.address.city',
				title: 'City',
				type: 'text',
				path: 'contact.address.city'
			},
			{
				key: 'contact.phone',
				title: 'Contact Phones',
				type: 'array',
				path: 'contact.phone',
			},
			{
				key: 'contact.email.primary',
				title: 'Primary Email',
				type: 'email',
				label: (item, label) => isUndef(label) ? item.emailLabel || item.contact.email[0] : item.emailLabel = label,
				value: (item, value) => isUndef(value) ? item.contact.email[0] : item.contact.email[0] = value
			},
			{
				key: 'likes',
				title: 'Likes',
				type: 'array'
			},
			{
				key: 'memberSince',
				title: 'Member Since',
				type: 'date'
			},
			{
				key: 'modifiedTime',
				title: 'Modified Time',
				type: 'time',
				value: (item, value) => isUndef(value) ? item.modified || '' : item.modified = value
			},
			{
				key: 'webPage',
				title: 'Web Page',
				type: 'url',
				value: (item, value) => isUndef(value)
					? item.webPage || `https://corp.portal.com/${item.name.last}.${item.name.first}`
					: item.webPage = value,
				label: (item, label) => isUndef(label)
					? item.webPageLabel || `${item.name.last} ${item.name.first}`
					: item.webPageLabel = label
			},
			{
				key: 'attachment',
				title: 'Attachment',
				type: 'file',
				value: (item, value) => isUndef(value) ? item.attachment : item.attachment = value,
				label: (item, label) => isUndef(label) ? item.attachmentLabel || null : item.attachmentLabel = label,
			}
		];

	}
}
