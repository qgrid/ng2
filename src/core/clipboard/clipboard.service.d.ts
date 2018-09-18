export declare interface ClipboardContext {
    area: {
        head: string[];
        body: string[];
        foot: string[];
    };
    source: string[];
}

export declare class ClipboardService {
    static copy(context: ClipboardContext): void;
}