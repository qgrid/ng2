import {
	Component,
	Input,
	OnInit,
	SimpleChange,
	ChangeDetectionStrategy,
	NgZone,
	HostBinding,
	TemplateRef,
	ViewChild,
	OnDestroy
} from '@angular/core';
import { TemplateHostService } from '../../template/template-host.service';
import { TdCoreDirective } from '../../../lib/main/core/body/td-core.directive';
import { AppError } from '../../../core/infrastructure/error';

@Component({
	selector: 'q-grid-live-cell',
	templateUrl: './live-cell.tpl.html',
	providers: [TemplateHostService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveCellComponent implements OnInit, OnDestroy {
	@Input() cell: TdCoreDirective;
	@Input() duration = 500;

	@HostBinding('class') class: string;

	@ViewChild('currency') currencyTemplate: TemplateRef<any>;
	@ViewChild('number') numberTemplate: TemplateRef<any>;
	@ViewChild('time') timeTemplate: TemplateRef<any>;
	@ViewChild('text') textTemplate: TemplateRef<any>;

	timerLink: any = null;

	constructor(private zone: NgZone) {
	}

	ngOnInit() {
		if (!this.cell.changes) {
			throw new AppError('live-cell.component', 'No changes found');
		}
		this.class = `q-grid-live-cell q-grid-live-cell-${this.cell.column.type} `;

		if (this.getDifference(this.cell.changes)) {
			this.class += this.getDifference(this.cell.changes) > 0 ? `q-grid-live-cell-up ` : `q-grid-live-cell-down `;
		}
		this.zone.runOutsideAngular(() => {
			this.timerLink = setTimeout(() => {
				this.cell.mode('view');
			}, this.duration);
		});
	}

	ngOnDestroy() {
		if (this.timerLink) {
			clearTimeout(this.timerLink);
		}
	}

	getDifference(value: SimpleChange) {
		switch (this.cell.column.type) {
			case 'number':
			case 'currency':
				return +value.currentValue - +value.previousValue;
			default:
				return null;
		}
	}

	getTemplate() {
		switch (this.cell.column.type) {
			case 'currency':
				return this.currencyTemplate;
			case 'time':
				return this.timeTemplate;
			case 'number':
				return this.numberTemplate;
			default:
				return this.textTemplate;
		}
	}
}
