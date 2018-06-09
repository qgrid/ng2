import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Grid, EditorOptions } from 'ng2-qgrid';

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
			'customTemplate': ['Lorem', 'dolor', 'amet']
		}
	];

	notEditableOptions: EditorOptions = {
		modelFactory: ({ row }) => {
			const model = this.qgrid.model();
			model
				.data({
					rows: this.rows[0].notEditable.map(value => ({ value })),
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
		modelFactory: ({ row }) => {
			const model = this.qgrid.model();
			model
				.data({
					rows: this.rows[0].notEditable.map(value => ({ value })),
					columns: [
						{
							key: 'value',
							title: 'Editable'
						}
					]
				})
				.selection({
					unit: 'row',
					mode: 'multiple'
				});

			return model;
		}
	};

	constructor(private qgrid: Grid) {
	}
}