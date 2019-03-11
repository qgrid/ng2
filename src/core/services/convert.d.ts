export declare function parseFactory<V>(type: string, editor?: string): (v: any) => V;
export declare function getType(value: any): string;
export declare function resolveType(value: any[]): string;
export declare function isPrimitive(type: string): boolean;
