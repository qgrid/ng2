import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridModel, Action, GridService, GridComponent } from 'ng2-qgrid';
import { forEach } from 'lodash-es';

@Component({
	selector: 'example-grid-size',
	templateUrl: 'example-grid-size.component.html',
	styleUrls: ['example-grid-size.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleGridSizeComponent {
	static id = 'grid-size';

	rows: Observable<Human[]>;
	@ViewChild(GridComponent, { static: true }) grid: GridComponent;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}

	fillLarge() {
		this.setWidthAndHeight('100%');
	}

	fillMedium() {
		this.setWidthAndHeight('60%');
	}

	fillExact() {
		this.setWidthAndHeight('500px');
	}

	setWidthAndHeight(size) {
		var nativeElement = this.grid["elementRef"].nativeElement;
		if (nativeElement != null) {
			var style = nativeElement.style;
			style.height = size;
			style.width = size;
		}
	}
}
