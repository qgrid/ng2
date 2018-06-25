import {
	Component,
	Input,
	Optional,
	ElementRef,
	OnDestroy,
	AfterViewInit,
	NgZone,
	TemplateRef,
	ContentChild
} from '@angular/core';
import { ColumnSortView } from 'ng2-qgrid/plugin/column-sort/column.sort.view';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { noop, no } from 'ng2-qgrid/core/utility/kit';
import { FocusAfterRender } from '../../common/focus/focus.service';
import { ViewCoreService } from '../../main/core/view/view-core.service';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-column-sort',
	templateUrl: './column-sort.component.html',
	providers: [PluginService]
})
export class ColumnSortComponent implements AfterViewInit {
	@Input() column: ColumnModel;
	@ContentChild(TemplateRef) template: TemplateRef<any>;

	context: { $implicit: ColumnSortComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: PluginService,
		private view: ViewCoreService,
		private element: ElementRef,
		private zone: NgZone
	) {
	}

	ngAfterViewInit() {
		const { nativeElement } = this.element;
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
