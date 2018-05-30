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
import { RootService } from '../../infrastructure/component/root.service';
import { FocusAfterRender } from '../../common/focus/focus.service';
import { PluginComponent } from '../plugin.component';
import { ViewCoreService } from '../../main/core/view/view-core.service';

@Component({
	selector: 'q-grid-column-sort',
	templateUrl: './column-sort.component.html'
})
export class ColumnSortComponent extends PluginComponent implements AfterViewInit, OnDestroy {
	@Input() public column: ColumnModel;
	@ContentChild(TemplateRef) public template: TemplateRef<any>;

	constructor(root: RootService,
		private view: ViewCoreService,
		private element: ElementRef,
		private zone: NgZone) {
		super(root);
	}

	ngAfterViewInit() {
		const { nativeElement } = this.element;
		const iconAsc = nativeElement.querySelector('.q-grid-asc');
		const iconDesc = nativeElement.querySelector('.q-grid-desc');

		const ctrl = new ColumnSortView(this.model, {
			element: nativeElement,
			view: this.view,
			column: this.column,
			iconAsc,
			iconDesc
		});

		const listener = new EventListener(nativeElement, new EventManager(this));
		listener.on('click', () => {
			if (ctrl.onClick()) {
				const focus = new FocusAfterRender(this.root);
			}
		});

		this.zone.runOutsideAngular(() =>
			listener.on('mouseleave', () => ctrl.onMouseLeave())
		);

		this.context = {
			$implicit: ctrl
		};
	}
}
