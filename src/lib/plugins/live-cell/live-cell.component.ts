import { Component, Input, OnInit, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import { TemplateHostService } from '../../template/template-host.service';

@Component({
	selector: 'q-grid-live-cell',
	templateUrl: './live-cell.tpl.html',
	providers: [TemplateHostService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveCellComponent implements OnInit {

	@Input() cell: any;
	@Input() duration = 500;
	@Input() upClass = 'positive-change';
	@Input() downClass = 'negative-change';
	@Input() showArrow = true;
	@Input() showDifference = true;
	@Input() showPrev = false;

	difference = 0;
	resultClass = '';
	type = '';

	constructor() {
	}

	ngOnInit() {
		if (!this.cell.changes) {
			this.cell.mode('view');
			return;
		}
		this.type = this.cell.column.type;
		this.difference = this.diff(this.cell.changes.liveValue);
		this.resultClass = this.difference > 0 ? this.upClass : this.downClass;

		setTimeout(() => {
			this.cell.mode('view');
		}, this.duration);
	}

	diff(value: SimpleChange) {
		if (value.currentValue && value.previousValue) {
			return +value.currentValue - +value.previousValue;
		}
		return 0;
	}
}
