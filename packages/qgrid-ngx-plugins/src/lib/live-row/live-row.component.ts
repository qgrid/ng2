import {
	ChangeDetectionStrategy,
	Component,
	Input,
	NgZone,
	OnInit
} from '@angular/core';
import { Fastdom, GRID_PREFIX } from '@qgrid/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-live-rows',
	template: '',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveRowComponent implements OnInit {
	@Input('duration') duration = 400;

	constructor(private plugin: GridPlugin, private zone: NgZone) { }

	ngOnInit() {
		const { model } = this.plugin;
		let currentRows: any[];

		model.animation({
			apply: model.animation().apply.concat((memo, context, complete) => {
				const previousRows = currentRows;
				currentRows = memo.rows ? memo.rows : currentRows;

				if (!previousRows || !currentRows) {
					complete(0);
					return;
				}

				const { rowId } = model.data();
				const animations = [];

				for (let rowIndex = 0, length = previousRows.length; rowIndex < length; rowIndex++) {
					const newRowIndex = currentRows.findIndex((row, i) => rowId(i, row) === rowId(rowIndex, previousRows[rowIndex]));
					if (newRowIndex < 0) {
						animations.push(this.fadeOutRow(rowIndex));
					} else if (newRowIndex !== rowIndex) {
						animations.push(this.moveRow(rowIndex, newRowIndex));
					}
				}

				this.zone.runOutsideAngular(() => {
					Promise.all(animations)
						.then(complete);
				});
			})
		});
	}

	private fadeOutRow(index: number) {
		return new Promise((resolve, reject) => {
			const tr = this.plugin.table.body.row(index);
			if (!tr.model()) {
				reject(`Can't find model for row ${index}`);
				return;
			}

			Fastdom.mutate(() => {
				const animation = tr.model().tr.element.animate([ { opacity: '1' }, { opacity: '0' } ],
					{ duration: this.duration }
				);

				animation.onfinish = () => resolve(null);
			});
		});
	}

	private moveRow(from: number, to: number) {
		const { table } = this.plugin;

		return new Promise((animationEnd, animationError) => {
			const oldTr = table.body.row(from);
			const newTr = table.body.row(to);

			if (!oldTr.model() || !newTr.model()) {
				const errorIndex = oldTr.model() ? to : from;
				animationError(`Can't find model for row ${errorIndex}`);
				return;
			}

			Fastdom.measure(() => {
				const offset = newTr.rect().top - oldTr.rect().top;

				Fastdom.mutate(() => {
					const animatedRows = [];
					oldTr.addClass(`${GRID_PREFIX}-live-row`);
					(oldTr.getElement() as any)
						.elements
						.forEach(rowElement =>
							animatedRows.push(
								new Promise(animationRowEnd => {
									const animation = rowElement.animate(
										[ { transform: 'translateY(0px)' }, { transform: `translateY(${offset}px)` } ],
										{ duration: this.duration }
									);

									animation.onfinish = () => Fastdom.mutate(() => {
										oldTr.removeClass(`${GRID_PREFIX}-live-row`);
										oldTr.removeClass(`${GRID_PREFIX}-drag`);
										animationRowEnd(null);
									});
								}))
						);

					Promise.all(animatedRows).finally(() => animationEnd(null));
				});
			});
		});
	}
}
