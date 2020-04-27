import { Component, Input, OnChanges } from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-visibility',
	template: '',
	providers: [GridPlugin]
})
export class VisibilityComponent implements OnChanges {
	@Input() head = true;
	@Input() foot = true;
	@Input() body = true;
	@Input() toolbarTop = true;
	@Input() toolbarBottom = true;
	@Input() toolbarRight = false;
	@Input() toolbarLeft = false;

	@Input() pinLeft = false;
	@Input() pinTop = false;
	@Input() pinRight = false;
	@Input() pinBottom = false;

	constructor(private plugin: GridPlugin) {
	}

	ngOnChanges() {
		const { model } = this.plugin;
		model.visibility({
			body: this.body,
			foot: this.foot,
			head: this.head,
			toolbar: {
				bottom: this.toolbarBottom,
				left: this.toolbarLeft,
				right: this.toolbarRight,
				top: this.toolbarTop,
			},
			pin: {
				bottom: this.pinBottom,
				left: this.pinLeft,
				right: this.pinRight,
				top: this.pinTop,
			},
		});
	}
}
