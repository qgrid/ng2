import { Component, ChangeDetectionStrategy, Input, OnInit, SimpleChanges, OnChanges, SimpleChange, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LiveCellUpdateComponent } from './live-cell-update.component';
import { TemplateHostService } from '../../template/template-host.service';
import { Td } from 'ng2-qgrid/core/dom/td';

@Component({
	selector: 'q-grid-live-cell',
	template: '<ng-content></ng-content>',
	providers: [TemplateHostService],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveCellComponent implements OnInit, OnChanges, OnDestroy {

	@Input() cell: Td;
	@Input() cellValue: Td;
	@Input() upAnimation: Array<Object>;
	@Input() downAnimation: Array<Object>;
	@Input() animationEnable = true;
	@Input() upClass: string;
	@Input() downClass: string;
	@Input() showArrow = true;
	@Input() showPrev = false;

	result: any = null;

	constructor(templateHost: TemplateHostService, private cd: ChangeDetectorRef) {
		// templateHost.key = source => `body-cell-${source}.tpl.html`;
	}

	ngOnInit() {
		// console.log(this.cell);
	}

	ngOnChanges(changes: SimpleChanges) {
		// for ( const propName of Object.keys(changes)) {
		// 	if (changes[propName].firstChange || propName !== 'cellValue') {
		// 		continue;
		// 	}
		// 	this.result = this.diff(changes[propName]);
			
		// 	this.cell.mode('change');
		// 	if (this.result > 0) {

		// 	}
		// 	console.log(this.cell);

		// 	// // this.cell.mode('view');
		// 	// this.cd.markForCheck();
		// 	// this.cd.detectChanges();
		// 	// this.cell.mode();
		// }
		// // this.cell.mode('change');
		// // console.log(this.result);
	}

	diff(value: SimpleChange) {
		if (value.currentValue && value.previousValue) {
			return +value.currentValue - +value.previousValue;
		}
		return null;
	}

	ngOnDestroy() {
		// this.cd.detach(); // do this
	
		// for me I was detect changes inside "subscribe" so was enough for me to just unsubscribe;
		// this.authObserver.unsubscribe();
	  }

}
