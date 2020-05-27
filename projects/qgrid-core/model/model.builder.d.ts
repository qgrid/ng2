import { Model } from './model';

export declare class ModelBuilder {
	register<T>(key: string, ctor: T): ModelBuilder;
	build(): Model;
}