export declare interface Validator {
	validate(value: any): boolean;
	getErrors(): Array<string>;
}

export declare interface ValidatorBuilder {
	validator: Validator;
	fetch: () => void;
	hasCommonRules: boolean;
	hasCustomRules: boolean;
	registerRules(rules: any, key: string): void;
	hasRules(): boolean;
}

export declare function createValidator(rules: any): Validator;
