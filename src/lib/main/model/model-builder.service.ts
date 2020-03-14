import { Injectable } from '@angular/core';
import { ModelBuilder } from 'ng2-qgrid/core/infrastructure/model.builder';
import { GridModel } from '../../plugins/plugin.service';

@Injectable()
export class ModelBuilderService {
	private builder = new ModelBuilder();

	register<T>(key: string, ctor: T) {
		return this.builder.register(key, ctor);
	}

	build(): GridModel {
		return this.builder.build();
	}
}
