import {Directive, Input, OnInit, TemplateRef} from '@angular/core';
import {TemplateLinkService} from "./template-link.service";

@Directive({
  selector: 'ng-template[key]'
})
export class TemplateLinkDirective implements OnInit {
  @Input() key = '';

  constructor(private templateLink: TemplateLinkService,
              private templateRef: TemplateRef<any>) {
  }

  ngOnInit() {
    this.templateLink.put(this.key, this.templateRef);
  }
}
