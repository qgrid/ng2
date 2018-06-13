import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Grid, EditorOptions, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-column-reference-basic',
	templateUrl: 'example-column-reference-basic.component.html',
	styleUrls: ['example-column-reference-basic.component.scss']
})
export class ExampleColumnReferenceBasicComponent {
	rows = [
		{
			'notEditable': ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
			'editable': ['Lorem', 'ipsum'],
			'customTemplate': ['Lorem', 'dolor', 'amet'],
			'singleValue': 'Lorem',
			'complexValues': [{ value: 'Lorem' }, { value: 'dolor' }, { value: 'amet' }]
		}
	];

	convert = rows => rows.map(value => ({ value }));

	notEditableOptions: EditorOptions = {
		modelFactory: ({ row, reference }) => {
			reference.commit = new Command({
				canExecute: () => false
			});
			
			const model = this.qgrid.model();
			model
				.data({
					rows: this.convert(this.rows[0].notEditable),
					columns: [
						{
							key: 'value',
							title: 'Not Editable'
						}
					]
				})
				.visibility({
					toolbar: {
						top: false,
						bottom: false,
						right: false,
						left: false
					}
				});

			return model;
		}
	};

	editableOptions: EditorOptions = {
		modelFactory: ({ row, column, reference }) => {
			// we need to override commit because of `this.convert`, 
			// we need to pass ['Lorem', 'ipsum'] but not [{value: 'Lorem'}, {value: 'ipsum'}]
			reference.commit = new Command({
				execute: e => row[column.key] = e.items
			});

			reference.value = this.convert(row[column.key]);

			const model = this.qgrid.model();
			model
				.data({
					rows: this.convert(this.rows[0].notEditable),
					columns: [
						{
							key: 'value',
							title: 'Editable'
						}
					]
				})
				.selection({
					unit: 'row',
					mode: 'multiple',
					key: {
						row: x => x.value,
						column: x => x.key
					}
				});

			return model;
		}
	};

	singleValueOptions: EditorOptions = {
		modelFactory: ({ row, column, reference }) => {
			// we need to override commit because of `this.convert`, 
			// we need to pass ['Lorem', 'ipsum'] but not [{value: 'Lorem'}, {value: 'ipsum'}]
			reference.commit = new Command({
				execute: e => row[column.key] = e.items
			});

			reference.value = { value: row[column.key] };

			const model = this.qgrid.model();
			model
				.data({
					rows: this.convert(this.rows[0].notEditable),
					columns: [
						{
							key: 'value',
							title: 'Editable'
						}
					]
				})
				.selection({
					unit: 'row',
					mode: 'single',
					key: {
						row: x => x.value,
						column: x => x.key
					}
				});

			return model;
		},
	};

	complexValuesLabel = row => row.complexValues.map(x => x.value).join(', ');

	complexValuesOptions: EditorOptions = {
		modelFactory: ({ row }) => {
			const model = this.qgrid.model();
			model
				.data({
					rows: this.convert(this.rows[0].notEditable),
					columns: [
						{
							key: 'value',
							title: 'Editable'
						}
					]
				})
				.selection({
					unit: 'row',
					mode: 'multiple',
					key: {
						row: x => x.value,
						column: x => x.key
					}
				});

			return model;
		}
	};

	constructor(private qgrid: Grid) {
	}
}