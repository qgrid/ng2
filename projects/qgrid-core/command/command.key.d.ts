export declare interface CommandKey<T> {
    name: string;
}

export declare function commandKey<T>(name: string): CommandKey<T>;

export function generateCommandKey(): CommandKey<any>;