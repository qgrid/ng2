import { Component, Input } from '@angular/core';
import { NgComponent } from 'ng2-qgrid/infrastructure/component';
import { Popup } from './popup';

@Component({
	selector: 'q-grid-popup-body',
	template: '<ng-container key="body-popup-{{$popup.settings.id}}.tpl.html"></ng-container>'
})
export class PopupBodyComponent extends NgComponent {
	constructor(public $popup: Popup) {
		super();
	}

	ngOnInit(): void {
	}
}
