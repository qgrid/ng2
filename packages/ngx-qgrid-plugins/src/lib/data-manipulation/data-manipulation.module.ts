import { NgModule } from '@angular/core';
import { DataManipulationComponent } from './data-manipulation.component';
import { GridModelBuilder } from '@qgrid/ngx';
import { DataManipulationState } from '@qgrid/plugins/data-manipulation/data.manipulation.state';

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
