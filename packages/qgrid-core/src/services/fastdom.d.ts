export declare class Fastdom {
  static mutate: (task: () => void) => any;
  static measure: (task: () => void) => any;
  static clear(token: any): boolean;
  static invoke: (task: () => void) => any;
}
