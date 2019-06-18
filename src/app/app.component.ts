import {
	ChangeDetectorRef,
	Component,
	OnDestroy,
	ChangeDetectionStrategy,
	HostBinding,
} from '@angular/core';
import {
	Router,
	Routes,
} from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { APP_ROUTES } from '../examples/example.module';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {

	@HostBinding('class.app-is-mobile') isMobile: boolean;
	examples: Routes = APP_ROUTES;
	private mobileQueryListener: () => void;
	private mobileQuery: MediaQueryList;

	constructor(
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

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this.mobileQueryListener);
	}

}
