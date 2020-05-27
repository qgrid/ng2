import { Table } from './table';
import { Model } from '../model/model';

export declare function tableFactory(model: Model, layerFactory: (name: string) => any): Table;