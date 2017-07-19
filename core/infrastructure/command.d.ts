export interface IContext{
	execute(param: object): any;
	canExecute(param: object): boolean;
	shortcut: string;
}

export declare class Command {
   constructor(context: IContext);
}