import { Component, OnInit, Optional } from '@angular/core';
import PopupService from '@grid/plugins/popup/popup.service';
import {PluginComponent} from '@grid/plugins';
import {RootService} from '@grid/infrastructure/component';

@Component({
    selector: 'q-grid-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.scss']
})

export class PopupComponent extends PluginComponent implements OnInit {
    constructor(@Optional() root: RootService, private qGridPopupService: PopupService) {
      super(root);
    }

    ngOnInit() { }
}
