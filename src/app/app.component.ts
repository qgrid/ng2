import {
	ChangeDetectorRef,
	Component,
	OnDestroy,
	ChangeDetectionStrategy,
	HostBinding,
	NgZone,
	ElementRef,
	ViewChildren,
	QueryList,
	AfterViewInit
} from '@angular/core';
import {
	Router,
	Routes,
	RouterLinkActive
} from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { APP_ROUTES } from '../examples/example.module';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnDestroy {

	@HostBinding('class.app-is-mobile') isMobile: boolean;
	examples: Routes = APP_ROUTES;
	private mobileQueryListener: () => void;
	private mobileQuery: MediaQueryList;

	@ViewChildren(RouterLinkActive, { read: ElementRef })
	menuItems: QueryList<ElementRef>;

	constructor(
		private zone: NgZone,
		private router: Router,
		cd: ChangeDetectorRef,
		media: MediaMatcher,
	) {
		const setIsMobile = () => {
			this.isMobile = this.mobileQuery.matches;
		};
		this.mobileQueryListener = () => {
			setIsMobile();
			cd.detectChanges();
		};
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this.mobileQuery.addListener(this.mobileQueryListener);
		setIsMobile();
	}

	getGithubUrl(): string {
		return `https://github.com/qgrid/ng2-example/tree${this.router.url}/latest/src/app`;
	}

	getStackblitzUrl(): string {
		return `https://stackblitz.com/github/qgrid/ng2-example/tree${this.router.url}/latest`;
	}

	ngAfterViewInit() {
		this.zone.runOutsideAngular(() => {
			setTimeout(() => {
				const activeItem = this.findActiveItem();
				activeItem.nativeElement.scrollIntoView();
			}, 0);
		});
	}

	private findActiveItem() {
		return this.menuItems.find(item => item.nativeElement.classList.contains('app-active'));
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this.mobileQueryListener);
	}

}
