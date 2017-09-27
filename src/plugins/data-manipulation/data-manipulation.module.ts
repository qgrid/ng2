import { NgModule } from '@angular/core';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { DataManipulationComponent } from './data-manipulation.component';
import { DataManipulationModel } from './data-manipulation.model';

Model.register('dataManipulation', DataManipulationModel);

@NgModule({
	declarations: [DataManipulationComponent],
	exports: [DataManipulationComponent],
	imports: [],
	providers: []
})
export class DataManipulationModule {}
