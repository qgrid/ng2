import { NgModule } from '@angular/core';
import { RaiseModule } from './raise';
import { DndModule } from './dnd';
import { FocusModule } from './focus';
import { ResizeModule } from './resize';

@NgModule({
	declarations: [],
	exports: [
		DndModule,
		FocusModule,
		ResizeModule,
		RaiseModule
	],
	imports: [],
	providers: []
})
export class CommonModule {
}
