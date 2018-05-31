import { jobLine } from '../services/job.line';

export class AnimationModel {
	constructor() {
		this.cellHandler = {
			job: jobLine(150)
		};
	}
}