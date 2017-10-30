import { NgModule } from '@angular/core';
import { RaiseModule } from './raise';
import { DndModule } from './dnd';
import { FocusModule } from './focus';
import { ResizeModule } from './resize';
import { LayoutModule } from './layout';
import { PipesModule } from './pipes';

@NgModule({
	declarations: [],
	exports: [
		DndModule,
		FocusModule,
		ResizeModule,
		LayoutModule,
		RaiseModule,
		PipesModule
	],
	imports: [],
	providers: []
})
export class CommonModule {
}
