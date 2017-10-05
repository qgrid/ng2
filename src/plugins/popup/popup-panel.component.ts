import { Component, ElementRef, Input } from '@angular/core';
import { Popup } from './popup';

@Component({
	selector: 'q-grid-popup-panel',
	templateUrl: './popup-panel.component.html',
	styleUrls: ['./popup-panel.component.scss']
})
export class PopupPanelComponent {
	@Input() public popup: Popup;

	constructor(public element: ElementRef) {
		element.nativeElement.classList.add('q-grid-popup');
	}
}
