import { Defer } from '../infrastructure/defer';

export declare function jobLine(delay: number): (job: () => void) => Promise<void>;

export namespace jobLine {
	function run(job: any, delay: number): Defer;
}