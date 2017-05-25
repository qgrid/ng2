import {Injectable, ViewContainerRef} from "@angular/core";
import {TemplateCacheService, TemplateLinkService} from "@grid/template";
import {AppError} from '@grid/core/infrastructure';
import {noop} from '@grid/core/services/utility';
import {templateJitUrl} from "@angular/compiler";

function canBuild(column) {
  return column.type !== 'pad';
}

function buildKeys(source: string, column: any, mode = 'view') {
  const key = column.key;
  switch (mode) {
    case 'view': {
      const type = column.type;
      return [
        `${source}-cell-${type}-${key}.tpl.html`,
        `${source}-cell-${type}.tpl.html`,
        `${source}-cell-text.tpl.html`
      ];
    }
    case 'edit': {
      const type = column.editor || column.type;
      return [
        `${source}-cell-${type}-${mode}-${key}.tpl.html`,
        `${source}-cell-${type}-${mode}.tpl.html`,
        `${source}-cell-text-${mode}.tpl.html`
      ];
    }
    default:
      throw new AppError('cell.service', `Invalid mode "${mode}"`);
  }
}


@Injectable()
export class CellService {
  constructor(private templateCache: TemplateCacheService,
              private templateLink: TemplateLinkService) {
  }

  build(source: string, column: any, mode = 'view') {
    if (!canBuild(column)) {
      return noop;
    }

    const keys = buildKeys(source, column, mode);
    const template = this.findTemplate(keys);
    if (!template) {
      throw new AppError('cell.service', `Can't find template for ${keys[0]}`);
    }

    return (viewContainerRef: ViewContainerRef, context: any) => {
      viewContainerRef.clear();
      viewContainerRef.createEmbeddedView(template, context);
    };
  }


  findTemplate(keys: Array<string>) {
    const templateCache = this.templateCache;
    const templateLink = this.templateLink;
    for (let key of keys) {
      const template = templateCache.get(key) || templateLink.get(key);
      if (template) {
        return template;
      }
    }

    return null;
  }
}
