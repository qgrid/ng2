export declare interface Validator {
  validate(value: any): boolean;
  getErrors(): { [key: string]: (Array<string> | string) };
}

export declare function hasRules(rules: any, key: string): boolean;
export declare function createValidator(rules: any, key?: string): Validator;
