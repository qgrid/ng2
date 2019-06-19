import { ModelBuilder } from '../infrastructure/model.builder';

const builder = new ModelBuilder();
export function modelFactory() {
	return builder.build();
}
