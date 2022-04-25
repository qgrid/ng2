import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { BoxHost, GRID_PREFIX } from '@qgrid/core';
import { GridPlugin } from '../plugin/grid-plugin';
import { ThemeService } from '../theme/theme.service';

@Component({
	selector: 'q-grid-box',
	templateUrl: './box.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComponent implements OnInit {
	constructor(
		private elementRef: ElementRef,
		private theme: ThemeService,
		private plugin: GridPlugin,
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
