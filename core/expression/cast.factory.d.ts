export interface ICastFactoryResult<K> {
  (param: any): (any) => K;
}

export declare function castFactory(r: any): ICastFactoryResult<any>;
