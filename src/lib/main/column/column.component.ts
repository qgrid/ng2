import { Component, Input, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { isUndefined } from 'ng2-qgrid/core/utility/kit';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { TemplateHostService } from '../../template/template-host.service';
import { ColumnListService } from '../../main/column/column-list.service';
import { ColumnService } from './column.service';

@Component({
	selector: 'q-grid-column',
	template: '<ng-content></ng-content>',
	providers: [TemplateHostService, ColumnService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent implements OnInit, OnDestroy {
	model: ColumnModel;

	@Input() type: string;
	@Input() key: string;
	@Input() class: 'data' | 'control' | 'markup' | 'pivot';
	@Input() title: string;
	@Input() pin: null | 'left' | 'right';
	@Input() aggregation: string;
	@Input() aggregationOptions: any;
	@Input() editor: string;
	@Input() editorOptions: any;
	@Input() format: string;
	@Input() symbol: string;
	@Input() code: string;

	@Input() width: number | string;
	@Input() minWidth: number | string;
	@Input() maxWidth: number | string;
	@Input() viewWidth: number | string;
	@Input() offset: number | string;

	@Input() canEdit: boolean;
	@Input() canResize: boolean;
	@Input() canSort: boolean;
	@Input() canMove: boolean;
	@Input() canFilter: boolean;
	@Input() canHighlight: boolean;
	@Input() canFocus: boolean;

	@Input() isVisible: boolean;
	@Input() index: number;

	@Input() label: (row: any, value?: any) => any | any;
	@Input() labelPath: string;

	@Input() itemLabel: (row: any, value?: any) => any;
	@Input() itemFormat: string;
	@Input() itemType: string;

	@Input() value: (row: any, value?: any) => any;
	@Input() path: string;

	@Input() compare: (x: any, y: any) => number;

	@Input() trueValue: any;
	@Input() falseValue: any;

	@Input() maxLength: number;

	constructor(
		private columnList: ColumnListService,
		private templateHost: TemplateHostService,
		private columnService: ColumnService
	) { }

	ngOnInit() {
		const withKey = !isUndefined(this.key);
		const withType = !isUndefined(this.type);
		if (!withKey) {
			this.key = this.columnList.generateKey(this);
		}

		const column = this.columnList.extract(this.key, this.type);

		this.templateHost.key = source => {
			const parts = [source, 'cell'];

			if (withType) {
				parts.push(column.type);
			}

			if (withKey) {
				parts.push(`the-${column.key}`);
			}

			return parts.join('-') + '.tpl.html';
		};

		this.columnList.copy(column, this);

		this.columnService.column = column;
		const { parent } = this.columnService;
		if (withKey || parent.parent) {
			this.columnList.add(column, parent.column);
		} else {
			const settings = Object.keys(this)
				.filter(
					key => !isUndefined(this[key]) && column.hasOwnProperty(key)
				)
				.reduce((memo, key) => {
					memo[key] = column[key];
					return memo;
				}, {});

			this.columnList.register(settings);
		}

		this.model = column;
	}

	ngOnDestroy() {
		const { model } = this;
		if (model && model.source === 'template') {
			this.columnList.delete(model.key);
		}
	}
}
