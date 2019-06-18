import { Injectable } from '@angular/core';
import { ModelBuilder } from 'ng2-qgrid/core/infrastructure/model.builder';

@Injectable()
export class ModelBuilderService {
	private builder = new ModelBuilder();

	register<T>(key: string, ctor: T) {
		return this.builder.register(key, ctor);
	}

	build() {
		return this.builder.build();
	}
}
