import {
	ElementRef,
	ViewChild,
	Component,
	ChangeDetectionStrategy,
	AfterViewInit,
} from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent } from 'ng2-qgrid';

const EXAMPLE_TAGS = ['mouse-api-basic', 'Mouse api example'];

@Component({
	selector: 'example-mouse-api-basic',
	templateUrl: 'example-mouse-api-basic.component.html',
	styleUrls: ['example-mouse-api-basic.component.scss'],
	providers: [DataService, GridComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleMouseApiBasicComponent implements AfterViewInit {
	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}

	static id = EXAMPLE_TAGS[0];

	@ViewChild(GridComponent) grid: GridComponent;
	@ViewChild('mouseEventLog') mouseEventLog: ElementRef;

	title = EXAMPLE_TAGS[1];
	rows: Observable<Human[]>;

	ngAfterViewInit(): void {
		const { model } = this.grid;
		model.mouseChanged.on(({ state }) => {
			const { status, target, code } = state;

			this.mouseEventLog.nativeElement.prepend(document.createElement('hr'));

			const span = document.createElement('span');
			let targetString = 'null';
			if (target) {
				const { columnIndex, rowIndex } = target;
				targetString = `{ columnIndex: ${columnIndex}, rowIndex: ${rowIndex}}`;
			}
			span.innerHTML = `status: ${status},<br>
			code: ${code},<br>
			target: ${targetString},<br>`;
			this.mouseEventLog.nativeElement.prepend(span);
		});
	}
}
