import { ChangeDetectorRef, Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Routes } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { APP_ROUTES } from '../examples/example.module';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
	mobileQuery: MediaQueryList;
	examples: Routes = APP_ROUTES;

	private mobileQueryListener: () => void;

	constructor(cd: ChangeDetectorRef, media: MediaMatcher) {
		this.mobileQueryListener = () => cd.detectChanges();

		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this.mobileQuery.addListener(this.mobileQueryListener);
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this.mobileQueryListener);
	}
}
