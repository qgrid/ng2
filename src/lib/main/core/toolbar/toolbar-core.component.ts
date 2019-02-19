import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'q-grid-core-toolbar',
	templateUrl: './toolbar-core.component.html'
})
export class ToolbarCoreComponent {
	@Input() position;
}
