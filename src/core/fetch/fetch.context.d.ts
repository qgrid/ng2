export declare interface FetchContext {
	skip: number;
	take: number;
	search: string;
	value: (row: any) => any;

	// Depricated
	filter: string;
}
