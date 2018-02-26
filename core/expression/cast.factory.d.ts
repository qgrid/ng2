type ICastFactoryResult<K> = (param: any) => (x: any) => K;

export declare function castFactory(r: any): ICastFactoryResult<any>;
