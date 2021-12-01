declare module "livr" {
    export class Validator {
        constructor(schema: any);

        validate(value: any): boolean;
        getErrors(): { [key: string]: (Array<string> | string) };
    }
}
