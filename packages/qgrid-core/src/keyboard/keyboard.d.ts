export declare class Keyboard {
  static isPrintable(code: string): boolean;
  static isControl(code: string): boolean;
  static stringify(code: string, key: string): string;
  static translate(code: number): string;
}
