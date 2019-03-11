import { Box, BoxContext } from './box';
import { Model } from '../infrastructure/model';

export declare class Head extends Box {
	constructor(context: BoxContext, model: Model, markup: { [key: string]: HTMLElement });
}
