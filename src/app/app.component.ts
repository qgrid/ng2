import {
	ChangeDetectorRef,
	Component,
	OnDestroy,
	ChangeDetectionStrategy,
	ElementRef,
	ViewChildren,
	QueryList,
	AfterViewInit,
	NgZone,
} from '@angular/core';
import {Routes, RouterLinkActive} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {APP_ROUTES} from '../examples/example.module';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnDestroy {

	mobileQuery: MediaQueryList;
	examples: Routes = APP_ROUTES;

	@ViewChildren(RouterLinkActive, {read: ElementRef})
	menuItems: QueryList<ElementRef>;
	activeItemName: string = null;

	private mobileQueryListener: () => void;

	constructor(cd: ChangeDetectorRef, media: MediaMatcher, private zone: NgZone) {
		this.mobileQueryListener = () => cd.detectChanges();

		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this.mobileQuery.addListener(this.mobileQueryListener);
	}

	get githubLink(): string {
		return `https://github.com/qgrid/ng2-example/tree/${this.activeItemName}/latest/src/app`;
	}

	get stackblitzLink(): string {
		return `https://stackblitz.com/github/qgrid/ng2-example/tree/${this.activeItemName}/latest`;
	}

	ngAfterViewInit() {
		this.zone.runOutsideAngular(() => {
			setTimeout(() => {
				const activeItem = this.findActiveItem();
				if (activeItem) {
					this.activeItemName = activeItem.nativeElement.textContent;
					activeItem.nativeElement.scrollIntoView({block: 'center'});
				}
			}, 0);
		});
	}

	private findActiveItem(): ElementRef<HTMLElement> {
		return this.menuItems.find(item => item.nativeElement.classList.contains('app-active'));
	}

	onExampleClick(event: MouseEvent): void {
		const el = <HTMLElement>event.target;
		this.activeItemName = el.textContent;
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this.mobileQueryListener);
	}

}
