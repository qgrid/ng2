import {Model} from "../infrastructure/model";
import {TextColumn} from '../column-type/text.column';
import {NumberColumn} from '../column-type/number.column';
import {BoolColumn} from '../column-type/bool.column';
import {DateColumn} from '../column-type/date.column';
import {PasswordColumn} from '../column-type/password.column';
import {ArrayColumn} from '../column-type/array.column';
import {EmailColumn} from '../column-type/email.column';
import {SelectColumn} from '../column-type/select.column';
import {GroupColumn} from '../column-type/group.column';
import {PivotColumn} from '../column-type/pivot.column';
import {RowNumberColumn} from '../column-type/row.number.column';
import {RowIndicatorColumn} from '../column-type/row.indicator.column';
import {RowOptionsColumn} from '../column-type/row.options.column';
import {RowExpandColumn} from '../column-type/row.expand.column';
import {RowDetailsColumn} from '../column-type/row.details.column';
import {PadColumn} from '../column-type/pad.column';
import {TimeColumn} from '../column-type/time.column';
import {UrlColumn} from '../column-type/url.column';
import {FileColumn} from '../column-type/file.column';
import {ImageColumn} from '../column-type/image.column';
import {ReferenceColumn} from '../column-type/reference.column';
import {IdColumn} from '../column-type/id.column';

export declare type ColumnType = TextColumn | NumberColumn | BoolColumn | DateColumn | PasswordColumn | ArrayColumn | EmailColumn | SelectColumn | GroupColumn | PivotColumn | RowNumberColumn | RowIndicatorColumn | RowOptionsColumn | RowExpandColumn | RowDetailsColumn | PadColumn | TimeColumn | UrlColumn | FileColumn | ImageColumn | ReferenceColumn | IdColumn;

export declare function columnFactory(model: Model): ColumnType;
