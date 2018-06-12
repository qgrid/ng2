import { Component, Optional, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-actions',
	template: '',
	providers: [PluginService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionListComponent {
	constructor(private plugin: PluginService) { }
}
