import { Directive, Input, TemplateRef, OnInit } from '@angular/core';
import { TemplateCacheService } from '../template/template-cache.service';
import { TemplateLink } from '../template/template-link';

@Directive({
  selector: 'ng-template[qGridColumnHead]', // eslint-disable-line @angular-eslint/directive-selector
})

export class ColumnHeadTemplateDirective implements OnInit {
  @Input('qGridColumnHead') key = '';

  constructor(
    private templateCache: TemplateCacheService,
    private templateRef: TemplateRef<unknown>,
  ) {
  }

  ngOnInit() {
    const link = new TemplateLink(this.templateRef, null);
    this.templateCache.put(`head-cell-the-${this.key}.tpl.html`, link);
  }
}
