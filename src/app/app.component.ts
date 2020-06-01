import {
	ChangeDetectorRef,
	Component,
	OnDestroy,
	ChangeDetectionStrategy,
	HostBinding,
	ElementRef,
	ViewChildren,
	QueryList,
	AfterViewInit,
	NgZone
} from '@angular/core';
import {
	Router,
	Routes,
	RouterLinkActive,
	ActivatedRoute
} from '@angular/router';
import { Location } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { take } from 'rxjs/operators';
import { APP_ROUTES } from '../examples/example.module';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnDestroy {
	@HostBinding('class.app-is-mobile') isMobile: boolean;
	@HostBinding('class.app-env-test') isTestEnv: boolean;

	examples: Routes = APP_ROUTES;

	@ViewChildren(RouterLinkActive, { read: ElementRef })
	menuItems: QueryList<ElementRef>;

	private mobileQueryListener: () => void;
	private mobileQuery: MediaQueryList;

	search: string;

	constructor(
		public activatedRoute: ActivatedRoute,
		private router: Router,
		private location: Location,
		private zone: NgZone,
		cd: ChangeDetectorRef,
		media: MediaMatcher,
	) {
		const setIsMobile = () => this.isMobile = this.mobileQuery.matches;

		this.mobileQueryListener = () => {
			setIsMobile();
			cd.detectChanges();
		};

		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		// tslint:disable-next-line: deprecation
		this.mobileQuery.addListener(this.mobileQueryListener);
		setIsMobile();

		this
			.activatedRoute
			.queryParams
			.subscribe(params => {
				this.search = params['search'] || '';
				this.isTestEnv = params['env'] === 'test';
			});
	}

	onSearchChange() {
		const query = [];
		if (this.search) {
			query.push(`search=${this.search}`);
		}

		if (this.isTestEnv) {
			query.push('env=test');
		}

		this.location.go(
			this.router.url.split('?')[0],
			query.join('&')
		);
	}

	getGithubUrl(): string {
		return `https://github.com/qgrid/ng2-example/tree${this.getExamplePath()}/latest/src/app`;
	}

	getStackblitzUrl(): string {
		return `https://stackblitz.com/github/qgrid/ng2-example/tree${this.getExamplePath()}/latest`;
	}

	getExamplePath(): string {
		return this.router.url.split('?')[0];
	}

	ngAfterViewInit() {
		this.zone.runOutsideAngular(() => {
			setTimeout(() => {
				if (this.menuItems.first && !this.findRequestedItem()) {
					this.router.navigateByUrl(this.menuItems.first.nativeElement.getAttribute('href'));
				}

				const activeItem = this.findActiveItem();
				if (activeItem) {
					activeItem.nativeElement.scrollIntoView();
				}
			}, 0);
		});
	}

	private findRequestedItem() {
		return this.menuItems.find(item => item.nativeElement.getAttribute('href').includes(this.router.url.split('?')[0]));
	}

	private findActiveItem() {
		return this.menuItems.find(item => item.nativeElement.classList.contains('app-active'));
	}

	ngOnDestroy(): void {
		// tslint:disable-next-line: deprecation
		this.mobileQuery.removeListener(this.mobileQueryListener);
	}
}
