import { NgModule } from '@angular/core';
import { DndModule } from './dnd';
import { FocusModule } from './focus';
import { ResizeModule } from './resize';
import { LayoutModule } from './layout';

@NgModule({
	declarations: [],
	exports: [
		DndModule,
		FocusModule,
		ResizeModule,
		LayoutModule
	],
	imports: [],
	providers: []
})
export class CommonModule {
}
