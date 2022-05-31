import { Nullable } from '../utility/types';

export declare class FormatService {
  static number(x: number, format: string): Nullable<string>;
  static date(x: Date, format: string): Nullable<string>;
  static currency(x: number, format: string): Nullable<string>;
}
