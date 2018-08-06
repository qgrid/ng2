import { Component, Input } from '@angular/core';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-validation',
	template: '',
	providers: [PluginService]
})
export class ValidationComponent {
	@Input() type: string;

	constructor(private plugin: PluginService) {
	}
}
