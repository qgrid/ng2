import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent } from 'ng2-qgrid';

@Component({
	selector: 'example-grid-size',
	templateUrl: 'example-grid-size.component.html',
	styleUrls: ['example-grid-size.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`.plain{width:100%; height:100%;}
		.medium{width:60%; height:60%  !important;}
		.small{width:500px; height:500px  !important;}`
	]
})
export class ExampleGridSizeComponent {
	static id = 'grid-size';

	rows: Observable<Human[]>;
	@ViewChild(GridComponent, { static: true }) grid: GridComponent;

	gridClass = {
		plain: true,
		medium: false,
		small: false
	}

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}

	fillPlain() {
		this.gridClass.plain = true;
		this.gridClass.medium = false;
		this.gridClass.small = false;
	}

	fillMedium() {
		this.gridClass.plain = false;
		this.gridClass.medium = true;
		this.gridClass.small = false;
	}

	fillSmall() {
		this.gridClass.plain = false;
		this.gridClass.medium = false;
		this.gridClass.small = true;
	}
}
