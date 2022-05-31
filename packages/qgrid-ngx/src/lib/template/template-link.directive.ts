import { Directive, Input, OnInit, TemplateRef } from '@angular/core';
import { TemplateLinkService } from './template-link.service';
import { TemplateLink } from './template-link';

@Directive({
  selector: 'ng-template[key]', // eslint-disable-line @angular-eslint/directive-selector
})
export class TemplateLinkDirective implements OnInit {
  @Input() key = '';
  @Input() context = {};

  constructor(private templateLink: TemplateLinkService, private templateRef: TemplateRef<unknown>) {
  }

  ngOnInit() {
    const link = new TemplateLink(this.templateRef, this.context);
    this.templateLink.put(this.key, link);
  }
}
