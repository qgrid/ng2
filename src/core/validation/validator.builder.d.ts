export declare interface Validator {
	validate(value: any): boolean;
	getErrors(): Array<string>;
}


export declare interface ValidatorBuilder {
	validator: Validator;
	hasCommonRules: boolean;
	hasCustomRules: boolean;
	registerRules(rules: any, key: string): void;
	hasRules(): boolean;
}

export declare function createLivrValidator(rules: any): Validator;
