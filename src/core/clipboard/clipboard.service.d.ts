export declare interface CopyContext {
    chunks: any;
    source: any;
}

export declare class ClipboardService {
    static copy(context: CopyContext): void;
}