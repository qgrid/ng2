import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { TemplateHostService } from '../../template/template-host.service';

@Component({
	selector: 'q-grid-live-cell',
	template: '<ng-content></ng-content>',
	providers: [TemplateHostService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveCellComponent implements OnInit {
	context: { $implicit: LiveCellComponent } = {
		$implicit: this
	};

	@Input() cell: any;
	@Input() upAnimation: Array<Object>;
	@Input() downAnimation: Array<Object>;
	@Input() animationEnable = true;
	@Input() upClass: string;
	@Input() downClass: string;
	@Input() showArrow = true;
	@Input() showPrev = false;

	constructor(templateHost: TemplateHostService) {
		templateHost.key = source => `change-cell-text.tpl.html`;
	}

	ngOnInit() {
		console.log('aaaaaaa');
		setTimeout(() => {
			this.cell.mode('view');
			console.log('bbbbbbbbb');
		}, 1000);

	}

}
