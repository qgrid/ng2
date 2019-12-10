export declare interface Validator {
	validate(value: any): boolean;
	getErrors(): { [key: string]: string };
}


export declare interface ValidatorBuilder extends Validator {
	rules: any;
	livrRules: any;
	errors: any;
	livrValidator: Validator;
	hasLivrRules: boolean;
	hasCustomRules: boolean;
	registerRules(rules: any, key: string): void;
	hasRules(): boolean;
}

export declare function createValidator(rules: any): Validator;
