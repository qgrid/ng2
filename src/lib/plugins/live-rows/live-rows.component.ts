import { ChangeDetectionStrategy, Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { GridModel } from '../../plugins/plugin.service';
import { TemplateHostService } from '../../template/template-host.service';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-live-rows',
	template: '<ng-content></ng-content>',
	providers: [
		TemplateHostService,
		PluginService
	],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveRowsComponent implements OnInit, OnChanges {

	@Input('trackBy') trackBy = 'id';

	model: GridModel;

	constructor(private root: RootService, private plugin: PluginService) {
	}

	ngOnInit() {

		const { model } = this.root;
		console.log(this.root);
		model.viewChanged.watch(e => {

		});

		model.sceneChanged.watch( e => {
			if (e.hasChanges('rows')) {
				console.log('rows changed');
				const oldRows = e.changes.rows.oldValue.slice();
				const newRows = e.changes.rows.newValue.slice();

				console.log(oldRows);

				for (const i in oldRows) {
					if (!oldRows[i]) {
						continue;
					}

					// tslint:disable-next-line: radix
					const tr = this.plugin.table.body.row(parseInt(i));
					// tslint:disable-next-line: radix
					const rowId1 = model.data().id.row(parseInt(i), oldRows[i]);
					// console.log(rowId1);
					const rowId = oldRows[i][this.trackBy];
					for (const j in newRows) {
						if (!newRows[j]) {
							continue;
						}

						if (newRows[j][this.trackBy] === oldRows[i][this.trackBy]) {
							// console.log(`Строка ${i} стала строкой ${j}`);
							// console.log(Set.prototype.entries(this.root.bag.body.rows));
							newRows.splice(j, 1);
						}

					}

				}
			}
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
	}

}
