/* eslint-disable @angular-eslint/no-conflicting-lifecycle */

import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Input,
  ViewContainerRef,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Nullable } from '@qgrid/core';
import { TemplateService } from './template.service';

@Directive({
  selector: 'ng-container[key]', // eslint-disable-line @angular-eslint/directive-selector
})
export class TemplateDirective implements DoCheck, OnChanges {
  private viewRef: EmbeddedViewRef<unknown> | null;

  @Input() key = '';
  @Input() context: Nullable<{ $implicit: Object }> = null;
  @Input() check = false;

  constructor(
    private templateService: TemplateService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    const keyChange = changes['key'];
    if (keyChange) {
      if (this.viewRef) {
        this.viewRef.destroy();
        this.viewRef = null;
      }
    }
  }

  ngDoCheck() {
    if (!this.viewRef) {
      const link = this.templateService.find(this.key);
      if (link) {
        this.viewRef = this.viewContainerRef.createEmbeddedView(link.template, this.context);
      }
    }
  }
}
