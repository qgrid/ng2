import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Grid, EditorOptions, Command } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'column-reference-basic',
	'Cell value is a reference to another value'
];

@Component({
	selector: 'example-column-reference-basic',
	templateUrl: 'example-column-reference-basic.component.html',
	styleUrls: ['example-column-reference-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnReferenceBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows = [
		{
			'notEditable': ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
			'editable': ['Lorem', 'ipsum'],
			'customTemplate': ['Lorem', 'dolor', 'amet'],
			'singleValue': 'Lorem',
			'complexValues': [{ value: 'Lorem' }, { value: 'dolor' }, { value: 'amet' }]
		}
	];

	notEditableOptions: EditorOptions = {
		modelFactory: ({ reference }) => {
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
				.selection({
					rowKey: x => x.value,
				})
				.visibility({
					toolbar: {
						top: true,
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
			// We need to override commit because of `this.convert`,
			// We need to pass ['Lorem', 'ipsum'] but not [{value: 'Lorem'}, {value: 'ipsum'}]
			reference.commit = new Command({
				execute: e => {
					row[column.key] = e.items;
					// To prevent default cell commit return false.
					return false;
				}
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
					rowKey: x => x.value,
				});

			return model;
		}
	};

	singleValueOptions: EditorOptions = {
		modelFactory: ({ row, column, reference }) => {
			// We need to override commit because of `this.convert`,
			// We need to pass ['Lorem', 'ipsum'] but not [{value: 'Lorem'}, {value: 'ipsum'}]
			reference.commit = new Command({
				execute: e => {
					row[column.key] = e.items[0];
					return false;
				}
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
					rowKey: x => x.value,
				});

			return model;
		}
	};

	complexValuesOptions: EditorOptions = {
		modelFactory: () => {
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
					rowKey: x => x.value,
				});

			return model;
		}
	};

	complexValuesLabel = row => row.complexValues.map(x => x.value).join(', ');
	convert = rows => rows.map(value => ({ value }));

	constructor(private qgrid: Grid) { }
}
