import { NgModule } from '@angular/core';
import { DndModule } from './dnd';
import { FocusModule } from './focus';
import { ResizeModule } from './resize';

@NgModule({
	declarations: [],
	exports: [
		DndModule,
		FocusModule,
		ResizeModule,
	],
	imports: [],
	providers: []
})
export class CommonModule {
}
