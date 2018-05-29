import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { isUndefined, clone } from 'ng2-qgrid/core/utility/kit';
import { RootService } from '../../infrastructure/component/root.service';
import { TemplateHostService } from '../../template/template-host.service';
import { ColumnListService } from '../../main/column/column-list.service';

@Component({
	selector: 'q-grid-column',
	template: '<ng-content></ng-content>',
	providers: [TemplateHostService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnComponent implements OnInit {
	@Input() public type: string;
	@Input() public key: string;
	@Input() public class: string;
	@Input() public title: string;
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
	@Input() public viewWidth: number;

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
	@Input() public labelPath: string;
	@Input() public value: any;
	@Input() public path: string;
	@Input() public compare: any;

	constructor(
		private root: RootService,
		private columnList: ColumnListService,
		private templateHost: TemplateHostService
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
				parts.push(column.key);
			}

			return parts.join('-') + '.tpl.html';
		};

		this.columnList.copy(column, this);

		if (withKey) {
			this.columnList.add(column);
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
	}
}
