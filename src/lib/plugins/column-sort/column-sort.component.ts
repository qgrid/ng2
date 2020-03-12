import {
	Component,
	Input,
	ElementRef,
	AfterViewInit,
	NgZone,
	TemplateRef,
	ChangeDetectionStrategy,
	ViewChild,
} from '@angular/core';
import { ColumnSortView } from 'ng2-qgrid/plugin/column-sort/column.sort.view';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { FocusAfterRender } from '../../common/focus/focus.service';
import { ViewCoreService } from '../../main/core/view/view-core.service';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-column-sort',
	templateUrl: './column-sort.component.html',
	providers: [PluginService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnSortComponent implements AfterViewInit {
	@ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;
	@Input() column: ColumnModel;

	context: { $implicit: ColumnSortComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: PluginService,
		private view: ViewCoreService,
		private elementRef: ElementRef,
		private zone: NgZone,
	) {
	}

	ngAfterViewInit() {
		const { nativeElement } = this.elementRef;
		const iconAsc = nativeElement.querySelector('.q-grid-asc');
		const iconDesc = nativeElement.querySelector('.q-grid-desc');

		const ctrl = new ColumnSortView(this.plugin.model, {
			element: nativeElement,
			view: this.view,
			column: this.column,
			iconAsc,
			iconDesc
		});

		const listener = new EventListener(nativeElement, new EventManager(this));
		listener.on('click', () => {
			if (ctrl.onClick()) {
				const focus = new FocusAfterRender(this.plugin, null);
			}
		});

		this.zone.runOutsideAngular(() =>
			listener.on('mouseleave', () => ctrl.onMouseLeave())
		);
	}
}
