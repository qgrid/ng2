import { Component, Input, OnInit, SimpleChange, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { TemplateHostService } from '../../template/template-host.service';
import { TdCoreDirective } from 'lib/main/core/body/td-core.directive';
import { AppError } from '../../../core/infrastructure/error';

@Component({
	selector: 'q-grid-live-cell',
	templateUrl: './live-cell.tpl.html',
	providers: [TemplateHostService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveCellComponent implements OnInit {
	@Input() cell: TdCoreDirective;
	@Input() duration = 500;

	changes: any;

	constructor(private zone: NgZone) {
	}

	ngOnInit() {
		if (!this.cell.changes) {
			throw new AppError('q-grid-live-cell', 'Changes is not defined in live-cell.component.ts');
		}

		this.changes = this.getDifference(this.cell.changes);
		this.zone.runOutsideAngular(() => {
			setTimeout(() => {
				this.cell.mode('view');
			}, this.duration);
		});
	}

	getDifference(value: SimpleChange) {
		switch (typeof(value.currentValue)) {
			case 'number':
				return +value.currentValue - +value.previousValue;
			case 'string':
				return value.previousValue;
			default:
				return null;
		}
	}
}
