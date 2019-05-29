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
import {
	Router,
	Routes,
	RouterLinkActive,
} from '@angular/router';
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

	private mobileQueryListener: () => void;

	constructor(
		private zone: NgZone,
		private router: Router,
		cd: ChangeDetectorRef,
		media: MediaMatcher,
	) {
		this.mobileQueryListener = () => cd.detectChanges();
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this.mobileQuery.addListener(this.mobileQueryListener);
	}

	getGithubUrl(): string {
		return `https://github.com/qgrid/ng2-example/tree${this.router.url}/latest/src/app`;
	}

	getStackblitzUrl(): string {
		return `https://stackblitz.com/github/qgrid/ng2-example/tree${this.router.url}/latest`;
	}

	ngAfterViewInit(): void {
		this.zone.runOutsideAngular(() => {
			setTimeout(() => {
				const activeItem = this.findActiveItem();
				if (activeItem) {
					activeItem.nativeElement.scrollIntoView({block: 'center'});
				}
			}, 0);
		});
	}

	private findActiveItem(): ElementRef<HTMLElement> {
		return this.menuItems.find(item => item.nativeElement.classList.contains('app-active'));
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this.mobileQueryListener);
	}

}
