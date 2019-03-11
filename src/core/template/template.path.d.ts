export declare class TemplatePath {
	constructor();

	static readonly require: string;

	static register(name: string, resolve: any): TemplatePath;
	static get(source: any): string;
	static find(source: any): string;
	static name(name: string): string;
}
