import { Model } from '../model/model';
import { Table } from './table';

export declare function tableFactory(model: Model, layerFactory: (name: string) => any): Table;
