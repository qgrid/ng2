import { Component, Input } from '@angular/core';
import { NgComponent } from 'ng2-qgrid/infrastructure/component';
import { Popup } from './popup';

@Component({
	selector: 'q-grid-popup-body',
	templateUrl: './popup-body.component.html'
})
export class PopupBodyComponent extends NgComponent {
	@Input() public popup: Popup;

	constructor() {
		super();
	}

	ngOnInit(): void {
	}
}
