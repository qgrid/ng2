import { BackdropService } from './../../plugins/backdrop/backdrop.service';
import { Directive, ElementRef, Input, Output, EventEmitter, Optional } from '@angular/core';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { yes } from 'ng2-qgrid/core/utility/kit';
import { NgComponent } from '../../infrastructure/component/ng.component';

@Directive({
	selector: '[q-grid-file]'
})
export class FileDirective extends NgComponent {
	private reader = new FileReader();
	private _value: any;
	private _label: string;

	@Output('q-grid-fileChange') valueChange = new EventEmitter<any>();
	@Output('q-grid-file-labelChange') labelChange = new EventEmitter<string>();

	@Input('q-grid-file-is-valid') isValid: (name: string) => boolean = yes;

	@Input('q-grid-file') get value() {
		return this._value;
	}

	set value(value: any) {
		if (value !== this._value) {
			this._value = value;
			this.valueChange.emit(value);
		}
	}

	@Input('q-grid-file-label') get label() {
		return this._label;
	}

	set label(value: string) {
		if (value !== this._label) {
			this._label = value;
			this.labelChange.emit(value);
		}
	}

	constructor(@Optional() private backdropService: BackdropService, elementRef: ElementRef) {
		super();

		const listener = new EventListener(elementRef.nativeElement, new EventManager(this));

		this.using(listener.on('change', this.onUpload));
		this.using(listener.on('drop', this.onUpload));
		this.using(listener.on('click', this.hideBackdrop));
		this.using(listener.on('focus', this.revealBackdrop));

		this.reader.onloadend = e => this.onLoadEnd(e);
	}

	onUpload(e) {
		const { files } = e.target;
		const file = files[0];
		if (file && this.isValid(file.name)) {
			this.reader.readAsDataURL(file);
			this.label = file.name;
		}
	}

	onLoadEnd(e) {
		if (e.target.readyState === this.reader.DONE) {
			this.value = e.target.result;
		}
	}

	hideBackdrop() {
		if (this.backdropService) {
			this.backdropService.hide();
		}
	}

	revealBackdrop() {
		if (this.backdropService) {
			if (!this.backdropService.isActive) {
				setTimeout(() => this.backdropService.reveal(), 300);
			}
		}
	}
}
