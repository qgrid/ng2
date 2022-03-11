import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'q-grid-core-toolbar',
	templateUrl: './toolbar-core.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarCoreComponent {
	@Input() position: 'top' | 'right' | 'bottom' | 'left';
}
