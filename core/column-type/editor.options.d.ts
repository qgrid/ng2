import {Model} from '../infrastructure/model';

export interface IEditorOptions {
    trigger: string;
    cruise: string;
    modelFactory: () => Model;
    label: any;
    fetch: any;
    value: any;
}