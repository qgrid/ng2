import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, SimpleChange, ChangeDetectorRef } from '@angular/core';
import { Td } from 'ng2-qgrid/core/dom/td';
import { state, style, trigger, animate, transition } from '@angular/animations';

@Component({
	selector: 'q-grid-live-cell-update',
	templateUrl: './live-cell-update.tpl.html',
	providers: [],
	animations: [
		trigger('changeValue', [
			state('normal', style({})),

			state('positive', style({
				color: 'green'
			})),

			state('negative', style({
				color: 'red'
			})),

			transition('normal => positive', [
				animate('1s')
			]),
			transition('normal => negative', [
				animate('1s')
			])
		])
	]
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveCellUpdateComponent implements OnChanges {

	@Input() cellValue: Td;
	@Input() cell: Td;

	result: any = null;

	constructor(private cd: ChangeDetectorRef) {
	}

	ngOnChanges(changes: SimpleChanges) {
		for ( const propName of Object.keys(changes)) {
			if (changes[propName].firstChange || propName !== 'cellValue') {
				continue;
			}
			this.result = this.diff(changes[propName]);
			this.cell.mode('change');
			if (this.result > 0) {

			}
			// this.cd.detectChanges();
		}
	}

	diff(value: SimpleChange) {
		if (value.currentValue && value.previousValue) {
			return +value.currentValue - +value.previousValue;
		}
		return null;
	}
}
