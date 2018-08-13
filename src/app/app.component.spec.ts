import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [AppModule]
		}).compileComponents();
	}));

	it('should create the app', async(done => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		// expect(app).toBeTruthy();
		done();
	}));
});
