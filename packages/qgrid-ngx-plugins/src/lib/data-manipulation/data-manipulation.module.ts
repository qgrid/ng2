import { NgModule } from '@angular/core';
import { GridModelBuilder } from '@qgrid/ngx';
import { DataManipulationState } from '@qgrid/plugins';
import { DataManipulationComponent } from './data-manipulation.component';

@NgModule({
	declarations: [DataManipulationComponent],
	exports: [DataManipulationComponent]
})
export class DataManipulationModule {
	constructor(modelBuilder: GridModelBuilder) {
		modelBuilder
			.register('dataManipulation', DataManipulationState);
	}
}
