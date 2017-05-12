import {Directive, DoCheck, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {TemplateLinkService} from "./template-link.service";
import {TemplateCacheService} from "./template-cache.service";
import {Guard} from '@grid/core/infrastructure';

@Directive({
  selector: 'ng-container[key]'
})
export class TemplateDirective implements DoCheck {
  @Input() key = '';
  @Input() context = null;
  private template: TemplateRef<any>;
  private viewRef: EmbeddedViewRef<any>;

  constructor(private templateLink: TemplateLinkService,
              private templateCache: TemplateCacheService,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(){
    console.log(this.key);
  }

  ngDoCheck() {
    const template =
      this.templateCache.get(this.key) ||
      this.templateLink.get(this.key);

    if (template !== this.template) {
      this.template = template;
      if (this.viewRef) {
        this.viewRef.destroy();
      }

      this.viewRef = this.viewContainerRef.createEmbeddedView(template, this.context);
    }
  }
}
