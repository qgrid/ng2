import {VirtualBox} from './virtual/box';
import {Box} from './box';

export declare class Body extends Box {
	constructor(public markup: object);
}

export declare class VirtualBody extends VirtualBox {
	constructor(public markup: object);
}