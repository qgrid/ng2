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
import { AppError, EventManager } from 'ng2-qgrid/core/infrastructure';
import { EventListener as CoreListener } from 'ng2-qgrid/core/infrastructure';
import { NgComponent } from 'ng2-qgrid/infrastructure/component/ng.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@Directive({
	selector: '[q-grid-file-upload]'
})
export class FileUploadDirective extends NgComponent implements AfterViewInit {
	@Input('q-grid-file-upload') uploder: any;

	private reader: FileReader;
	private listener: any;

	private get file(): any {
		return this.uploder.cell.value;
	}
	private set file(value: any) {
		this.uploder.cell.value = value;
	}

	constructor(
		@Optional() private root: RootService,
		private renderer: Renderer2,
		private elementRef: ElementRef
	) {
		super();
		this.reader = new FileReader();
	}

	ngAfterViewInit(): void {
		const element = this.elementRef.nativeElement;

		if (!element) {
			throw new AppError(
				'file-upload.directive',
				`this.elementRef property does not contains a native element`
			);
		}

		this.listener = new CoreListener(element, new EventManager(this));

		this.using(this.listener.on('change', this.upload));
		this.using(this.listener.on('click', this.onClick));
		this.using(this.listener.on('drop', this.upload));

		this.reader.onloadend = e => this.setDataUrl(e);
	}

	onClick() {
		this.file = null;
		this.uploder.cell.label = null;
	}

	upload(e) {
		if (!this.uploder.canUpload()) {
			return;
		}
		const files = e.target.files;
		if (files.length > 1) {
			throw new AppError('file.upload', `Multiple upload isn't able`);
		}

		const file = files[0] || null;
		if (file) {
			this.reader.readAsDataURL(file);
			this.uploder.cell.label = file.name;
		}
	}

	setDataUrl(e) {
		if (e.target.readyState === this.reader.DONE) {
			this.file = e.target.result;
		}
	}
}
