import { OnInit, OnDestroy } from '@angular/core';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';

export abstract class NgComponent implements OnInit, OnDestroy {
	private disposes: any[] = [];

	constructor() {		
	}
	
	using(dispose: () => void) {
		Guard.invokable(dispose, 'dispose');

		this.disposes.push(dispose);
		return this.dispose.bind(this);
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.dispose();
	}

	private dispose() {
		const temp = this.disposes;
		this.disposes = [];
		for (let dispose of temp) {
			dispose();
		}
	}
}
