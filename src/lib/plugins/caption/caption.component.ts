import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-caption',
	templateUrl: './caption.component.html',
	providers: [PluginService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaptionComponent {
	context: { $implicit: CaptionComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService) {
	}

	public get value() {
		const { caption, title } = this.plugin.model.grid();
		return caption || title;
	}
}
