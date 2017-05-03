import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {MARKUP_NAME, VIEW_CORE_NAME} from 'ng/definition';
import {ViewCoreComponent} from "../components/view/view-core.component";

@Directive({
  selector: '[q-grid-markup]'
})
export class MarkupDirective implements OnInit, OnDestroy {
  @Input('q-grid-markup') name = '';

  constructor(private view: ViewCoreComponent, private element: ElementRef) {
  }

  ngOnInit() {
    this.view.markup[this.name] = this.element.nativeElement;
  }

  ngOnDestroy() {
    delete this.view.markup[this.name];
  }
}
