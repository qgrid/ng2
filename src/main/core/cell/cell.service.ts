import {Injectable, ViewContainerRef} from '@angular/core';
import {TemplateCacheService, TemplateLinkService, TemplateHostService} from '@grid/template';
import {AppError} from '@grid/core/infrastructure';
import {noop} from '@grid/core/utility';
// import {templateJitUrl} from '@angular/compiler';

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
                `${mode}-cell-${type}-${key}.tpl.html`,
                `${mode}-cell-${type}.tpl.html`,
                `${mode}-cell-text.tpl.html`
            ];
        }
        default:
            throw new AppError('cell.service', `Invalid mode "${mode}"`);
    }
}

@Injectable()
export class CellService {
    constructor(private templateCache: TemplateCacheService,
                private templateLink: TemplateLinkService,
                private templateHostService: TemplateHostService) {
    }

    build(source: string, column: any, mode = 'view') {
        if (!canBuild(column)) {
            return noop;
        }

        const keys = buildKeys(source, column, mode);
        const template = this.templateHostService.find(keys);
        return (viewContainerRef: ViewContainerRef, context: any) => {
            viewContainerRef.clear();
            viewContainerRef.createEmbeddedView(template, context);
        };
    }
}
