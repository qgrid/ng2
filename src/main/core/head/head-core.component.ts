import {Component} from '@angular/core';
import {ViewCoreService} from '../view/view-core.service';

@Component({
    selector: 'thead[q-grid-core-head]',
    templateUrl: './head-core.component.html'
})
export class HeadCoreComponent {
    constructor(public $view: ViewCoreService) {
    }
}
