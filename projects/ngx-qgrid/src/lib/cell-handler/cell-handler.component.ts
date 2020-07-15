import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { EditService } from '@qgrid/core/edit/edit.service';
import { GridPlugin } from '../plugin/grid-plugin';
import { CELL_HANDLER_ANIMATE_COMMAND_KEY } from '@qgrid/core/command-bag/command.bag';

@Component({
	selector: 'q-grid-cell-handler',
	templateUrl: './cell-handler.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [GridPlugin]
})
export class CellHandlerComponent implements OnInit, AfterViewInit {
	private endBatchEdit: () => void;

	canEditBatch = false;
	@ViewChild('marker', { static: true }) marker: ElementRef;

	constructor(
		private elementRef: ElementRef,
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef
	) {
		this.elementRef.nativeElement.style.display = 'none';
	}

	ngOnInit() {
		const { model, observeReply, commandPalette } = this.plugin;
		const animate = commandPalette.get(CELL_HANDLER_ANIMATE_COMMAND_KEY);

		observeReply(model.navigationChanged)
			.subscribe(e => {
				if (e.hasChanges('cell')) {
					animate.execute({
						handler: this.elementRef.nativeElement,
						oldCell: e.changes.cell.oldValue,
						newCell: e.changes.cell.newValue
					});
				}
			});

		observeReply(model.editChanged)
			.subscribe(e => {
				if (e.hasChanges('method')) {
					this.canEditBatch = e.state.method === 'batch';
					this.cd.markForCheck();
					this.cd.detectChanges();
				}

				if (e.hasChanges('status')) {
					if (e.state.status === 'endBatch' && this.endBatchEdit) {
						this.endBatchEdit();
						this.endBatchEdit = null;
					}
				}
			});
	}

	ngAfterViewInit() {
		this.elementRef.nativeElement.style.display = '';
	}

	startBatchEdit() {
		const { model } = this.plugin;

		const { cell: startCell } = model.navigation();
		if (startCell) {
			const editService = new EditService(this.plugin);
			this.endBatchEdit = editService.startBatch(startCell);
		}
	}
}
