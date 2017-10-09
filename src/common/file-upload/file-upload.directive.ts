import { Directive, ElementRef, Input, OnDestroy, OnInit, Optional } from '@angular/core';

import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { DisposableView } from 'ng2-qgrid/core/view/disposable.view';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';

@Directive({
	selector: '[q-grid-file-upload]'
})
export class FileUploadDirective implements OnInit, OnDestroy {
	private element: HTMLElement;
	private listener: EventListener;
	private reader: FileReader;
	private disposableView: DisposableView;

	@Input('q-grid-file-upload') file;
	@Input('q-grid-file-upload-label') label;
	@Input('q-grid-can-upload') canUpload;

	constructor( @Optional() private root: RootService, elementRef: ElementRef ) {
		this.listener = new EventListener(this.element, new EventManager(this));
		this.disposableView = new DisposableView();
		this.element = elementRef.nativeElement;
		this.reader = new FileReader();
		this.reader.onloadend = e => this.setDataUrl(e);
	}

	ngOnInit() {
		this.disposableView.using(this.listener.on('change', this.upload));
		this.disposableView.using(this.listener.on('click', this.onClick));
		this.disposableView.using(this.listener.on('drop', this.upload));
	}

	ngOnDestroy() {
		this.disposableView.dispose();
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
		if (e.target.readyState === FileReader.DONE) {
			this.root.applyFactory(() => this.file = e.target.result);
		}
	}
}
