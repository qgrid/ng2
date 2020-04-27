import { VirtualBox } from './virtual/box';
import { Box, BoxContext } from './box';
import { Model } from '../infrastructure/model';
import { Markup } from '../services/markup';

export declare class Body extends Box {
	constructor(context: BoxContext, model: Model, markup: Markup);
}

export declare class VirtualBody extends VirtualBox {
	constructor(context: BoxContext, model: Model, markup: Markup);
}
