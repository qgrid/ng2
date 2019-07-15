import { Component, Input, OnInit, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import { TemplateHostService } from '../../template/template-host.service';
import { TdCoreDirective } from 'lib/main/core/body/td-core.directive';

@Component({
	selector: 'q-grid-live-cell',
	templateUrl: './live-cell.tpl.html',
	providers: [TemplateHostService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveCellComponent implements OnInit {

	@Input() cell: TdCoreDirective;
	@Input() duration = 500;

	difference = 0;

	constructor() {
	}

	ngOnInit() {
		if (!this.cell.changes) {
			this.cell.mode('view');
			return;
		}
		this.difference = this.diff(this.cell.changes);

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
