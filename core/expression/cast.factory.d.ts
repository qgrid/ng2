export interface ICastFactoryResult<K = any>{
	(param: any): (any) => K;
}

export declare function castFactory(r: any): ICastFactoryResult;
