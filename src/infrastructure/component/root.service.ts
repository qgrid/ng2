import {Guard} from '@grid/core/infrastructure';
import {Injectable} from '@angular/core';
import {CommandManager} from '@grid/infrastructure/command';

@Injectable()
export class RootService {
    private gridModel: any = null;
    public markup: any = {};
    public bag = new Map<HTMLElement, any>();
    public table: any = null;
    public commandManager;

    constructor() {
        this.markup.document = document;
    }

    get model() {
        Guard.notNull(this.gridModel, 'model');

        return this.gridModel;
    }

    set model(value) {
        this.gridModel = value;
    }
}
