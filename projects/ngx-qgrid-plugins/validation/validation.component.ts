import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-validation',
	template: '',
	providers: [PluginService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationComponent {
	@Input() type: string;
}
