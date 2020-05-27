import { Component, ElementRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GRID_PREFIX } from '@qgrid/core/definition';
import { BoxHost } from '@qgrid/core/box/box.host';
import { ThemeService } from '../theme/theme.service';
import { GridPlugin } from '../plugin/grid-plugin';

@Component({
	selector: 'q-grid-box',
	templateUrl: './box.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxComponent implements OnInit {
	constructor(
		private elementRef: ElementRef,
		private theme: ThemeService,
		private plugin: GridPlugin
	) {
	}

	ngOnInit() {
		// tslint:disable-next-line:no-unused-expression
		new BoxHost(this.elementRef.nativeElement, this.plugin);
		this.initTheme();
	}

	initTheme() {
		const { observeReply } = this.plugin;
		const { nativeElement } = this.elementRef;

		observeReply(this.theme.changed)
			.subscribe(e => {
				if (e) {
					nativeElement.classList.remove(`${GRID_PREFIX}-theme-${e.oldName}`);
				}

				nativeElement.classList.add(`${GRID_PREFIX}-theme-${e.newName}`);
			});
	}
}
