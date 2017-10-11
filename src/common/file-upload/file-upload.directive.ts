import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output } from '@angular/core';

import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { DisposableView } from 'ng2-qgrid/core/view/disposable.view';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { RootService } from 'ng2-qgrid/infrastructure/component';

@Directive({
	selector: '[q-grid-file-upload]'
})
export class FileUploadDirective implements OnInit, OnDestroy {
	private disposableView: DisposableView;
	private element: HTMLElement;
	private listener: EventListener;
	private reader: FileReader;

	@Input('q-grid-file-upload') file;
	@Input('q-grid-file-upload-label') label;
	@Output('q-grid-can-upload') canUpload: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor( @Optional() private root: RootService, private elementRef: ElementRef ) {
		this.disposableView = new DisposableView();
		this.element = elementRef.nativeElement;
		this.listener = new EventListener(this.element, new EventManager(this));
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
		if (e.target.readyState === 2) {
			this.root.applyFactory(() => this.file = e.target.result);
		}
	}
}
