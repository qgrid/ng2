import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'q-grid-core-toolbar',
	template: require('./toolbar-core.component.html')
})
export class ToolbarCoreComponent implements OnInit {
	@Input() position;

	constructor() {
	}

	ngOnInit() {
	}
}
