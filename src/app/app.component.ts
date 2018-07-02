import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Routes } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { exampleRoutes } from '../examples/example.module';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
	mobileQuery: MediaQueryList;
	examples: Routes = exampleRoutes;

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
