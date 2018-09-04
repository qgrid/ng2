import { Component, Input, ChangeDetectionStrategy, OnDestroy, SkipSelf, Optional, OnInit, ElementRef } from '@angular/core';
import { isUndefined } from 'ng2-qgrid/core/utility/kit';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { TemplateHostService } from '../../template/template-host.service';
import { ColumnListService } from '../../main/column/column-list.service';
import { guid } from 'ng2-qgrid/core/services/guid';
import { ColumnService } from './column.service';

@Component({
	selector: 'q-grid-column',
	template: '<ng-content></ng-content>',
	providers: [TemplateHostService, ColumnService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent implements OnInit, OnDestroy {
	@Input() type: string;
	@Input() key: string;
	@Input() class: 'data' | 'control' | 'markup' | 'pivot' | 'cohort';
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
	@Input() widthMode: number | string;
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
		@SkipSelf() @Optional() private parent: ColumnService,
		private service: ColumnService,
		private element: ElementRef
	) { }

	ngOnInit() {
		let withKey = !isUndefined(this.key);
		let withType = !isUndefined(this.type);

		// We want to update model when ngOntInit is triggered and not in afterViewInit
		// so we apply dirty hack to understand if column is cohort or not.
		const element = this.element.nativeElement as HTMLElement;
		if (element.children.length && element.children.item(0).tagName === 'Q-GRID-COLUMN') {
			this.type = 'cohort';
			if (!withKey) {
				this.key = `$cohort-${this.title || guid()}`;
			}

			withKey = true;
			withType = true;
		}

		if (!withKey) {
			this.key = this.columnList.generateKey(this);
		}

		const column = this.columnList.extract(this.key, this.type);
		this.columnList.copy(column, this);

		this.templateHost.key = source => {
			const parts = [source, 'cell'];

			if (withType) {
				parts.push(this.type);
			}

			if (withKey) {
				parts.push(`the-${this.key}`);
			}

			return parts.join('-') + '.tpl.html';
		};

		if (withKey) {
			if (this.parent) {
				this.parent.column.children.push(column);
			} else {
				this.columnList.add(column);
			}
			this.service.column = column;
		} else {
			const settings =
				Object
					.keys(this)
					.filter(key => !isUndefined(this[key]) && column.hasOwnProperty(key))
					.reduce((memo, key) => {
						memo[key] = column[key];
						return memo;
					}, {});

			this.columnList.register(settings);
		}
	}

	ngOnDestroy() {
		const { column } = this.service;
		if (column && column.source === 'template') {
			this.columnList.delete(column.key);
		}
	}
}
