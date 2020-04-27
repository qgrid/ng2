import { Box, BoxContext } from './box';
import { Model } from '../infrastructure/model';
import { Markup } from '../services/markup';

export declare class Head extends Box {
	constructor(context: BoxContext, model: Model, markup: Markup);
}
