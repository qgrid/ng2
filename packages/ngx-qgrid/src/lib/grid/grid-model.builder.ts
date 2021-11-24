import { Injectable } from '@angular/core';
import { ModelBuilder } from '@qgrid/core/model/model.builder';
import { GridModel } from './grid-model';

@Injectable()
export class GridModelBuilder {
	private builder = new ModelBuilder();

	register<T>(key: string, ctor: T) {
		return this.builder.register(key, ctor);
	}

	build(): GridModel {
		return this.builder.build();
	}
}
