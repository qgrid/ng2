import {NgModule} from '@angular/core';
import {DndModule} from './dnd';
import {FocusModule} from './focus';

@NgModule({
	declarations: [],
	exports: [
		DndModule,
		FocusModule
	],
	imports: [],
	providers: []
})
export class CommonModule {
}
