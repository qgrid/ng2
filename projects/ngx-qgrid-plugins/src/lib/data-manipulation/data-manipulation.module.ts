import { NgModule } from '@angular/core';
import { DataManipulationComponent } from './data-manipulation.component';
import { GridModelBuilder } from '@qgrid/ngx';
import { DataManipulationModel } from '@qgrid/plugins/data-manipulation/data.manipulation.model';

@NgModule({
	declarations: [DataManipulationComponent],
	exports: [DataManipulationComponent]
})
export class DataManipulationModule {
	constructor(modelBuilder: GridModelBuilder) {
		modelBuilder
			.register('dataManipulation', DataManipulationModel);
	}
}
