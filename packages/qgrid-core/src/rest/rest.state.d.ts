import { Model } from '../model/model';

export interface RestSerialized {
  order: string;
  filter: string;
  skip: number;
  take: number;
}

export declare class RestState {
  url: string;
  method: string;
  serialize: (model: Model) => RestSerialized;
}
