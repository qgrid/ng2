import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { EventListener, EventManager, yes } from '@qgrid/core';
import { Disposable } from '@qgrid/ngx';
import { BackdropService } from '../backdrop/backdrop.service';

@Directive({
  selector: '[q-grid-file]',
  providers: [Disposable],
})
export class FileDirective {
  private reader = new FileReader();
  private _value: ArrayBuffer | string;
  private _label: string;

  @Output('q-grid-fileChange') valueChange = new EventEmitter<ArrayBuffer | string>();
  @Output('q-grid-file-labelChange') labelChange = new EventEmitter<string>();

  @Input('q-grid-file-is-valid') isValid: (name: string) => boolean = yes;

  @Input('q-grid-file') get value() {
    return this._value;
  }

  set value(value: ArrayBuffer | string) {
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

  constructor(
    @Optional() private backdropService: BackdropService,
    disposable: Disposable,
    elementRef: ElementRef,
  ) {
    const listener = new EventListener(elementRef.nativeElement, new EventManager(this));

    disposable.add(listener.on('change', this.onUpload));
    disposable.add(listener.on('drop', this.onUpload));
    disposable.add(listener.on('click', this.hideBackdrop));
    disposable.add(listener.on('focus', this.revealBackdrop));

    this.reader.onloadend = e => this.onLoadEnd(e);
  }

  onUpload(e: Event) {
    const { files } = <HTMLInputElement>e.target;
    const file = files[0];
    if (file && this.isValid(file.name)) {
      this.reader.readAsDataURL(file);
      this.label = file.name;
    }
  }

  onLoadEnd(e: ProgressEvent<FileReader>) {
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
