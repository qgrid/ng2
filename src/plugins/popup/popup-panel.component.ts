import { Component, ElementRef, Input } from '@angular/core';
import { Popup } from './popup';
import { PopupService } from './popup.service';
import { PopupSettings } from './popup.settings';

@Component({
	selector: 'q-grid-popup-panel',
	templateUrl: './popup-panel.component.html',
	styleUrls: ['./popup-panel.component.scss']
})
export class PopupPanelComponent {
	@Input() public popup: Popup;
	public context: any = { $implicit: this };

	constructor(public element: ElementRef, public popupService: PopupService) {
		element.nativeElement.classList.add('q-grid-popup');
	}

	public get id() {
		return this.popup.id;
	}

	public close() {
		this.popupService.close(this.popup.id);
	}

	public expand() {
		this.popupService.expand(this.popup.id);
	}

	public collapse() {
		this.popupService.collapse(this.popup.id);
	}

	public get settings() {
		return this.popup.settings;
	}
}
