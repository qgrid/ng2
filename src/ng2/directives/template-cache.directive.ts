import {Directive, Input, OnInit, TemplateRef} from '@angular/core';
import {TemplateCacheService} from "../services/template-cache.service";

@Directive({
  selector: 'ng-template[name]'
})
export class TemplateCacheDirective implements OnInit {
  @Input() name = '';

  constructor(private templateCache: TemplateCacheService, private templateRef: TemplateRef<any>) {
  }

  ngOnInit() {
    this.templateCache.put(this.name, this.templateRef);
  }
}
