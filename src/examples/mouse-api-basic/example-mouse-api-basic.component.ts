import {
	ElementRef,
	ViewChild,
	Component,
	ChangeDetectionStrategy,
	AfterViewInit,
	ChangeDetectorRef
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

	static id = EXAMPLE_TAGS[0];

	@ViewChild(GridComponent) grid: GridComponent;

	logEntries: Array<LogEntry> = [];
	title = EXAMPLE_TAGS[1];
	rows: Observable<Human[]>;

	constructor(
		dataService: DataService,
		private cdr: ChangeDetectorRef
	) {
		this.rows = dataService.getPeople();
	}

	ngAfterViewInit(): void {
		const { model } = this.grid;
		model.mouseChanged.on(({ state }) => {
			const { status, target, code } = state;
			let targetString = 'null';
			if (target) {
				const { columnIndex, rowIndex } = target;
				targetString = `{ column: ${columnIndex}, row: ${rowIndex} }`;
			}

			this.logEntries.unshift({
				status: status ?? 'null',
				code: code ?? 'null',
				target: targetString
			});

			this.cdr.detectChanges();
		});
	}
}

export declare class LogEntry {
	status: string;
	code: string;
	target: string;
}
