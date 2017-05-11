import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ViewCoreService} from "../components/view/view-core.service";

@Directive({
  selector: '[q-grid-markup]'
})
export class MarkupDirective implements OnInit, OnDestroy {
  @Input('q-grid-markup') name = '';

  constructor(private view: ViewCoreService, private element: ElementRef) {
  }

  ngOnInit() {
    this.view.markup[this.name] = this.element.nativeElement;
  }

  ngOnDestroy() {
    delete this.view.markup[this.name];
  }
}
