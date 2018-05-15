export declare const resolvers: object;

export declare class TemplatePath {
	constructor();

	static readonly require: string;

	static register(name: string, resolve: any): TemplatePath;
	static get(source: object): string;
	static find(source: object): string;
	static name(name: string): string;
}
