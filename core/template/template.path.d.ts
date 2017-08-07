declare const resolvers: object;

export declare class TemplatePath {
	constructor();

	static register(name: string, resolve: any): TemplatePath; //RESOLVE TYPE ?

	static get(source: object): string;

	static find(source: object): string;

	static name(name: string): string;

	static readonly require: string;
}