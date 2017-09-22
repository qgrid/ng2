import { Component, Input, OnInit } from '@angular/core';
import { isUndefined, clone } from 'ng2-qgrid/core/utility';
import { ColumnListService } from 'ng2-qgrid/main/column/column-list.service';
import * as columnService from 'ng2-qgrid/core/column/column.service';
import { columnFactory } from 'ng2-qgrid/core/column/column.factory';
import { RootService } from 'ng2-qgrid/infrastructure/component';
import { TemplateHostService } from 'ng2-qgrid/template/template-host.service';

@Component({
	selector: 'q-grid-column',
	template: '<ng-content></ng-content>',
	providers: [TemplateHostService]
})
export class ColumnComponent implements OnInit {
	@Input() public type: string;
	@Input() public key: string;
	@Input() public path: string;
	@Input() public class: string;
	@Input() public title: string;
	@Input() public value: any;
	@Input() public pin: string;
	@Input() public aggregation: string;
	@Input() public aggregationOptions: any;
	@Input() public editor: string;
	@Input() public editorOptions: any;
	@Input() public format: string;
	@Input() public symbol: string;
	@Input() public code: string;

	@Input() public width: number;
	@Input() public minWidth: number;
	@Input() public maxWidth: number;

	@Input() public canEdit: boolean;
	@Input() public canResize: boolean;
	@Input() public canSort: boolean;
	@Input() public canMove: boolean;
	@Input() public canFilter: boolean;
	@Input() public canHighlight: boolean;
	@Input() public canFocus: boolean;

	@Input() public isVisible: boolean;
	@Input() public index: number;

	@Input() public label: any;

	constructor(private root: RootService,
		private columnList: ColumnListService,
		private templateHost: TemplateHostService) {
	}

	ngOnInit() {
		const withKey = !isUndefined(this.key);
		if (!withKey) {
			if (!isUndefined(this.editor)) {
				this.key = `$default.${this.editor}`;
			} else if (!isUndefined(this.type)) {
				this.key = `$default.${this.type}`;
			} else {
				this.key = '$default';
			}
		}

		const model = this.root.model;
		const createColumn = columnFactory(model);
		const data = model.data;
		const dataState = data();
		const columns = clone(dataState.columns);
		let column = columnService.find(columns, this.key);
		if (column) {
			createColumn(this.type || 'text', column);
		} else {
			column = createColumn(this.type || 'text').model;
			column.key = this.key;
			columns.source = 'template';
			columns.push(column);
		}

		this.templateHost.key = `cell-${column.type}-${column.key}.tpl.html`;

		this.columnList.copy(column, this);
		// HACK: to understand if need to pass {$row: row} instead of just row in cell.core.js
		if (!isUndefined(this.value)) {
			column.$value = isUndefined(this.value) ? null : this.value;
		}

		if (!isUndefined(this.label)) {
			column.$label = isUndefined(this.label) ? null : this.label;
		}

		if (withKey) {
			this.columnList.add(column);
		} else {
			const settings = Object.keys(this)
				.filter(key => !isUndefined(this[key]) && column.hasOwnProperty(key))
				.reduce((memo, key) => {
					memo[key] = column[key];
					return memo;
				}, {});

			this.columnList.register(settings);
		}
	}
}
