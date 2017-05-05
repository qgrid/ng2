import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {ViewCoreService} from "../view/view-core.service";

@Directive({
  selector: '[q-grid-core-tr]'
})
export class TrCoreDirective implements OnInit, OnDestroy {
  @Input('q-grid-core-tr') private view: ViewCoreService;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.view.style.monitor.row.add(this.element.nativeElement);
  }

  ngOnDestroy() {
    this.view.style.monitor.row.remove(this.element.nativeElement);
  }
}
