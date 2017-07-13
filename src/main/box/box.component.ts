import {Component, ElementRef, Optional, Input, OnInit} from '@angular/core';
import {NgComponent} from '@grid/infrastructure/component/ng.component';
import {ThemeService} from '@grid/template/theme.service';
import {GRID_PREFIX} from '@grid/core/definition';
import {Guard} from '@grid/core/infrastructure';
import {RootService} from '@grid/infrastructure/component/root.service';

@Component({
    selector: 'q-grid-box',
    template: '<ng-content></ng-content>'
})
export class BoxComponent extends NgComponent implements OnInit {
    @Input('model') private boxModel: any = null;
    private element: HTMLElement = null;

    constructor(@Optional() private root: RootService, element: ElementRef, private theme: ThemeService) {
        super();

        this.element = element.nativeElement;
    }

    ngOnInit() {
        this.initTheme();

        const model = this.model;
        model.dragChanged.watch(e => {
            if (e.hasChanges('isActive')) {
                if (model.drag().isActive) {
                    this.element.classList.add(`${GRID_PREFIX}-drag`);
                } else {
                    this.element.classList.remove(`${GRID_PREFIX}-drag`);
                }
            }
        });
    }

    initTheme() {
        const element = this.element;
        element.classList.add(GRID_PREFIX);
        this.theme.changed.watch(e => {
            if (e) {
                element.classList.remove(`${GRID_PREFIX}-theme-${e.oldValue}`);
            }

            element.classList.add(`${GRID_PREFIX}-theme-${this.theme.name}`);
        });
    }

    get model() {
        const model = this.boxModel || (this.root && this.root.model);
        Guard.notNull('model', model);
        return model;
    }
}
