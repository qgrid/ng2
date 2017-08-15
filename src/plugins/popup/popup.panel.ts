import TemplateLink from '@grid/view/components/template/template.link';
import PopupService from '@grid/plugins/popup/popup.service';
import {Component, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {TemplateCacheService, TemplateLinkService} from '@grid/template';

@Component({
  selector: 'q-grid-popup-panel',
  template: require('qgrid.plugin.popup-panel.tpl.html')
})

export class PopupPanelComponent implements OnInit, OnDestroy {
  @Input() model;
  @Input() id;

  private template;

  constructor(private qGridPopupService: PopupService,
              private element: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private templateLink: TemplateLinkService,
              private templateCache: TemplateCacheService) {
    this.template = new TemplateLink();
  }

  ngOnInit(): void {
    const model = this.model;
    const templateUrl = 'qgrid.plugin.popup-panel.tpl.html';
    const template =
      this.templateCache.get(templateUrl) ||
      this.templateLink.get(templateUrl);

    this.viewContainerRef.createEmbeddedView(template, this);
    // const templateScope = this.$scope.$new();
    // const link = this.template.link(
    //   templateUrl,
    //   model.popup().resource
    // );

    this.element.nativeElement.classList.add('q-grid-popup');
  }

  close(): void {
    this.qGridPopupService.close(this.id);
  }
}
