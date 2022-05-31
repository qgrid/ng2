import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Fastdom } from '@qgrid/core';

@Directive({
  selector: '[q-grid-autosize]',
})
export class AutoSizeDirective implements OnInit {
  private actualText: string;
  private host: HTMLElement;
  private element: HTMLInputElement;

  @Input('q-grid-autosize') selector: string;
  @Input('q-grid-autosize-empty-width') emptyWidth = 75;

  @Input('q-grid-autosize-value') set value(value: string) {
    this.autoWidth(value);
  }

  constructor(element: ElementRef) {
    this.host = element.nativeElement as HTMLInputElement;
  }

  ngOnInit() {
    this.element = this.selector ? this.host.querySelector(this.selector) as HTMLInputElement : this.host as HTMLInputElement;
  }

  autoWidth(text: string) {
    if (!text) {
      this.actualText = text;
      Fastdom.measure(() => {
        Fastdom.mutate(() => {
          this.host.style.width = `${this.emptyWidth}px`;
        });
      });
      return;
    }

    if (!this.element) {
      return;
    }

    if (this.actualText === text) {
      return;
    }

    this.actualText = text;
    Fastdom.measure(() => {
      const width = `${this.calculateWidth(this.element, text)}px`;
      Fastdom.mutate(() => this.host.style.width = width);
    });
  }

  private calculateWidth(element: HTMLElement, text: string) {
    let width = 0;
    if (text) {
      const document = element.ownerDocument;
      const body = document.body;
      const test = document.createElement('span');

      test.innerText = text;
      test.style.whiteSpace = 'pre';
      test.style.visibility = 'hidden';
      test.style.font = element.style.font;
      test.style.fontFamily = element.style.fontFamily;
      test.style.lineHeight = element.style.lineHeight;
      test.style.border = element.style.border;
      // borderBox ?

      body.appendChild(test);
      width = test.offsetWidth;
      test.remove();
    }

    return width;
  }
}
