export declare interface ClipboardContext {
    chunks: {
        titles: string[];
        readings: string[];
        aggregations: string[];
    };
    source: string[];
}

export declare class ClipboardService {
    static copy(context: ClipboardContext): void;
}