import {NgModule} from '@angular/core';
import {DndModule} from './dnd';
import {FocusModule} from './focus';
import {ResizeModule} from './resize';
import {DomEventsModule} from './dom/dom.module';

@NgModule({
	declarations: [],
	exports: [
		DndModule,
		FocusModule,
		ResizeModule,
		DomEventsModule
	],
	imports: [],
	providers: []
})
export class CommonModule {
}
