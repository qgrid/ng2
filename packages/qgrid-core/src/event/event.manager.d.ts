export declare class EventManager {
  constructor(context: any, apply?: (fn: () => void) => void);

  bind(f: (arg: any) => void): (...args: any[]) => any;
}
