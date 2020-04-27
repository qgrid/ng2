import { Table } from './table';
import { Model } from '../infrastructure/model';

export declare function tableFactory(model: Model, layerFactory: (name: string) => any): Table;