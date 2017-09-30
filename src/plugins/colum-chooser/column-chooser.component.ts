import {Component, Optional, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {Command} from 'ng2-qgrid/core/command';
import {PipeUnit} from 'ng2-qgrid/core/pipe/pipe.unit2';
import {GridService} from 'ng2-qgrid/main/grid';
import * as columnService from 'ng2-qgrid/core/column/column.service';
import {isFunction, noop} from 'ng2-qgrid/core/utility';
import {Aggregation} from 'ng2-qgrid/core/services';

import {RootService} from 'ng2-qgrid/infrastructure/component';
import {PluginComponent} from '../plugin.component';
import { TemplatePath } from 'ng2-qgrid/core/template';

const GRID = 'qGrid';
const COLUMN_CHOOSER_NAME = `${GRID}ColumnChooser`;

@Component({
	selector: 'q-grid-column-chooser',
	template: `
		<ng-container key="column-chooser.tpl" [context]="context"></ng-container>
	`
	// templateUrl: './column-chooser.tpl.html'
})
export class ColumnChooserComponent extends PluginComponent implements OnInit, OnDestroy {
	@Input('canAggregate') 	columnChooserCanAggregate: boolean;
	@Output('submit') submitEvent = new EventEmitter<any>();
	@Output('cancel') cancelEvent = new EventEmitter<any>();

	private service: any;
	private aggregations: any;
	private origin: any;

	private columns: any[];

	private defaultSelected: boolean;

	private get allSelected(): boolean {
		return this.stateAll();
	}
	private set allSelected(value: boolean) {
		for (const column of this.columns) {
			column.isVisible = value;
		}
		this.service.invalidate('column.chooser', {}, PipeUnit.column);
		this.setDefaultStatus();
	}

	private get allSelectedIndeterminate(): boolean {
		return this.columns.some(this.columnState.bind(this));
	}

	constructor(@Optional() root: RootService, private gridService: GridService, private cdRef: ChangeDetectorRef) {
		super(root);

		this.models = ['columnChooser'];
		this.initColumns();
		this.setDefaultStatus();
	}

	stateAll() {
		const allSet = this.columns.every(this.columnState.bind(this));
		return allSet;
	}

	setDefaultStatus() {
		this.defaultSelected = this.columns.every(c => (c.isDefault !== false && c.isVisible !== false) ||
			(c.isDefault === false && c.isVisible === false));
	}

	columnState(column, value) {
		return column.isVisible;
	}

	setColumnState(column, value) {
		column.isVisible = value;
		this.service.invalidate('column.chooser', {}, PipeUnit.column);
	}

	private onSubmit() {
		this.submitEvent.emit();
	}

	private onCancel() {
		this.cancelEvent.emit();
	}

	private toggle = new Command({
		execute: column => {
/*
			column.isVisible = !column.isVisible;
			this.service.invalidate('column.chooser', {}, PipeUnit.column);

			this.allSelected = this.stateAll();
*/
		}
	});

	private toggleAll = new Command({
		execute: () => {

		}
	});

	private defaults = new Command({
		execute: () => {

			for (const column of this.columns) {
				column.isVisible = column.isDefault !== false;
			}
			this.service.invalidate('column.chooser', {}, PipeUnit.column);
			this.setDefaultStatus();
		}
	});

	private toggleAggregation = new Command({
		execute: () => {
			this.service.invalidate('column.chooser', {}, PipeUnit.column);
		},
	});

	private drop = new Command({
		canExecute: e => {
			if (e.source && e.source.key === COLUMN_CHOOSER_NAME) {
				const map = columnService.map(this.model.data().columns);
				return map.hasOwnProperty(e.target.value);
			}

			return false;
		},
		execute: e => {
			const model = this.model;
			const view = model.view;
			const columnRows = view().columns;
			for (const columns of columnRows) {
				const targetIndex = columns.findIndex(c => c.model.key === e.target.value);
				const sourceIndex = columns.findIndex(c => c.model.key === e.source.value);
				if (targetIndex >= 0 && sourceIndex >= 0) {
					const sourceColumn = columns[sourceIndex].model;
					const targetColumn = columns[targetIndex].model;
					const indexMap = Array.from(model.columnList().index);
					const sourceColumnIndex = indexMap.indexOf(sourceColumn.key);
					const targetColumnIndex = indexMap.indexOf(targetColumn.key);
					indexMap.splice(sourceColumnIndex, 1);
					indexMap.splice(targetColumnIndex, 0, sourceColumn.key);
					model.columnList({index: indexMap}, {source: 'column.chooser'});
				}
			}
		}
	});

	private drag = new Command({
		canExecute: e => {
			if (e.source.key === COLUMN_CHOOSER_NAME) {
				const map = columnService.map(this.model.data().columns);
				return map.hasOwnProperty(e.source.value) && map[e.source.value].canMove !== false;
			}

			return false;
		},
		execute: noop
	});

	private submit = new Command({
		execute: () => this.onSubmit()
	});

	private cancel = new Command({
		execute: () => {
			this.reset.execute();
			this.onCancel();
		}
	});

	private reset = new Command({
		execute: () => {
			const origin = this.origin;
			this.model.columnList({
				index: Array.from(origin.index)
			});

			this.columns.forEach(column => {
				const originColumn = origin.columns[column.key];
				column.isVisible = originColumn.isVisible;
				column.aggregation = originColumn.aggregation;
			});

			this.service.invalidate('column.chooser', {}, PipeUnit.column);
		}
	});

	onInit() {
	}

	private initColumns() {
		const model = this.model;
		this.service = this.gridService.service(model);
		this.aggregations = Object
			.getOwnPropertyNames(Aggregation)
			.filter(key => isFunction(Aggregation[key]));

		this.columns = [];
		this.origin = {
			index: Array.from(model.columnList().index),
			columns: model.data().columns
				.reduce((memo, column) => {
					memo[column.key] = {
						isVisible: column.isVisible,
						aggregation: column.aggregation
					};
					return memo;
				}, {})
		};

		this.using(model.viewChanged.watch(e => {
			if (e.tag.source === 'column.chooser') {
				return;
			}

			if (e.hasChanges('columns')) {
				this.columns = Array.from(model.data().columns);
				this.columns.sort((x, y) => x.index - y.index);
			}
		}));
	}

	get canAggregate() {
		const result = this.columnChooserCanAggregate;
		return result;
	}

	get resource() {
		const result = this.model.visibility().resource;
		return result;
	}

	transfer(column) {
		const result = {
			key: COLUMN_CHOOSER_NAME,
			value: column.key
		};
		return result;
	}
}
