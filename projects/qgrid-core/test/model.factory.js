import { ModelBuilder } from '../model/model.builder';

const builder = new ModelBuilder();
export function modelFactory() {
	return builder.build();
}
