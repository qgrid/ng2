import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'q-grid-core-toolbar',
	templateUrl: './toolbar-core.component.html'
})
export class ToolbarCoreComponent implements OnInit {
	@Input() position;

	constructor() {
	}

	ngOnInit() {
	}
}
