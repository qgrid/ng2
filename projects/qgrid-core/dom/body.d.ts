import { VirtualBox } from './virtual/box';
import { Box, BoxContext } from './box';
import { Model } from '../infrastructure/model';

export declare class Body extends Box {
	constructor(context: BoxContext, model: Model);
}

export declare class VirtualBody extends VirtualBox {
	constructor(context: BoxContext, model: Model);
}
