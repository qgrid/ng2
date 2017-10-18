import { NgModule } from '@angular/core';
import { TimePipe } from './time.pipe';

@NgModule({
	declarations: [
		TimePipe
	],
	exports: [
		TimePipe
	],
	imports: [],
	providers: []
})
export class PipesModule {
}
