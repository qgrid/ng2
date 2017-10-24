import {
	Directive,
	Renderer2,
	ElementRef,
	Input,
	Output,
	EventEmitter,
	AfterViewInit,
	Optional
} from '@angular/core';

import { AppError } from 'ng2-qgrid/core/infrastructure';
import { NgComponent, RootService } from 'ng2-qgrid/infrastructure/component';
import { noop } from 'ng2-qgrid/core/utility';


@Directive({
	selector: '[q-grid-file-upload]'
})
export class FileUpload implements AfterViewInit {
	@Input('q-grid-can-upload') canUpload: Function = noop;
	@Input('q-grid-file-upload') selector;
	@Input('q-grid-file-upload-label') label: string;

	private file: File;

	private reader: FileReader;

	constructor(@Optional()
		private root: RootService,
		private renderer: Renderer2,
		private elementRef: ElementRef) {
		this.reader = new FileReader();
	}

	ngAfterViewInit(): void {
		const element = this.selector
			? this.elementRef.nativeElement.querySelector(this.selector)
			: this.elementRef.nativeElement;

		if (!element) {
			throw new AppError(
				'file-upload.directive',
				`Element ${this.selector} is not found`
			);
		}

		this.reader.onloadend = e => this.setDataUrl(e);

		this.renderer.listen(element, 'change', this.upload);
		this.renderer.listen(element, 'click', this.onClick);
		this.renderer.listen(element, 'drop', this.upload);
	}

	onClick() {
		this.file = null;
		this.label = null;
	}

	upload(e) {
		if (!this.canUpload()) {
			return;
		}
		const files = e.target.files;
		if (files.length > 1) {
			throw new AppError('file.upload', `Multiple upload isn't able`);
		}

		const file = files[0] || null;
		if (file) {
			this.reader.readAsDataURL(file);
			this.label = file.name;
		}
	}

	setDataUrl(e) {
		if (e.target.readyState == this.reader.DONE) {
			this.root.applyFactory(() => this.file = e.target.result);
		}
	}
}
