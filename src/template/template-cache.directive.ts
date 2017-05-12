import {Directive, Input, OnInit, TemplateRef} from '@angular/core';
import {TemplateCacheService} from './template-cache.service';

@Directive({
  selector: 'ng-template[for]'
})
export class TemplateCacheDirective implements OnInit {
  @Input() key = '';

  constructor(private templateCache: TemplateCacheService, private templateRef: TemplateRef<any>) {
  }

  ngOnInit() {
    this.templateCache.put(this.key, this.templateRef);
  }
}
