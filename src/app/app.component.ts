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
	ViewEncapsulation
} from '@angular/core';
import { Routes, RouterLinkActive } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { APP_ROUTES } from '../examples/example.module';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnDestroy {
	mobileQuery: MediaQueryList;
	examples: Routes = APP_ROUTES;

	@ViewChildren(RouterLinkActive, { read: ElementRef })
	menuItems: QueryList<ElementRef>;

	private mobileQueryListener: () => void;

	constructor(cd: ChangeDetectorRef, media: MediaMatcher, private zone: NgZone) {
		this.mobileQueryListener = () => cd.detectChanges();

		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this.mobileQuery.addListener(this.mobileQueryListener);
	}

	ngAfterViewInit() {
		this.zone.runOutsideAngular(() => {
			setTimeout(() => {
				const activeItem = this.findActiveItem();
				activeItem.nativeElement.scrollIntoView({ block: 'center' });
			}, 0);
		});
	}
	private findActiveItem() {
		return this.menuItems.find(item => item.nativeElement.classList.contains('active'));
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this.mobileQueryListener);
	}
}
