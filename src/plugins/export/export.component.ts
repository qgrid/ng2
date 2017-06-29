import {Component, Input} from '@angular/core';
import {PluginComponent} from '../plugin.component';
import {Command} from '@grid/core/infrastructure';

@Component({
    selector: 'q-grid-export',
    template: require('./export.component.html')
})

export class ExportComponent extends PluginComponent {
    @Input() exportType;
}
