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
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { ColumnSortView } from 'ng2-qgrid/plugin/column-sort/column.sort.view';
import { EventListener, EventManager } from 'ng2-qgrid/core/infrastructure';
import { ViewCoreService } from 'ng2-qgrid/main/core/view/view-core.service';

@Component({
	selector: 'q-grid-column-sort',
	templateUrl: './column-sort.component.html'
})
export class ColumnSortComponent extends PluginComponent implements AfterViewInit, OnDestroy {
	@Input() public column;
	@ContentChild(TemplateRef) public template: TemplateRef<any>;

	constructor(root: RootService, private view: ViewCoreService, private element: ElementRef, private zone: NgZone) {
		super(root);

		this.using(this.model.sortChanged.on(() => {
			root.table.view.focus();
		}));
	}

	ngAfterViewInit() {
		const nativeElement = this.element.nativeElement;
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
		this.using(listener.on('click', () => ctrl.onClick()));

		this.zone.runOutsideAngular(() =>
			this.using(listener.on('mouseleave', () => ctrl.onMouseLeave()))
		);

		this.context = {
			$implicit: ctrl
		};
	}

	ngOnDestroy() {
		this.context.$implicit.dispose();
	}
}
