import { 
	Directive,
	Renderer2,
	ElementRef,
	Input,
	AfterViewInit
} from '@angular/core';

import {AppError, EventListener, EventManager} from 'ng2-qgrid/core/infrastructure';

// const FILE_UPLOAD_NAME = `qGridFileUpload`;
// const FILE_UPLOAD_LABEL_NAME = `qGridFileUploadLabel`;
// const CAN_UPLOAD_NAME = `qGridCanUpload`;

@Directive({
	selector: '[q-grid-file-upload]'
})
export class FileUpload implements AfterViewInit {
	@Input('q-grid-can-upload') canUpload: boolean;
	@Input('q-grid-file-upload') selector;
	@Input('q-grid-file-upload-label') label: string;
	
	private file: File;

	private reader: FileReader;

	constructor(private renderer: Renderer2, private elementRef: ElementRef) {
		this.reader = new FileReader();
	}

	ngAfterViewInit(): void {
		const element = this.selector
		? this.elementRef.nativeElement.querySelector(this.selector)
		: this.elementRef.nativeElement;

	if (!element) {
		throw new AppError(
			'focus.directive',
			`Element ${this.selector} is not found`
		);
	}
	
	const listener = new EventListener(element, new EventManager(this));
	
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
		if (!this.canUpload) {
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
			this.$scope.$applyAsync(() => this.file = e.target.result);
		}
	}
}
