import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';
import { ColumnModel } from '@qgrid/core/column-type/column.model';

@Component({
	selector: 'q-grid-alt',
	templateUrl: './alt.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AltComponent implements OnInit {
	constructor(
		private plugin: GridPlugin,
	) {
	}

	ngOnInit() {
		const { model, observe, service } = this.plugin;

		const altColumn: ColumnModel = {
			key: '$alt.number',
			type: 'row-number',
			title: 'Alt',
			canHighlight: false,
			canMove: false,
			canResize: false,
		};

		model
			.pagination({
				size: 10,
			}, {
				source: 'alt.component'
			})
			.data({
				columns:
					[altColumn]
						.concat(model.data().columns)
			}, {
				source: 'alt.component'
			});

		observe(model.keyboardChanged)
			.subscribe(e => {
				const { codes, status } = e.state;
				if (status === 'down') {
					switch (codes[0]) {
						case 'alt': {
							const rowNo = Number.parseInt(codes[1], 10);
							if (!Number.isNaN(rowNo)) {
								const { rows } = model.view();
								const { current, size } = model.pagination();

								const rowIndex = rowNo + current * size;
								const altRow = rows[rowIndex];
								if (altRow) {
									model.selection({
										items: [altRow]
									}, {
										source: 'alt.component'
									});

									service.focus(rowIndex);
								}
							}
							break;
						}
					}
				}
			});

	}
}
