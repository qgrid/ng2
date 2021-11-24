interface CommandContext<T = any> {
	execute?: (e?: T, ...args: any[]) => any;
	canExecute?: (e?: T, ...args: any[]) => boolean;
	shortcut?: string;
	priority?: number;
	source?: string;
}

type DisposableResource =
	{ finalize: () => void }
	| { unsubscribe: () => void }
	| (() => void);

declare class Disposable {
	add(resource: DisposableResource): void;
	remove(resource: DisposableResource): boolean;
	finalize(): void;
}

declare type EventUnsubscribe = () => void;
declare type EventHandler<TArg> = (arg: TArg, off: EventUnsubscribe) => void;

declare class Event<TArg = any> {
	constructor(reply?: () => TArg);

	emit(value: TArg): void;

	on(next: EventHandler<TArg>): EventUnsubscribe;
	watch(next: EventHandler<TArg>): EventUnsubscribe;
}

declare interface ObserverLike<T> {
    next(value?: T): void;
    error(ex: Error): void;
    complete(): void;
}

declare interface UnsubscribableLike {
    unsubscribe(): void;
    readonly closed: boolean;
}

declare interface SubscribableLike<T> {
    subscribe(observer?: Partial<ObserverLike<T>>): UnsubscribableLike;
    /** @deprecated Use an observer instead of a complete callback */
    subscribe(next: null | undefined, error: null | undefined, complete: () => void): UnsubscribableLike;
    /** @deprecated Use an observer instead of an error callback */
    subscribe(next: null | undefined, error: (error: any) => void, complete?: () => void): UnsubscribableLike;
    /** @deprecated Use an observer instead of a complete callback */
    subscribe(next: (value: T) => void, error: null | undefined, complete: () => void): UnsubscribableLike;
    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): UnsubscribableLike;
}

declare interface UnaryFunctionLike<T, R> {
    (source: T): R;
}

declare interface OperatorFunctionLike<T, R> extends UnaryFunctionLike<ObservableLike<T>, ObservableLike<R>> {
}

declare interface ObservableLike<T> extends SubscribableLike<T> {
    toPromise(): Promise<T>;

    pipe(): ObservableLike<T>;
    pipe<A>(op1: OperatorFunctionLike<T, A>): ObservableLike<A>;
    pipe<A, B>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>): ObservableLike<B>;
    pipe<A, B, C>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>): ObservableLike<C>;
    pipe<A, B, C, D>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>): ObservableLike<D>;
    pipe<A, B, C, D, E>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>): ObservableLike<E>;
    pipe<A, B, C, D, E, F>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>): ObservableLike<F>;
    pipe<A, B, C, D, E, F, G>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>): ObservableLike<G>;
    pipe<A, B, C, D, E, F, G, H>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>, op8: OperatorFunctionLike<G, H>): ObservableLike<H>;
    pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>, op8: OperatorFunctionLike<G, H>, op9: OperatorFunctionLike<H, I>): ObservableLike<I>;
    pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>, op8: OperatorFunctionLike<G, H>, op9: OperatorFunctionLike<H, I>, ...operations: OperatorFunctionLike<any, any>[]): ObservableLike<{}>;
}

declare class ObservableEvent<T> implements ObservableLike<T> {
    constructor(event: Event<T>, disposable: Disposable);

    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): UnsubscribableLike;
    subscribe(observer: Partial<ObserverLike<T>>): UnsubscribableLike;

    toPromise(): Promise<T>;

    pipe(): ObservableLike<T>;
    pipe<A>(op1: OperatorFunctionLike<T, A>): ObservableLike<A>;
    pipe<A, B>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>): ObservableLike<B>;
    pipe<A, B, C>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>): ObservableLike<C>;
    pipe<A, B, C, D>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>): ObservableLike<D>;
    pipe<A, B, C, D, E>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>): ObservableLike<E>;
    pipe<A, B, C, D, E, F>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>): ObservableLike<F>;
    pipe<A, B, C, D, E, F, G>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>): ObservableLike<G>;
    pipe<A, B, C, D, E, F, G, H>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>, op8: OperatorFunctionLike<G, H>): ObservableLike<H>;
    pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>, op8: OperatorFunctionLike<G, H>, op9: OperatorFunctionLike<H, I>): ObservableLike<I>;
    pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>, op8: OperatorFunctionLike<G, H>, op9: OperatorFunctionLike<H, I>, ...operations: OperatorFunctionLike<any, any>[]): ObservableLike<{}>;
}

declare class ObservableReplyEvent<T> extends ObservableEvent<T> {
}

declare class SubjectLike<T> extends ObservableEvent<T> implements ObserverLike<T> {
    constructor();

    next(value?: T): void;
    error(ex: Error): void;
    complete(): void;
}

/**
 * Use this class to implement command pattern in the qgrid. The most of interactions in the q-grid are utilized by this pattern.
 * 
 * ### Create a command using q-grid facade.
 *
 * ```javascript
 *	const addRowCommand = new qgrid.Command({
 *	   canExecute: () => true,	    
 *	   execute: () => {
 *	      const newRow = {
 *			 id: 1,
 *			 text: 'Lorem ipsum dolor sit amet'
 *	      };
 *
 *		  gridModel.data({
 *			 rows: gridModel.data().rows.concat(newRow)
 *		  });
 *	   },
 *	   shortcut: 'F7'
 *  });
 * ```
 *
 * ### Suggested Links.
 *
 * * [Command Pattern Wiki](https://en.wikipedia.org/wiki/Command_pattern)
 */
declare class Command<T = any> {
    constructor(context?: CommandContext<T>);

    /**
     * Indicates if a command can be invoked. Use one argument to support typescript generic typification.
	 * By default true value is returned.
     */
    canExecute: (e?: T, ...args: any[]) => boolean;

    /**
     * Triggers canExecute method on UI.
     */
    canExecuteCheck: SubjectLike<T>;

    /**
     * Invokes the command. Use one argument to support typescript generic typification.
	 * Sometimes interaction model requires to return a value, for example, default command manager 
	 * stops to process next commands if false is returned by the command execute method.
     */
    execute: (e?: T, ...args: any[]) => any;

    /**
     * A sequence of keyboard key codes to execute the command. 
	 * Here are some examples:
     *
     * * shift+a
     * * ctrl+s
     * * f2
     *
     */
    shortcut?: string;

    /**
     * Command priority that can be used by command manager to specify order of commands to execute. 
	 * For example, if several commands have the same shortcut, you may need to see in which order 
	 * these commands should be executed.
     */
    priority?: number;

	/**
	 * Indicates an origin of the command.
	 */
	source?: string;
	
	/**
	 * If a command is executed by q-grid command manager, the sink value contains 
	 * the last canExecute result. 
	 */
	sink?: any;
}

/**
 * Use this class to connect q-grid command and UI. Usually action represents a button, but not necessary, custom template can be [used to](/doc/features/action-bar).
 * Note that even action doesn't populate UI, command should be still executable through the keyboard shortcut.
 * 
 * ### Create an action.
 *
 * ```javascript
 * this.addRowCommand = 
 * 		new Action(
 *			new Command({	    
 *		  		execute: () => {
 *		     		const newRow = { id: 1, text: 'Lorem ipsum dolor sit amet' };
 *                  this.rows = this.rows.concat(newRow);
 *		   		},
 * 			}),
 * 			'Add Row'
 *		);
 * ```
 */
declare class Action {
	constructor(
		command: Command,
		title?: string,
		icon?: string,
		templateUrl?: string,
	);

	/**
	 * User command that will be executed when:
	 *
	 * * Action button is clicked.
	 * * Custom template calls command execute method.
	 * * Command keyboard shortcut is pressed.
	 */
	command: Command;

	/**
	 * A text to show in the button, or tooltip to show if the icon property is set.
	 */
	title: string;

	/**
	 * An icon key to render on the button.
	 */
	icon: string;

	/**
	 * Template url of the action
	 */
	templateUrl: string;
}

/**
 * Allows to change performance strategy of the grid.
 * * `full` grid has full interaction possibilities.
 * * `readonly` grid starts to use cache to render values.
 * * `detached` grid disable change detection after render.
 */
declare type GridStateInteractionMode = 'full' | 'readonly' | 'detached';

/**
 * A class contains basic grid options like id and title.
 */
declare class GridState {
	/**
	 * Grid identifier that is in sync with element id.
	 * Mostly this id is used in a style generation routine to link concrete grid with appropriate style.
	 * Also is used in data manipulation plugin to identify correct list of presets.
	 */
	id: string;

	/**
	 * Indicates a state of the model:
	 * * `unbound` model is not connected to a grid element.
	 * * `bound` model connected to a grid element.
	 *
	 * Current version of the grid doesn't allow to use one model on several grids,
	 * so if user will try to do that exception will be thrown.
	 */
	status: string;

	/**
	 * Text that is used by grid title plugin to show header inside top toolbar.
	 */
	caption: string;

	/**
	 * Allows to change performance strategy of the grid.
	 * * `full` grid has full interaction possibilities.
	 * * `readonly` grid starts to use cache to render values.
	 * * `detached` grid disable change detection after render.
	 */
	interactionMode: GridStateInteractionMode;

	// @deprecated
	title: string;
}

declare type EditorOptionsCruise = 'control' | 'transparent';
declare type EditorOptionsTrigger = 'click' | 'custom' | 'focus';

/**
 * Specific options for the cell edit mode.
 */
interface EditorOptions {

	/**
	 * Says when cell should go to the edit mode.
	 *
	 * * `click` edit mode activates when user clicks on cell.
	 * * `custom` if user defines own edit mode trigger, like button for reference column edit, this option should be used.
	 * * `focus` edit mode activates when cell receives focus.
	 */
	trigger?: EditorOptionsTrigger;

	/**
	 * Defines navigation behavior when cell is in edit mode.
	 *
	 * * `control` when cell is in edit mode, keyboard navigation events are disabled(in general, `tab` and `shift+tab` still works).
	 * * `transparent` when cell is in edit mode, keyboard navigation event are still applicable.
	 */
	cruise?: EditorOptionsCruise;

	/**
	 * q-grid model factory, can be used by reference column to draw a another q-grid in edit cell mode.
	 */
	modelFactory?: (context: {
		row: any,
		column: ColumnModel,
		getValue: (row: any) => any,
		reference: { commit: Command, cancel: Command, value: any }		
	}) => Model;

	/**
	 * Can be used by e.g. `auto-complete` editor to populate list of items.
	 */
	fetch?: () => Promise<any> | { subscribe: (x: any) => void } | any;

	/**
	 * List of actions, can be used by row-options column to draw menu with commands.
	 */
	actions?: Action[];

	label?: any;
	value?: any;
}

/**
 * Indicates if column should be frozen.
 * - `'left'` - freeze a column to the grid's left.
 * - `'right'` - freeze a column to the grid's right.
 * - `'mid'` - do not freeze  a column.
 */
declare type ColumnModelPin = 'mid' | 'left' | 'right';

/**
 * A functional type of a the column.
 *
 *  * `control` behavior controllers (e.g. `select` type column).
 *  * `data` real user data.
 *  * `markup` used for the internal markup needs (e.g. `pad` type column).
 *  * `pivot`multi head pivot.
 */
declare type ColumnModelCategory = 'data' | 'control' | 'markup' | 'pivot' | 'cohort';

/**
 * Place where a column was created.
 *
 * * `generation` was auto-generated by the q-grid.
 * * `template` was defined by user in the html template.
 * * `user` was defined by user in the javascript/typescript.
 */
declare type ColumnModelSource = 'generation' | 'template' | 'user';
declare type ColumnModelOrigin = 'specific' | 'custom';
/**
 * Indicates how to calculate column width:
 * 
 * * `relative` get whole grid width minus static px widths and apply percents.
 * * `absolute` get whole grid width and apply percents.  
 * * `fit-head` column width will be equal to the text head width.
 */
declare type ColumnModelWidthMode = 'relative' | 'absolute' | 'fit-head';

declare type ColumnModelType =
	'array' |
	'bool' |
	'cohort' |
	'currency' |
	'date' |
	'datetime' |
	'email' |
	'file' |
	'filter-row' |
	'group' |
	'id' |
	'image' |
	'number' |
	'pad' |
	'pivot' |
	'reference' |
	'row-details' |
	'row-expand' |
	'row-indicator' |
	'row-number' |
	'row-options' |
	'select' |
	'summary' |
	'text' |
	'time' |
	'url';

/**
 * A class that represents any column in the qgrid.
 */
declare class ColumnModel {
	/**
	 * Type of column. Beside below list user is free to define own column type.
	 * Be aware that some column types are used for internal purposes.
	 */
	type?: ColumnModelType | string;

	/**
	 * A column identifier, should be unique across all columns. If path is not setup, key property is used
	 * to retrieve a cell value.
	 */
	key?: string;

	/**
	 * Column header text, also can be shown as column tooltip, or used in plugins like column filter plugin.
	 */
	title?: string;

	/**
	 * A column description text, showed in the tooltip under basic theme.
	 */
	description?: string;

	/**
	 * Getter, setter for a cell value. If the value property is setup, it is used to get/set cell value.
	 */
	value?: (row: any, value?: any) => any;

	$value?: (row: any, value?: any) => any;

	/**
	 * Path to the value. Example is `address.phones.0.num`, if `path` property is setup, it is used
	 * to get/set cell value, but it has a lower priority than column `value` property.
	 */
	path?: string;

	/**
	 * Indicates if column should be frozen.
	 */
	pin?: ColumnModelPin;

	origin?: ColumnModelOrigin;

	/**
	 * Place where a column was created.
	 */
	source?: ColumnModelSource;

	/**
	 * A functional type of a the column.
	 */
	category?: ColumnModelCategory;

	/**
	 * Css class.
	 */
	class?: string;

	/**
	 * Editor type, will be shown in cell edit mode instead of default column type editor.
	 * For instance, it can be used for id type column `<q-grid-column type="id" editor="number">`
	 */
	editor?: string;

	/**
	 * Options for cell edit mode.
	 */
	editorOptions?: EditorOptions;

	/**
	 * Width of the q-grid column.
	 *
	 * * Can be setup in `pixels` like `<q-grid-column [width]="100"></q-grid-column>`.
	 * * Can be setup in `percents` like `<q-grid-column width="20%"></q-grid-column>`.
	 *
	 * Percents are materialized only once on init, and depend on the q-grid size.
	 */
	width?: number | string;

	/**
	 * Minimal width of the column.
	 */
	minWidth?: number;

	/**
	 * Maximum width of the column.
	 */
	maxWidth?: number;

	/**
	 * If set, column width will be expanded to this value on focus.
	 */
	viewWidth?: number;

	/**
	 * Indicates how to calculate column width:
	 * 
	 * * `relative` get whole grid width minus static px widths and apply percents.
	 * * `absolute` get whole grid width and apply percents.  
	 */
	widthMode?: ColumnModelWidthMode;

	/**
	 * Indicates if cells in the column are editable.
	 */
	canEdit?: boolean;

	/**
	 * Indicates if use can change column width by drag and drop.
	 */
	canResize?: boolean;

	/**
	 * Indicates if sorting can be applied to the column.
	 * `Column sort` plugin is used this property to enable/disable sort arrow icons.
	 */
	canSort?: boolean;

	/**
	 * Indicates if drag and drop is allowed for the column.
	 */
	canMove?: boolean;

	/**
	 * Indicates if data in the column can be filtered.
	 * `Column filter` plugin is used this property to enable/disable filter icon.
	 */
	canFilter?: boolean;

	/**
	 * Indicates if underneath column cells should be highlighted when mouse is over column header.
	 */
	canHighlight?: boolean;

	/**
	 * Indicates if column cells can take focus.
	 */
	canFocus?: boolean;

	/**
	 * Indicates if column is visible or not.
	 */
	isVisible?: boolean;

	/**
	 * Indicates the order of the column.
	 */
	index?: number;

	/**
	 * Indicates what text should be shown in the cell. If property is not set column value is used.
	 * Also `filter plugin` uses this property to show list of items and for filter application.
	 */
	label?: ((row: any, value?: any) => any) | any;

	/**
	 * Path to the label. Example is `address.phones.0.num`, if `labelPath` property is setup, it is used
	 * to get/set cell label, but it has a lower priority than column `label property.
	 */
	labelPath?: string;

	/**
	 * This function is used by `column sort` pipe to order row values.
	 */
	compare?: (x: any, y: any) => number;

	/**
	 * If children property is setup the column automatically becomes a group container.
	 */
	children?: ColumnModel[]

	/**
	 * Start index number for columns with type 'row-number'.
	 */
	startNumber?: number;

	$label?: ((row: any, value?: any) => any) | any;

	itemLabel?: (row: any, value?: any) => any;

	symbol?: string;
	code?: string;

	trueValue?: any;
	falseValue?: any;

	itemType?: string;
	itemFormat?: string;
	format?: string;

	canUpload?: () => boolean;
	hasPreview?: (name: string) => boolean;

	offset?: number;
}

declare class ColumnView {
	readonly model: ColumnModel;
	readonly colspan: number;
	readonly rowspan: number;
	readonly columnIndex: number;
	readonly rowIndex: number;
}

interface RowViewPosition {
	readonly index: number;
}

interface RowView extends RowViewPosition {
	readonly model: any;
}

declare type SceneStateStatus = 'idle' | 'start' | 'pull' | 'push' | 'stop';
declare type SceneStateColumnArea =  { left: ColumnView[], right: ColumnView[], mid: ColumnView[] };
declare type SceneStateColumnLine = ColumnView[];
declare type SceneStateColumnRows = ColumnView[][];

/**
 * A class that contains results of q-grid invalidate.
 */
declare class SceneState {

	/**
	 * Status of invalidation.
	 *
	 * * `start` request to refresh the q-grid.
	 * * `pull` request to propagate a q-grid model to the UI.
	 * * `push` request UI to draw a model.
	 * * `stop` scene in the stable state.
	 */
	status: SceneStateStatus;

	/**
	 * List of rows to render.
	 */
	rows: RowView[];

	/**
	 * Column rendering object.
	 */
	column: {
		rows: SceneStateColumnRows,
		line: SceneStateColumnLine,
		area: SceneStateColumnArea
	};
}

/**
 * Command resolution manager that controls what commands and in which order columns should be executed.
 * Usually other q-grid internal services use this class after some keyboard events.
 *
 */
declare class CommandManager {
	constructor(apply?: (f: () => void) => void, context?: any);

	/**
	 * Execute commands in a manager specific way.
	 *
	 * @param commands list of commands to execute, usually come after filter invocation.
	 * @param source indicates a source of command execution.
	 */
	invoke(commands: Command[], context?: any,  source?: string): boolean;

	/**
	 * Filter out disabled commands, usually command `canExecute` method is used.
	 *
	 * @param commands list of commands that are candidates for execution.
	 * @param source indicates a source of command execution.
	 */
	filter(commands: Command[], source?: string): Command[];
}

declare class ShortcutDispatcher {
	constructor();

	register(manager: CommandManager, commands: Command[]): () => void;
	execute(code: string): Command[];
	canExecute(code: string): boolean;
}

declare class KeyCode {
	code: string;
	key: string;
}

declare class Shortcut {
	constructor(manager: ShortcutDispatcher);

	static isControl(keyCode: KeyCode): boolean;
	static isPrintable(keyCode: KeyCode): boolean;
	static stringify(keyCode: KeyCode): string;
	static translate(e: KeyboardEvent): string;

	factory(commandManager: CommandManager): {
		register: (commands: Command[]) => void
	};

	keyDown(
		e: {
			key: string, 
			keyCode: number, 
			shiftKey: boolean
		},
		source?: string): string[];

	register(commandManager: CommandManager, commands: Command[]): () => void;
}

// import { Resource } from '../resource/resource';

/**
 * Use this class to handle and visualize custom user behaviors.
 * [action bar](/doc/feature/action.html) plugin uses this model to draw buttons on the top of q-grid to execute user commands.
 *
 * ### Usage
 *
 * ```javascript
 * const addRowCommand = new qgrid.Command({
 *   execute: () => {
 *      const newRow = {
 *		 id: 1,
 *		 text: 'foo'
 *      };
 *
 *      gridModel.data({
 *        rows: gridModel.data().rows.concat(newRow)
 *      });
 *   },
 *   shortcut: 'F7'
 *});
 *
 * const addRowAction = new qgrid.Action({
 *    command: addRowCommand,
 *    title: 'Add new row',
 *    icon: 'add'
 * });
 *
 * gridModel.action({
 *    items: [addRowAction]
 * });
 * ```
 *
 */
declare class ActionState {
	/**
	 * List of actions that will be added to the command manager,
	 * and bind to the keyboard events.
	 */
	items: Action[];

	/**
	 * The service that connects keyboard events and commands.
	 */
	shortcut: Shortcut;

	/**
	 * Command manager is responsible for 2 questions:
	 * * What commands can be executed?
	 * * How/in what order commands should be executed?
	 */
	manager: CommandManager;
}

interface NodeState {
	expand: boolean;
}

declare class Node$1 {
	constructor(key: string | any, level: number, type?: string);

	/**
	 * Unique identifier for the node.
	 */
	key: string | any;

	/**
	 * Node hierarchy level.
	 */
	level: number;

	/**
	 * Type of the node.
	 *
	 * * `'group'`
	 * * `'row'`
	 * * `'value'`
	 * * `'summary'`
	 */
	type: 'group' | 'row' | 'value' | 'summary';

	/**
	 * List of row indices that belongs to the node.
	 */
	rows: number[];

	/**
	 * List of child nodes.
	 */
	children: Node$1[];

	/**
	 * Column key of the node.
	 */
	source: string;

	/**
	 * Value of the node.
	 */
	value: any;

	/**
	 * Shows if node was expanded or not.
	 */
	state: NodeState;
}

interface PipePivot {
	head: Node$1;
	rows: any[];
}

interface PipeFolder {
	pivot: PipePivot;
	rows: any[];
	nodes: any[];
}

interface PipeContext {
	model: Model;
}

declare type PipeCallback<TArg, TNextArg> = (arg: TArg, context: PipeContext, next: (nextArg: TNextArg) => void) => void;
declare type RowsPipe = PipeCallback<any[], any[]>;
declare type MemoPipe<TArg> = PipeCallback<TArg, PipeFolder>;

declare type PipeUnitWhy = 'redraw' | 'refresh';

declare class AnimationState {
	apply: PipeCallback<any, any>[];
}

declare class BodyState {
}

/**
 * A column generation mode. Here are possible values:
 * 
 * - `null` auto generation is off. 
 * - `deep` number of columns will be equal to number of graph leafs after deep traversing of first row object.
 * - `shallow` number of columns will be equal to number of keys from first row object.
 * - `cohort` similar to deep, but use column groups to display hierarchy.
 */
declare type ColumnListStateGeneration = null | 'deep' | 'shallow' | 'cohort';

declare type ColumnListStateTypeDetection = 'inference' | 'raw';

/**
 * Use this class to order and generate q-grid columns.
 *
 * ### Setup column generation mode in html.
 *
 * ```html
 * <q-grid>
 *    <q-grid-columns generation="deep">
 *    </q-grid-columns>
 * </q-grid>
 * ```
 *
 * ### Add one column to the qgrid.
 *
 * ```html
 * <q-grid>
 *    <q-grid-columns>
 *       <q-grid-column type="number" [canSort]="false" [canFilter]="false"></q-grid-column>
 *    </q-grid-columns>
 * </q-grid>
 * ```
 *
 */
declare class ColumnListState {
	/**
	 * A column generation mode.
	 */
	generation: ColumnListStateGeneration;

	/**
	 * A type of column type property detection.
	 */
	typeDetection: ColumnListStateTypeDetection;

	/**
	 * Tree of columns which q-grid uses for column ordering.
	 * This is filled automatically by internal service, but can be modified, for instance,
     * by [column sort](/doc/feature/sort.html) plugin.
	 */
	index: Node$1;

	/**
	 * List of columns from html template. Usually that kind of column can be
	 * defined with `<q-grid-column>` component in html,
     * and has `column.source === 'template'`.
	 */
	columns: ColumnModel[];

	/**
	 * If user omits key property while defining a column, this column goes to the reference
	 * object as `{columnType: myColumn}`. The reference settings will be applied for all
	 * column of appropriate type as defaults.
	 */
	reference: { [type: string]: ColumnModel };

	/**
	 * Flatten list of data columns, filled automatically on data columns changes.
	 */
	line: ColumnModel[];
}

/**
 * Use this class to get access to the high level q-grid data structures.
 *
 * ### Usage
 * In html through attribute bindings:
 * ```html
 * <q-grid [columns]="myColumns" [rows]="myRows">
 * </q-grid>
 * ```
 *
 * In html via component:
 * ```html
 * <q-grid>
 * 	<q-grid-columns>
 * 		<q-grid-column key="id" title="ID" type="id"></q-grid-column>
 * 		<q-grid-column key="myColumnKey" title="My Column Name"><q-grid-column>
 * 	</q-grid-columns>
 * </q-grid>
 * ```
 *
 * In js code through model:
 * ```javascript
 * const myRows = [];
 * const myColumns = [];
 *
 * gridModel.data({
 *  rows: myRows,
 *  columns: myColumns
 * });
 * ```
 *
 */
declare class DataState {

	/**
 	 * A list of data rows to display. 
	 */
	rows: any[];

	/**
	 * A set of columns to display. 
	 * q-grid makes it possible to add columns from various sources and then merge 
	 * them due to each column having a key property. Note that if you have defined columns in 
	 * javascript and template with the same key, algorithm tries to keep the setting from both 
	 * sources but javascript will have a top priority.
	 */
	columns: ColumnModel[];

	/**
     * A series of methods that grid invokes asynchronously anytime refresh is required. 
     * Please see PipeModel section for more information on grid refresh	 
	 */
	pipe: PipeCallback<any, any>[];

	/**
	 * Returns uniq column row key.
	 */
	rowId: (index: number, row: any) => any;

	
	/**
     * Returns uniq column key.
	 */
	columnId: (index: number, column: ColumnModel) => any;
}

/**
 * A class to work with drag and drop grid infrastructure.
 */
declare class DragState {
	/**
	 * Flag that indicates drag in drop is performing.
	 * Usually is used inside the grid to apply some custom styles.
	 */
	isActive: boolean;
}

/**
 * Property that controls grid edit unit.
 *
 * * `'cell'` data is editable through the grid cells.
 * * `'row'` data is editable through the grid rows.
 * * `'null'` data is not editable.
 */
declare type EditStateMode = null | 'cell' | 'row';

/**
 * Indicates if q-grid is in `'edit'` or in a `'view'` mode.
 */
declare type EditStateStatus = 'edit' | 'view' | 'startBatch' | 'endBatch';

/**
 * Property that controls grid edit behavior.
 *
 * * `'batch'` batch update.
 */
declare type EditStateMethod = null | 'batch';

/**
 * A class represent options to control q-grid edit mode.
 */
declare class EditState {
	/**
	 * Property that controls grid edit unit.
	 */
	mode: EditStateMode;

	/**
	 * Indicates if q-grid is in `'edit'` or in a `'view'` mode.
	 */
	status: EditStateStatus;

	/**
	 * Property that controls grid edit behavior.
	 */
	method: EditStateMethod;

	/**
	 * Allows to the grid user to control if cell or row can be edited or not.
	 */
	enter: Command;

	/**
	 * Allows to the grid user to control if new cell value can be stored in data source or not.
	 */
	commit: Command;

	/**
	 * Allows to the grid user to control if cell can exit edit mode.
	 */
	cancel: Command;

	/**
	 * Allows to the grid user to control if cell can exit edit mode.
	 */
	reset: Command;

	/**
	 * Allows to the grid user to manage clear action behavior in edit mode.
	 */
	clear: Command;

	/**
	 * Object that contains `{columnKey: keyboardKeys}` map, that is used by q-grid to manage
	 * when cancel command should be execute on key down event.
	 */
	cancelShortcuts: { [key: string]: string };

	/**
	 * Object that contains `{columnKey: keyboardKeys}` map, that is used by q-grid to manage
	 * when enter command should be execute on key down event.
	 */
	enterShortcuts: { [key: string]: string };

	/**
	 * Object that contains `{columnKey: keyboardKeys}` map, that is used by q-grid to manage
	 * when commit command should be execute on key down event.
	 */
	commitShortcuts: { [key: string]: string };
}

declare class ExportState {
}

/**
 * A class that can be used in custom user pipe within `PaginationState` to make server request when
 * virtual scrolling is enabled.
 */
declare class FetchState {
	/**
	 * Number of rows that should be skipped to get new portion of data,
	 * this property is filled by internal virtual scroll service.
	 */
	skip: number;
}

declare interface Assert {
	equals: (x: any, y: any) => boolean;
	lessThan: (x: any, y: any) => boolean;
	isNull: (x: any) => boolean;
}

declare interface FetchContext {
	skip: number;
	take: number;
	search: string;
	value: (row: any) => any;

	// @deprecated
	filter: string;
}

declare type FilterStateMatch = () => FilterStatePredicate;
declare type FilterStatePredicate = (x: any, value: any) => boolean;
declare type FilterStateFetch = (key: string, context: FetchContext) => any | Promise<any>;

/**
 * Filter representation enum:
 *
 * * `default` filtration through column filters and external plugins.
 * * `row` filtration through header row filter and external plugins.
 */
declare type FilterStateUnit = 'default' | 'row';

declare class FilterState {
	/**
	 * Object that contains filter values, `{columnKey: items | blanks | expression}`
	 *
	 * * `items` list of values so when setup works like `in` operator.
	 * * `blanks` boolean value that indicates should we filter blanks values or not.
	 * * `expression` and\or expression
	 */
	by: { [key: string]: any };

	/**
	 * Filter representation enum:
	 */
	unit: FilterStateUnit;

	/**
	 * Factory for the match function.
	 */
	match: FilterStateMatch;

	/**
	 * The custom filter function.
	 */
	custom: FilterStatePredicate;

	/**
	 * If setup `column filter` plugin can use this property to populate list of column items.
	 */
	fetch: FilterStateFetch;

	/**
	 * Factory for assertion unit that contains comparison functions.
	 *
	 * * `equals` should return true if two values are equal
	 * * `lessThan` should return true if the first value is less than the second.
	 * * `isNull` should return true if value means null.
	 */
	assertFactory: () => Assert;

	/**
	 * Factory for getting collection of filter operators available for a certain column.
	 */
	operatorFactory: (column: ColumnModel) => string[];
}

/**
 * A class that contains focused cell position.
 */
declare class FocusState {
	/**
	 * Index of row for focused cell.
	 */
	rowIndex: number;

	/**
	 * Index of column for focused cell.
	 */
	columnIndex: number;

	/**
	 * Indicates if grid is focused or not.
	 */
	isActive: boolean;
}

declare class FootState {
}

/**
 * How grid will render nodes:
 * * `'nest'` all hierarchy levels inside one group type column.
 * * `'flat'` all hierarch levels inside own group type columns.
 * * `'subhead'` group column try to use all available space to display hierarchy.
 * * `'rowspan'` group column occupies all space on expand
 */
declare type GroupStateMode = 'nest' | 'subhead' | 'rowspan' | 'flat';

declare type GroupStateSummary = null | 'leaf';

/**
 * A class that allows to apply some hierarchy to the grid.
 * However user is allowed to write any kind of custom hierarchies just by overriding default pipe and
 * working with `Node` object from the grid service.
 */
declare class GroupState {
	/**
	 * How grid will render nodes:
	 */
	mode: GroupStateMode;

	summary: GroupStateSummary;

	/**
	 * List of column keys to build appropriate hierarchy.
	 * Each item represents next level.
	 */
	by: string[];

	toggle: Command;

	toggleAll: Command;

	shortcut: { [key: string]: string };

	flatten: (nodes: Node$1[]) => Node$1[];
}

declare class HeadState {
}

interface CellViewPosition {
	readonly rowIndex: number;
	readonly columnIndex: number;
}

interface CellView extends CellViewPosition {
	readonly row: any;
	readonly column: ColumnModel;
}

/**
 * A class contains highlight data for rows and columns
 */
declare class HighlightState {
	/**
	 * Set of columns that should be highlighted.
	 */
	columns: string[];

	/**
	 * Set of rows that should be highlighted.
	 */
	rows: number[];

	cell: CellViewPosition;
}

declare class KeyboardState {
	codes: string[];
	code: string;
	status: 'release' | 'down' | 'up';
}

declare class LayerState {
}

/**
 * A class contains rewritten widths and heights of rows and columns
 */
declare class LayoutState {
	/**
	 * Set of column sizes.
	 */
	columns: Map<string, any>;

	/**
	 * Set of row sizes.
	 */
	rows: Map<any, any>;
}

declare interface ModelTag {
	source?: string;
	behavior?: string;
	isBusy?: boolean;
}

declare type ModelChanges<TState> = { [key in keyof TState]: { newValue: TState[key] | null, oldValue: TState[key] | null } };

declare interface ModelEventArg<TState> {
	state: TState;
	changes: ModelChanges<TState>;
	tag: ModelTag;

	hasChanges<TKey extends keyof TState>(key: TKey): boolean;
}

declare type ModelEvent<T> = Event<ModelEventArg<T>>;

declare interface Td {
    // @deprecated
    readonly element: HTMLElement;

	readonly value: any;
	readonly label: any;

    readonly columnIndex: number;
    readonly rowIndex: number;
    readonly column: ColumnModel;
	readonly row: any;

	mode(value: string): void;
}

declare type MouseStateCode = 'left' | 'right' | 'middle' | null;
declare type MouseStateStatus =
	| 'release'
	| 'down'
	| 'up'
	| 'move'
	| 'enter'
	| 'leave';

declare class MouseState {
	code: MouseStateCode;
	status: MouseStateStatus;
	target: Td;
	timestamp: number;
}

/**
 * A class that gives access to the current cell position inside the q-grid.
 */
declare class NavigationState {
	/**
     * Set/get a focused cell
     */
	cell: CellView | null;

	go: Command;

	shortcut: { [key: string]: string };

	prevent: Set<string>;
}

declare type PaginationStateMode = 'showPages' | 'showRows';

/**
 * A class that allows to split data to pages, also virtual scroll use some options from here.
 */
declare class PaginationState {
	/**
	 * Current page number;
	 */
	current: number;

	/**
	 * Selected page size.
	 */
	size: number;

	/**
	 * List of available sizes.
	 */
	sizeList: number[];

	/**
	 * Count of total rows.
	 */
	count: number;

	mode: PaginationStateMode;

	/**
	 * List of `model name: [model properties]` pairs to reset pagination current property to 0.
	 */
	resetTriggers: { [key: string]: string[] };
}

interface Storage {
	getItem(key: string): string;
	setItem(key: string, value: string): void;
}

declare class PersistenceStorage {
	constructor(storage: Storage);

	getItem<T>(key: string): Promise<T>;
	setItem<T>(key: string, value: T): Promise<any>;
}

declare function serialize<T>(value: T): string;
declare function deserialize<T>(value: string): T;

declare type PersistenceSchedule = 'onDemand' | 'onStateChange';

declare class PersistenceState {
	id: string;
	defaultGroup: string;
	schedule: PersistenceSchedule;

	storage: PersistenceStorage;

	load: Command;
	remove: Command;
	create: Command;
	modify: Command;
	reset: Command;
	setDefault: Command;
	settings: { [key: string]: string[] };
}

declare type ColumnIndexPipeUnit = [
    PipeCallback<any, Node$1>,
    MemoPipe<Node$1>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
];

declare type ColumnPipeUnit = [
    MemoPipe<any>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
] & { why: any };

declare type DefaultPipeUnit = [
    RowsPipe,
    RowsPipe,
    RowsPipe,
    MemoPipe<any[]>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
] & { why: PipeUnitWhy };

declare type GroupPipeUnit = [
    PipeCallback<any, PipeFolder>,
    PipeCallback<PipeFolder, PipeFolder>,
    PipeCallback<PipeFolder, PipeFolder>,
] & { why: PipeUnitWhy };

declare type RowDetailsPipeUnit = [
    PipeCallback<any, any[]>,
] & { why: PipeUnitWhy };

declare type RowPipeUnit = [
    PipeCallback<any, PipeFolder>,
    PipeCallback<PipeFolder, PipeFolder>,
    PipeCallback<PipeFolder, any[]>,
] & { why: PipeUnitWhy };

declare type ScenePipeUnit = [
    PipeCallback<any[], any[]>,
    MemoPipe<any[]>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
]& { why: PipeUnitWhy };

declare type ViewPipeUnit = [
    RowsPipe,
    MemoPipe<any[]>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
] & { why: PipeUnitWhy };

declare class PipeUnit {
	static readonly column: ColumnPipeUnit;
	static readonly columnIndex: ColumnIndexPipeUnit;
	static readonly default: DefaultPipeUnit;
	static readonly group: GroupPipeUnit;
	static readonly row: RowPipeUnit;
	static readonly rowDetails: RowDetailsPipeUnit;
	static readonly scene: ScenePipeUnit;
	static readonly view: ViewPipeUnit;
}

/**
 * A class that contains setting to control when and how q-grid should be updated.
 *
 * ### Default Triggers
 * ```javascript
 *  {
 *	   'data': {
 *	      'rows': PU.default,
 *		  'columns': PU.column
 *	   'pagination': {
 *		  'current': PU.default,
 *		  'size': PU.default
 *		},
 *		'fetch': {
 *		   'skip': PU.default
 *		},
 *		'sort': {
 *		   'by': PU.default
 *		},
 *		'filter': {
 *		   'by': PU.default,
 *		   'unit': PU.column
 *		},
 *		'group': {
 *		   'by': PU.default
 *		},
 *		'pivot': {
 *		   'by': PU.default
 *		},
 *		'columnList': {
 *		   'index': PU.column
 *		},
 *		'row': {
 *		   'status': PU.rowDetails,
 *         'canMove': PU.column,
 *         'canResize': PU.column
 *		},
 *		'selection': {
 *		   'mode': PU.column,
 *		   'unit': PU.column
 *		}
 *  };
 * ```
 */
declare class PipeState {
	/**
	 * A function that allows to shrink a number of pipe units that should be invoked on refresh request.
	 */
	reduce: (units: PipeUnit[], model: Model) => PipeUnit[];

	/**
	 * A schema that shows what pipeline will be executed on appropriate model property change.
	 *
	 */
	triggers: { [modelName: string]: { [modelProperty: string]: PipeUnit } };

	effect: { [key: string]: any }
}

/**
 * A class to control q-grid pivoting functions.
 */
declare class PivotState {
	/**
	 * A list of column keys to pivot. Each item represents next level.
	 */
	by: string[];
}

declare class PluginState {
	imports: { [key: string]: any };
}

/**
 * A class representing the q-grid job state.
 *
 * ### Usage
 *
 * In general this model is not modified directly, consider to [grid service](`/doc/api/grid-service.html`).
 *
 * ```javascript
 * 	const gridModel = qgrid.model();
 *	const service = qgrid.service(gridModel);
 *	const cancelBusy = service.busy();
 *
 *	new Promise(resolve => {
 *	   cancelBusy();
 *     resolve()
 *	});
 * ```
 */
declare class ProgressState {
	/**
	 * Indicates if there a running job or not.
	 */
	isBusy: boolean;

	/**
	 * List of progress jobs.
	 */
	queue: string[];
}

declare class RestState {
	url: string;
	method: string;
	serialize: (model: Model) => {
		order: string,
		filter: string,
		skip: number,
		take: number
	};
}

declare class RowListState {
	index: Map<any, number>;
}

declare class RowDetailsStatus {
	constructor(expand: boolean);

	readonly expand: boolean;
}

/**
 * Indicates how many detail items could be shown on the screen.
 * 
 * * `all` every row is opened and showing details.
 * * `single` only one row per time could show details.
 * * `multiple` several rows could show details.
 */
declare type RowStateMode = 'all' | 'single' | 'multiple';

/**
 * Indicates if row details is turned on.
 */
declare type RowStateUnit = 'data' | 'details';

/**
 * Row state.
 */
declare class RowState {

	/**
	 * Indicates how many detail items could be shown on the screen.
	 */
	mode: RowStateMode;

	/**
	 * Indicates if row details is turned on.
	 */
	unit: RowStateUnit;

	height: (element: HTMLElement, index: number) => number | number;

	/**
	 * Indicates row details status, key is a data row value is a details status.
	 */
	status: Map<any, RowDetailsStatus>;

	/**
	 * Indicates if rows are movable.
	 */
	canMove: boolean;

	/**
	 * Indicates if rows are resizable.
	 */
	canResize: boolean;

	/**
	 * Indicates min size of rows for resize.
	 */
	 minHeight: number;
	
	/**
	 * All data rows in this list will be pinned to top.
	 */
	pinTop: any[];

	/**
	 * All data rows in this list will be pinned to bottom.
	 */
	pinBottom: any[];

	toggle: Command<{ row: any }>;

	/**
	 * Keyboard shortcuts to control actions.
	 */
	shortcut: { [key: string]: string };
}

/**
 * Scroll mode.
 *
 * * `'default'` mode without virtualization.
 * * `'virtual'` turn on virtual mode.
 */
declare type ScrollStateMode = 'default' | 'virtual';

/**
 * A class that contains properties about scroll status.
 */
declare class ScrollState {

	/**
	 * Scroll mode.
	 */
	mode: ScrollStateMode;

	/**
	 * Top scroll position.
	 */
	top: number;

	/**
	 * Left scroll position.
	 */
	left: number;

	/**
	 * Row index on top of the q-grid client area.
	 */
	cursor: number;

	map: {
		rowToView: (index: number) => number,
		viewToRow: (index: number) => number,
	};

	resetTriggers: Array<string>;
}

/**
 * Controls if click on the q-grid body should select row or not.
 *
 * * `'body'` click on the q-grid body leads to row select/unselect.
 * * `'custom'` only select checkbox click leads to row select/unselect.
 */
declare type SelectionStateArea = 'custom' | 'body';

/**
 * Selection primitive.
 *
 * * `'row'` user can select rows by clicking on checkboxes or q-grid body area.
 * * `'cell'` `default` user can select cells clicking on the q-grid body area.
 * * `'column'` user can select columns by clicking on the q-grid body area.
 * * `'mix'` user can select both rows and cells, rows are selectable by clicking on row-indicator column.
 */
declare type SelectionStateUnit = 'row' | 'cell' | 'column' | 'mix';

/**
 * Selection mode.
 *
 * * `'single'`
 * * `'multiple'`
 * * `'range'`
 * * `'singleOnly'`
 */
declare type SelectionStateMode = 'single' | 'multiple' | 'range' | 'singleOnly';

/**
 * A class that allows to control selection function of the q-grid.
 */
declare class SelectionState {
	/**
	 * Controls if click on the q-grid body should select row or not.
	 */
	area: SelectionStateArea;

	/**
	 * Selection primitive.
	 */
	unit: SelectionStateUnit;

	/**
	 * Selection mode.
	 */
	mode: SelectionStateMode;

	/**
	 * List of selected items.
	 */
	items: any[];

	/**
	 * Set of map function, that can convert column and row to necessary format.
	 *
	 * * `'column'` custom column key will be stored in the items property.
	 * * `'row'` custom row id will be stored in the items property.
	 */
	rowKey: (row: any) => any;
	columnKey: (column: ColumnModel) => any;

	/**
	 * Keyboard shortcuts to control selection behavior. Changed.
	 */
	shortcut: { [key: string]: string };

	/**
	 * Allows to disable selection and execute action on selection changed from ui.
	 */
	toggle: Command<{ items: any }>;
}

/**
 * Sorting mode.
 *
 * * `'multiple'` allows to sort by several column keys.
 * * `'single'` allows to sort only by one column key.
 * * `'mixed'` allows to sort multiple columns while Shift key pressed otherwise applies single mode
 */
declare type SortStateMode = 'single' | 'multiple' | 'mixed';

declare type SortStateDirection = 'desc' | 'asc';

/**
 * A class that allows to control sorting.
 *
 * ### Usage
 * ```javascript
 * gridModel.sort({
 *    by: [{myColumnKey: 'asc', myOtherColumnKey: 'desc'}]
 * });
 *
 * // In the nearest future
 * gridModel.sort({
 *    by: ['+myColumnKey', '-myOtherColumnKey']
 * });
 * ```
 */
declare class SortState {
	/**
	 * Ordered list of entries to control sorting.
	 */
	by: string[] | Array<{ [key: string]: SortStateDirection }>;

	/**
	 * Sorting mode.
	 *
	 * * `'multiple'` allows to sort by several column keys.
	 * * `'single'` allows to sort only by one column key.
	 */
	mode: SortStateMode;

	/**
	 * List of triggers that should lead to sorting invalidation.
	 * Default is `['reorder']`.
	 */
	trigger: string[];
}

declare interface StyleRowContext {
	class: (name: string, style?: { [key: string]: any }) => void;
	row: number;
	value: any;
}

declare interface StyleCellContext {
	class: (name: string, style?: { [key: string]: any }) => void;
	row: number;
	column: number;
	value: any;
}

declare type StyleRowCallback = (row: any, context: StyleRowContext) => void;
declare type StyleCellCallback = (row: any, column: ColumnModel, context: StyleCellContext) => void;

/**
 * A class that allows to apply styles to rows and cells.
 *
 * ### Usage
 *
 * ```javascript
 *    gridModel.style({
 *        row: (row, context) => {
 *            if (row.gender === 'female') {
 *                context.class(`female-row-${this.femaleColor}`, {background: '#' + this.femaleColor});
 *            }
 *
 *            if (row.gender === 'male') {
 *                context.class(`male-row-${this.maleColor}`, {background: '#' + this.maleColor});
 *            }
 *        },
 *        cell: (row, column, context) => {
 *            if (column.key === 'birthday') {
 *                context.class('red-birthday', {background: '#f00', color: '#fff'});
 *            }
 *
 *            if (column.key === 'name.last') {
 *                if (context.value(row, context.columns.map.gender) === 'female') {
 *                    context.class('female-name-last', {background: '#ff0', color: '#000'});
 *                }
 *            }
 *
 *            if (column.key === 'name.first') {
 *                if (context.row % 2) {
 *                    context.class('first-name-even', {background: '#000', color: '#fff'});
 *                }
 *                else {
 *                    context.class('first-name-odd', {background: '#fff', color: '#000'});
 *                }
 *            }
 *        }
 *    });
 * ```
 */
declare class StyleState {
	/**
	 * Style row.
	 */
	row: StyleRowCallback;

	/**
	 * Style cell, when object is used key represents column key.
	 */
	cell: StyleCellCallback | { [key: string]: StyleCellCallback };

	/**
	 * On invalidate.
	 */
	invalidate: Command;

	/**
	 * Queue of row styles that can be used internally or in plugins.
	 */
	rows: StyleRowCallback[];

	/**
	 * Queue of cell styles that can be used internally or in plugins.
	 */
	cells: StyleCellCallback[];

	/**
	 * List of CSS classes
	 */
	classList: Array<string>;
}

declare class ToolbarState {
}

/**
 * A class to setup validation rules settings.
 *
 * ### Suggested Links
 *
 * * [LIVR](https://github.com/koorchik/LIVR)
 */
declare class ValidationState {
	/**
	 * List of validation rules.
	 */
	rules: any[];
}

/**
 * A class that represent a raw data to render.
 */
declare class ViewState {
	/**
	 * List of data rows to render.
	 */
	rows: any[];

	/**
	 * The last row of columns that should be rendered.
	 */
	columns: ColumnModel[];

	/**
	 * List of nodes to render.
	 */
	nodes: Node[];

	/**
	 * Pivoted data structure to render.
	 */
	pivot: PipePivot;
}

/**
 * A class to control visibility of the q-grid areas.
 */
declare class VisibilityState {
	/**
	 * Indicates if the q-grid `head` is visible.
	 */
	head: boolean;

	/**
	 * Indicates if the q-grid `foot` is visible.
	 */
	foot: boolean;

	/**
	 * Indicates if the q-grid `body` is visible.
	 */
	body: boolean;

	/**
	 * Object that controls if the q-grid `toolbar` panels are visible.
	 *
	 * * `'top'` show/hide top toolbar.
	 * * `'right'` show/hide right toolbar.
	 * * `'bottom'` show/hide bottom toolbar.
	 * * `'left'` show/hide left toolbar.
	 */
	toolbar: {
		top: boolean;
		right: boolean;
		bottom: boolean;
		left: boolean;
	};

	/**
	 * Object that controls if the q-grid `frozen` panels are visible.
	 *
	 * * `'right'` show/hide right pin panel.
	 * * `'left'` show/hide left pin panel.
	 * * `'top'` show/hide top floating rows.
	 * * `'bottom'` show/hide bottom floating rows.
	 */
	pin: {
		left: boolean;
		right: boolean;
		top: boolean;
		bottom: boolean;
	};

	plugin: { [key: string]: boolean };
}

declare class ClipboardState {
    copy: Command;
}

declare type StateSet<K extends keyof any, TState> = {
	[P in K]: (state: Partial<TState>, tag?: ModelTag) => Model;
}

declare type StateGet<K extends keyof any, TState> = {
	[P in K]: () => Readonly<TState>;
}

declare type StateChange<K extends keyof any, TState> = {
	[P in K]: ModelEvent<TState>;
};

declare type StateAccessor<
	TStateName extends keyof any,
	TStateChangeName extends keyof any,
	TState
	> =
	StateSet<TStateName, TState>
	& StateGet<TStateName, TState>
	& StateChange<TStateChangeName, TState>;

declare type ActionAccessor = StateAccessor<'action', 'actionChanged', ActionState>;
declare type AnimationAccessor = StateAccessor<'animation', 'animationChanged', AnimationState>;
declare type BodyAccessor = StateAccessor<'body', 'bodyChanged', BodyState>;
declare type ColumnListAccessor = StateAccessor<'columnList', 'columnListChanged', ColumnListState>;
declare type DataAccessor = StateAccessor<'data', 'dataChanged', DataState>;
declare type DragAccessor = StateAccessor<'drag', 'dragChanged', DragState>;
declare type EditAccessor = StateAccessor<'edit', 'editChanged', EditState>;
declare type ExportAccessor = StateAccessor<'export', 'exportChanged', ExportState>;
declare type FetchAccessor = StateAccessor<'fetch', 'fetchChanged', FetchState>;
declare type FilterAccessor = StateAccessor<'filter', 'filterChanged', FilterState>;
declare type FocusAccessor = StateAccessor<'focus', 'focusChanged', FocusState>;
declare type FootAccessor = StateAccessor<'foot', 'footChanged', FootState>;
declare type GridAccessor = StateAccessor<'grid', 'gridChanged', GridState>;
declare type GroupAccessor = StateAccessor<'group', 'groupChanged', GroupState>;
declare type HeadAccessor = StateAccessor<'head', 'headChanged', HeadState>;
declare type HighlightAccessor = StateAccessor<'highlight', 'highlightChanged', HighlightState>;
declare type KeyboardAccessor = StateAccessor<'keyboard', 'keyboardChanged', KeyboardState>;
declare type LayerAccessor = StateAccessor<'layer', 'layerChanged', LayerState>;
declare type LayoutAccessor = StateAccessor<'layout', 'layoutChanged', LayoutState>;
declare type MouseAccessor = StateAccessor<'mouse', 'mouseChanged', MouseState>;
declare type NavigationAccessor = StateAccessor<'navigation', 'navigationChanged', NavigationState>;
declare type PaginationAccessor = StateAccessor<'pagination', 'paginationChanged', PaginationState>;
declare type PersistenceAccessor = StateAccessor<'persistence', 'persistenceChanged', PersistenceState>;
declare type PipeAccessor = StateAccessor<'pipe', 'pipeChanged', PipeState>;
declare type PivotAccessor = StateAccessor<'pivot', 'pivotChanged', PivotState>;
declare type PluginAccessor = StateAccessor<'plugin', 'pluginChanged', PluginState>;
declare type ProgressAccessor = StateAccessor<'progress', 'progressChanged', ProgressState>;
declare type RestAccessor = StateAccessor<'rest', 'restChanged', RestState>;
declare type RowAccessor = StateAccessor<'row', 'rowChanged', RowState>;
declare type RowListAccessor = StateAccessor<'rowList', 'rowListChanged', RowListState>;
declare type SceneAccessor = StateAccessor<'scene', 'sceneChanged', SceneState>;
declare type ScrollAccessor = StateAccessor<'scroll', 'scrollChanged', ScrollState>;
declare type SelectionAccessor = StateAccessor<'selection', 'selectionChanged', SelectionState>;
declare type SortAccessor = StateAccessor<'sort', 'sortChanged', SortState>;
declare type StyleAccessor = StateAccessor<'style', 'styleChanged', StyleState>;
declare type ToolbarAccessor = StateAccessor<'toolbar', 'toolbarChanged', ToolbarState>;
declare type ValidationAccessor = StateAccessor<'validation', 'validationChanged', ValidationState>;
declare type ViewAccessor = StateAccessor<'view', 'viewChanged', ViewState>;
declare type VisibilityAccessor = StateAccessor<'visibility', 'visibilityChanged', VisibilityState>;
declare type ClipboardAccessor = StateAccessor<'clipboard', 'clipboardChanged', ClipboardState>;

declare type ResolveAccessor = {
	resolve<TState>(type: new () => TState): StateAccessor<'state', 'changed', TState>;
};

type Model =
	ActionAccessor
	& AnimationAccessor
	& BodyAccessor
	& ColumnListAccessor
	& ClipboardAccessor
	& DataAccessor
	& DragAccessor
	& EditAccessor
	& ExportAccessor
	& FetchAccessor
	& FilterAccessor
	& FocusAccessor
	& FootAccessor
	& GridAccessor
	& GroupAccessor
	& HeadAccessor
	& HighlightAccessor
	& KeyboardAccessor
	& LayerAccessor
	& LayoutAccessor
	& MouseAccessor
	& NavigationAccessor
	& PaginationAccessor
	& PersistenceAccessor
	& PipeAccessor
	& PivotAccessor
	& PluginAccessor
	& ProgressAccessor
	& RestAccessor
	& RowAccessor
	& RowListAccessor
	& SceneAccessor
	& ScrollAccessor
	& SelectionAccessor
	& SortAccessor
	& StyleAccessor
	& ToolbarAccessor
	& ValidationAccessor
	& ViewAccessor
	& VisibilityAccessor
	& ResolveAccessor;

interface Rect {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
}

declare class FakeClassList {
	constructor();

	add(): void;
	remove(): void;
}

declare class FakeElement {
	constructor();

	classList: FakeClassList;

	readonly clientWidth: number;
	readonly clientHeight: number;
	readonly offsetWidth: number;
	readonly offsetHeight: number;

	getBoundingClientRect(): Rect;
}

declare class Unit {
	constructor();

	rect(): Rect;
	addClass(name: string): void;
	removeClass(name: string): void;
	hasClass(name: string): boolean;
	width(): number;
	height(): number;
	getElement(): FakeElement;
}

declare class Element$1 extends Unit {
	constructor(element: HTMLElement);

	element: HTMLElement;
}

declare class Cell extends Element$1 {
	constructor(context: BoxContext, rowIndex: number, columnIndex: number, element: HTMLElement);

	model(): Td;
}

declare class Column {
	constructor(box: Box, index: number);

	model(): any;

	cells(): Cell[];
	cell(rowIndex: number): Cell;

	addClass(name: string): void;
	removeClass(name: string): void;
}

declare class Row extends Element$1 {
	constructor(box: Box, index: number, element: HTMLElement);

	cells(): Cell[];
	cell(columnIndex: number): Cell;

	model(): any;
}

declare interface Tr {
    readonly element: HTMLElement;
    
    readonly index: number;
    readonly model: any;
}

declare class Bag {
	findModel(element: HTMLElement): Tr | Td;
	hasModel(element: HTMLElement): boolean;

	addRow(row: Tr): void;
	addCell(cell: Td): void;
	deleteRow(row: Tr): void;
	deleteCell(cell: Td): void;
}

declare type Markup = { [key: string]: HTMLElement };

interface BoxMapper {
	row(): any;
	column(): (columnIndex: number) => ColumnModel;
	rowBack(): any;
	columnBack(): any;
}

interface BoxContext {
	markup: Markup;
	mapper: BoxMapper;
	layer: any;
	bag: {
		body: Bag,
		head: Bag,
		foot: Bag
	};
}

declare class Box {
	constructor(context: BoxContext, model: Model, selectorMark: any);

	cell(rowIndex: number, columnIndex: number): Cell;
	column(columnIndex: number): Column;
	columns(rowIndex: number): Column[];
	row(rowIndex: number, columnIndex?: number): Row;
	rows(columnIndex: number): Row[];
	rowCount(columnIndex: number): number;
	columnCount(rowIndex: number): number;
}

declare class View extends Unit {
	constructor(context: BoxContext, model: Model);

	columns(): ColumnView[];

	focus(): boolean;
	blur(): void;
	isFocused(): boolean;

	scrollLeft(value?: number): number;
	scrollTop(value?: number): number;
	scrollHeight(): number;
	scrollWidth(): number;
	canScrollTo(element: Element, direction: string): boolean;

	rect(area?: string): Rect;
	width(area?: string): number;
	height(area?: string): number;

	addLayer(name: string): any;
	removeLayer(name: string): boolean;
	hasLayer(name: string): boolean;
}

declare class Data {
	constructor(model: Model);

	model: Model;

	columns(): ColumnModel[];
	columnMap(): { [key: string]: ColumnModel };
	rows(): any[];
}

declare class Head extends Box {
	constructor(context: BoxContext, model: Model);
}

declare class Body extends Box {
	constructor(context: BoxContext, model: Model);
}

declare class Foot extends Box {
	constructor(context: BoxContext, model: Model);
}

/**
 * Use this class to get access to low level dom elements and functions of the qgrid.
 */
declare class Table {
	constructor(model: Model, box: BoxContext);

	readonly box: BoxContext;

	/**
	 * Contains dom selectors for the q-grid header component.
	 */
	readonly head: Head;

	/**
	 * Contains dom selectors for the q-grid body component.
	 */
	readonly body: Body;

	/**
	 * Contains dom selectors for the q-grid footer component.
	 */
	readonly foot: Foot;

	/**
	 * Helps to manipulate with q-grid client area.
	 */
	readonly view: View;

	/**
	 * Get raw data of what is rendered right now in qgrid.
	 */
	readonly data: Data;

	invalidate(): void;
}

declare class RenderStrategy {
	columns(row: any, pin: ColumnModelPin, rowIndex: number): ColumnView[];
	rowspan(row: any, column: ColumnView, rowIndex: number, columnIndex: number): number;
	colspan(row: any, column: ColumnView, rowIndex: number, columnIndex: number): number;

	getValue(row: any, column: ColumnModel, select: (row: any, column: ColumnModel) => any, rowIndex: number, columnIndex: number): any;
	setValue(row: any, column: ColumnModel, value: any, rowIndex: number, columnIndex: number): void;
	getLabel(row: any, column: ColumnModel, select: (row: any, column: ColumnModel) => any, rowIndex: number, columnIndex: number): any;
	setLabel(row: any, column: ColumnModel, value: any, rowIndex: number, columnIndex: number): void;

	columnList(pin: ColumnModelPin): ColumnView[];
}

declare class Renderer {
	constructor(plugin: GridPlugin);

	defaultStrategy: RenderStrategy;

	columns(row: any, pin: ColumnModelPin, rowIndex: number): ColumnView[];
	rowspan(row: any, column: ColumnView, rowIndex: number, columnIndex: number): number;
	colspan(row: any, column: ColumnView, rowIndex: number, columnIndex: number): number;

	getValue(row: any, column: ColumnModel, rowIndex: number, columnIndex: number): any;
	setValue(row: any, column: ColumnModel, value: any, rowIndex: number, columnIndex: number): void;

	getLabel(row: any, column: ColumnModel, rowIndex: number, columnIndex: number): any;
	setLabel(row: any, column: ColumnModel, value: any, rowIndex: number, columnIndex: number): void;

	readonly rows: { left: any[], right: any[], mid: any[] };
}

/**
 * Use this class to get access to the main area rendering options.
 * 
 * ### How to access
 * 
 * ```html
 * <ng-template let-$view="$view">
 * 		Count of columns for the first row: {{$view.body.render.columns(rows[0], null, 0)]).length}}
 * </ng-template>
 * ```
 * 
 */
declare class BodyLet {
	constructor(plugin: GridPlugin);

	/**
	 *  Use to build layout.
	 */
	readonly render: Renderer;

	columns(pin: string): ColumnView[];
}

declare class CellEditor {
	constructor(td: Td);

	fetch: () => void;
	resetFetch: () => void;

	value: any;
	label: any;

	readonly cell: CellView;

	commit(): void;
	reset(): void;
}

declare class EditCellLet {
	constructor(
		plugin: GridPlugin,
		shortcut: { register: (commands: Command[]) => void, keyCode: () => KeyCode }
	);

	readonly enter: Command;
	readonly commit: Command;
	readonly push: Command;
	readonly cancel: Command;
	readonly reset: Command;
	readonly exit: Command;

	value: any;
	label: any;
	requestClose: () => boolean;

	readonly cell: CellView;
	readonly row: any;
	readonly column: ColumnModel;
	readonly options: EditorOptions;
	readonly editor: CellEditor;

	readonly fetch: any;
	readonly resetFetch: () => void;
}

declare class RowEditorCore {
	constructor();

	editors: CellEditor[];

	commit(): void;
	reset(): void;
}

declare class RowEditor extends RowEditorCore {
	constructor(row: any, columns: ColumnModel[]);

	static readonly empty: RowEditorCore;

	row: any;
	value: any;
}

declare class EditRowLet {
	constructor(
		plugin: GridPlugin,
		shortcut: { register: (commands: Command[]) => void }
	);

	readonly editor: RowEditor;
	readonly enter: Command;
	readonly commit: Command;
	readonly cancel: Command;
	readonly reset: Command;
}

declare class EditLet {
	constructor(
		plugin: GridPlugin,
		shortcut: { register: (commands: Command[]) => void }
	);

	readonly cell: EditCellLet;
	readonly row: EditRowLet;
}

declare class FilterLet {
	constructor(plugin: GridPlugin);

	readonly filter: Command<any>;
	has(column: ColumnModel): boolean;
	value<T>(column: ColumnModel): T;
}

declare class FootLet {
	constructor(plugin: GridPlugin);

	readonly count: number;
	readonly rows: any[];

	columns(row: any, pin: ColumnModelPin): ColumnView[];
	invalidate(model: Model): void;
	value(column: ColumnModel): any;
	valueFactory: (column: ColumnModel) => (row: any, value?: any) => any;
}

declare class GroupLet {
	constructor(plugin: GridPlugin, shortcut: { register: (commands: Command[]) => void });

	readonly toggleStatus: Command<[any, ColumnModel]>;
	readonly toggleAllStatus: Command;

	count(node: Node, column: ColumnModel): number;
	status(node: Node, column: ColumnModel): 'expand' | 'collapse';
	offset(node: Node, column: ColumnModel): number;
	value(node: Node, column: ColumnModel): string;
	isVisible(node: Node, column: ColumnModel): boolean;
}

declare class HeadLet {
	constructor(plugin: GridPlugin, tagName: string);

	readonly drop: Command<{ dragData: string }>;
	readonly drag: Command<{ dragData: string }>;

	readonly resize: Command;

	readonly rows: SceneStateColumnRows;

	columns(row: any, pin: string): SceneStateColumnLine;
}

declare class HighlightLet {
	constructor(plugin: GridPlugin);

	readonly column: Command;
	readonly row: Command;
	readonly cell: Command;
	readonly clear: Command;
}

declare class LayoutLet {
	constructor(
		plugin: GridPlugin
	);
}

declare class NavigationLet {
	constructor(plugin: GridPlugin, shortcut: { register: (commands: Command[]) => void });

	readonly focus: Command;
	readonly scrollTo: Command;
}

declare class PaginationLet {
	constructor(plugin: GridPlugin);

	readonly current: number;
	readonly size: number;
}

declare class RowDetailsLet {
	constructor(plugin: GridPlugin, shortcut: { register: (commands: Command[]) => void });

	readonly toggleStatus: Command<any>;
	status(row: any): boolean;
}

declare class RowLet {
	constructor(plugin: GridPlugin, tagName: string);

	readonly drop: Command<{ dragData: number }>;
	readonly drag: Command<{ dragData: number }>;

	readonly canMove: boolean;
	readonly canResize: boolean;
}

declare interface IVscrollSettings {
	threshold: number;
	placeholderHeight: number;
	placeholderWidth: number;
	resetTriggers: Array<string>;
	rowHeight: number | ((element: HTMLElement) => number);
	columnWidth: number | ((element: HTMLElement) => number);

	fetch: (skip: number, take: number, d: { resolve: (count: number) => void, reject: () => void }) => void;
	emit: (f: () => void) => void;
}

declare interface IVscrollContainer {
	count: number;
	position: number;
	force: boolean;

	draw$: SubscribableLike<{ position: number }>;

	reset(): void;
	update(count: number): void;
}

declare interface IVscrollContext {
	settings: IVscrollSettings;
	container: IVscrollContainer;

	id(index: number): number;
}

declare class ScrollLet {
	constructor(plugin: GridPlugin, vscroll: IVscrollContext);

	readonly mode: ScrollStateMode;
	readonly y: IVscrollContext;
}

declare class SelectionLet {
	constructor(plugin: GridPlugin, shortcut: { register: (commands: Command[]) => void });

	readonly selection: SelectionState;
	readonly rows: any[];
	readonly columns: ColumnModel[];

	readonly toggleRow: Command;
	readonly toggleCell: Command;
	readonly toggleColumn: Command;

	selectRange(startCell: Td, endCell: Td, source?: string): void;

	state(item: any): boolean;
	isIndeterminate(item: any): boolean;
	stateCheck: SubjectLike<boolean>;
}

declare class SortLet {
	constructor(plugin: GridPlugin);

	readonly hover: boolean;
	readonly toggle: Command;

	direction(column: ColumnModel): { [key: string]: ColumnModel };
	order(column: ColumnModel): number;
}

declare class StyleEntry {
	constructor(element: HTMLElement, sheets: Map<any, any>);
	element: HTMLElement;
	sheets: Map<any, any>;
	list: Set<any>;
	class(key: string, style: string): void;
}

declare class StyleMonitor {
	constructor(model: Model);

	entries: StyleEntry[];
	newSheets: Map<any, any>;
	oldSheets: Map<any, any>;

	enter(): (key: string, style: string) => void;
	exit(): void;
}

declare class StyleLet {
	constructor(plugin: GridPlugin);

	readonly monitor: {
		row: StyleMonitor;
		cell: StyleMonitor;
	};

	invalidate(domRow: any, domCell: any): void;
	needInvalidate(): boolean;
}

declare class ClipboardLet {
	constructor(
		plugin: GridPlugin,
		shortcut: { register: (commands: Command[]) => void }
	);

	readonly copy: Command;
}

interface GridLet {
    body: BodyLet;
    clipboard: ClipboardLet;
    edit: EditLet;
    filter: FilterLet;
    foot: FootLet;
    group: GroupLet;
    head: HeadLet;
    highlight: HighlightLet;
    layout: LayoutLet;
    nav: NavigationLet;
    pagination: PaginationLet;
    row: RowLet;
    rowDetails: RowDetailsLet;
    scroll: ScrollLet;
    selection: SelectionLet;
    sort: SortLet;
    style: StyleLet;
}

declare class GridService {
	constructor(model: Model);

	invalidate(settings?: Partial<{
		source: string,
		changes: ModelChanges<any>,
		pipe: PipeCallback<any, any>[],
		why: PipeUnitWhy
	}>): Promise<void>;

	busy(): () => void;

	focus(rowIndex?: number, columnIndex?: number): void;
}

interface GridPlugin {
    readonly model: Model;
    readonly table: Table;
    readonly view: GridLet;
    readonly service: GridService;

    observe<TState>(event: Event<TState>): ObservableLike<TState>;
    observeReply<TState>(event: Event<TState>): ObservableLike<TState>;
}

declare class BodyHost {
	constructor(plugin: GridPlugin);

	scroll(e: { scrollLeft: number, scrollTop: number });
	wheel(e: WheelEvent);

	mouseLeave(e: MouseEvent);
}

declare class BoxHost {
	constructor(host: HTMLElement, plugin: GridPlugin);
}

declare function bodyCellClassifier(column: ColumnModel): (element: HTMLElement) => void;
declare function headCellClassifier(column: ColumnModel): (element: HTMLElement) => void;

declare interface ColumnListGenerationSettings {
	columnFactory: (type: string) => ColumnModel;
	deep: boolean;
	cohort: boolean;
	rows: any[];
	testNumber: number;
	typeDetection: ColumnListStateTypeDetection;
	title: (text: string) => string;
}

declare function generateFactory(model: Model): () => { hasChanges: boolean, columns: any[] };
declare function generate(settings: Partial<ColumnListGenerationSettings>): ColumnModel[];

declare class ColumnListHost {
	constructor(
		model: Model,
		canCopy: (key: string, source: any, target: any) => boolean,
		parseFactory: (type: string, source: any) => (v: any) => any
	)

	copy(target: any, source: any): void;
	add(column: ColumnModel): void;
	register(column: ColumnModel): void;
	generateKey(source: any): string;
	extract(key: string, type: string): ColumnModel;
	delete(key: string);
}

interface AggregationOptions {
	distinct: boolean;
	separator: string;
}

declare class Aggregation {
	constructor();
	static first(rows: any[], getValue: (row: any) => any): any;
	static last(rows: any[], getValue: (row: any) => any): any;
	static max(rows: any[], getValue: (row: any) => any): any;
	static min(rows: any[], getValue: (row: any) => any): any;
	static minMax(rows: any[], getValue: (row: any) => any): [any, any];
	static avg(rows: any[], getValue: (row: any) => any, options: AggregationOptions): any;
	static sum(rows: any[], getValue: (row: any) => any, options: AggregationOptions): any;
	static join(rows: any[], getValue: (row: any) => any, options: AggregationOptions): any;
	static count(rows: any[], getValue: (row: any) => any, options: AggregationOptions): any;
}

declare class DataColumnModel extends ColumnModel {
	isDefault?: boolean;
	aggregation?: Aggregation;
	aggregationOptions?: AggregationOptions;
}

declare class ArrayColumnModel extends DataColumnModel {
	itemType: string;
	itemFormat: string;
}

declare class ArrayColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class BoolColumnModel extends DataColumnModel {
	trueValue?: any;
	falseValue?: any;
	isIndeterminate?: (x: any) => boolean;
	isChecked?: (x: any) => boolean;
}

declare class BoolColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class CohortColumnModel extends ColumnModel {
}

declare class CohortColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class CurrencyColumnModel extends DataColumnModel {
	symbol?: string;
	code?: string;
	maxLength?: number;
}

declare class CurrencyColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class DateColumnModel extends DataColumnModel {
	format?: string;
}

declare class DateColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class DateTimeColumnModel extends DataColumnModel {
	format?: string;
	dateFormat?: string;
	timeFormat?: string;
}

declare class DateTimeColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class EmailColumnModel extends DataColumnModel {
}

declare class EmailColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class FileColumnModel extends DataColumnModel {
	canUpload?: () => boolean;
	hasPreview?: (name: string) => boolean;
}

declare class FileColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class FilterRowColumnModel extends ColumnModel {
	model: ColumnModel;
}

declare class FilterRowColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class GroupColumnModel extends ColumnModel {
	by?: string;
}

declare class GroupColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class GroupSummaryColumnModel extends DataColumnModel {
}

declare class GroupSummaryColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class IdColumnModel extends DataColumnModel {
}

declare class IdColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class ImageColumnModel extends DataColumnModel {
	canUpload?: () => boolean;
	hasPreview?: (name: string) => boolean;
}

declare class ImageColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class NumberColumnModel extends DataColumnModel {
	format?: string;
}

declare class NumberColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class PadColumnModel extends ColumnModel {
}

declare class PadColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class PasswordColumnModel extends DataColumnModel {
}

declare class PasswordColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class PivotColumnModel extends ColumnModel {
}

declare class PivotColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class ReferenceColumnModel extends DataColumnModel {
}

declare class ReferenceColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class RowDetailsColumnModel extends ColumnModel {
}

declare class RowDetailsColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class RowExpandColumnModel extends ColumnModel {
}

declare class RowExpandColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class RowIndicatorColumnModel extends ColumnModel {
}

declare class RowIndicatorColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class RowNumberColumnModel extends ColumnModel {
}

declare class RowNumberColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class RowOptionsColumnModel extends DataColumnModel {
}

declare class RowOptionsColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class SelectColumnModel extends ColumnModel {
}

declare class SelectColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class TextColumnModel extends DataColumnModel {
	maxLength?: number;
}

declare class TextColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class TimeColumnModel extends DataColumnModel {
	format?: string;
}

declare class TimeColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare class UrlColumnModel extends DataColumnModel {
}

declare class UrlColumn extends ColumnView {
	constructor(model: ColumnModel);
}

declare function columnFactory(model: Model): (type: string, body?: any) => ColumnView;

declare function mapColumns(columns: ColumnModel[]): { [key: string]: ColumnModel };
declare function getCellValue(column: ColumnModel): string;
declare function findColumn(columns: ColumnModel[], key: string): ColumnModel;
declare function findIndex(columns: ColumnModel[], key: string): number;
declare function lineView(columnRows: ColumnView[]): string;
declare function widthFactory(table: Table, form: Map<string, any>): number;

declare function flattenColumns(columns: ColumnModel[]): ColumnModel[];
declare function findLine(columns: ColumnModel[], key: string): { columns: ColumnModel[], index: number } | null;

declare class TableCommandManager extends CommandManager {
	constructor(
		apply: (f: () => {}) => void,
		table: Table
	);
}

declare const GRID_PREFIX = 'q-grid';

declare function tableFactory(model: Model, layerFactory: (name: string) => any): Table;

interface Position {
	x: number;
	y: number;
	rect: Rect;
}

declare class DragService {
	static data: any;
	static area: string;
	static element: HTMLElement;
	static startPosition: Position;

	static readonly mimeType: string;
	static decode(source: string): any;
	static encode(source: any): string;
}

declare class EditService {
	constructor(plugin: GridPlugin);

	startBatch(startCell: CellView): () => void;
}

declare class EventManager {
	constructor(context: any, apply?: Function);

	bind(f: (arg: any) => void): (...args: any[]) => any;
}

declare class EventListener {
	constructor(element: Element | Document | Window, manager: EventManager);

	on(name: string, f: (arg: any) => void, settings?: any): () => void;
	off(): void;
}

declare class CsvExport {
	write(rows: any[], columns: ColumnModel[]): string;
}

declare function graphFlatView(graph: { [key: string]: any }, separator: string): { [key: string]: any };

interface JsonOptions {
	structure: string;
}

declare class JsonExport {
	write(rows: any[], columns: ColumnModel[], options?: JsonOptions): string;
}

declare class XmlExport {
	write(rows: any[], columns: ColumnModel[]): string;
}

interface Expression {
	kind: string;
	op: string;
	left: Expression | string;
	right: Expression | any;
}

declare function buildExpression(filterBy: { [key: string]: any }, op: string): Expression;

declare class Visitor {
	constructor();

	visit(item: Expression, depth?: number): any;
	visitGroup(group: Expression, depth: number): any;
	visitCondition(condition: Expression, depth: number): any;
	visitUnary(condition: Expression): any;
	visitBinary(condition: Expression, depth: number): any;
	visitLeft(left: Expression): any;
	visitBetween(condition: Expression, depth: number): any;
	visitIn(condition: Expression, depth: number): any;
	visitFunction(item: Expression, depth: number): any;
	visitArguments(args: any[]): any;
}

declare class MarkupVisitor extends Visitor {
	constructor(
		label: (key: string) => string,
		type: (key: string) => string,
		isValid: (key: string, value: any) => boolean
	);
}

declare class FocusService {
    constructor(model: Model);

    activate(rowIndex?: number, columnIndex?: number);
}

declare class FocusAfterRenderService {
    constructor(plugin: GridPlugin);
}

declare class FormatService {
    static number(x: number, format: string): string;
    static date(x: Date, format: string): string;
    static currency(x: number, format: string): string;
}

declare class GridHost {
	constructor(
		element: HTMLElement,
		plugin: GridPlugin
	);

	keyDown(e: any, source?: string): string[];
	keyUp(e: any, source?: string): string[];
	invalidateActive(): void;
}

declare class HeadHost {
	constructor(plugin: GridPlugin);

	mouseMove(e: MouseEvent);
	mouseLeave(e: MouseEvent);
}

declare class Composite {
	static func<T, A>(list: ((...args) => T)[], reducer?: (A, T) => A, memo?: A): (...args) => A;
	static command(list: Command[]): Command;
	static list(list: any[]): any[];
	static object(list: any[], memo: any): any;
}

declare class DeferPromise<T> {
	catch(handler: () => void): DeferPromise<T>;
	then(handler: (value: T) => void): DeferPromise<T>;
}

declare class Defer<T> {
	promise: DeferPromise<T>;
	reject(): void;
	resolve(value: T): void;
}

declare class GridError extends Error {
	constructor(name: string, message: string);

	name: string;
}

declare class Fetch {
	constructor(select: any);

	busy: Promise<any>;
	result: any;

	run(item?: any): () => void;
}

declare class Guard {
	static notUndefined(value: any, name: string): void;
	static notNull(value: any, name: string): void;
	static notNullOrEmpty(value: string, name: string): void;
	static invokable(value: any, name: string): void;
	static hasProperty(instance: any, key: string | number | Symbol): void;
}

declare class Lazy<T> {
	constructor(build: () => T);

	get instance(): T;
}

declare class Log {
	constructor();

	static info(source: string, message: string): void;
	static warn(source: string, message: string): void;
	static error(source: string, message: (string | Error)): void;
}

declare class Keyboard {
	static isPrintable(code: string): boolean;
	static isControl(code: string): boolean;
	static stringify(code: string, key: string): string;
	static translate(code: number): string;
}

declare class ModelBuilder {
	register<T>(key: string, ctor: T): ModelBuilder;
	build(): Model;
}

declare const NO_BUTTON: number;
declare const LEFT_BUTTON: number;
declare const MIDDLE_BUTTON: number;
declare const RIGHT_BUTTON: number;

declare function selectRow(state: NavigationState): any;
declare function selectColumn(state: NavigationState): ColumnModel;
declare function selectRowIndex(state: NavigationState): number;
declare function selectColumnIndex(state: NavigationState): number;

declare function preOrderDFS(nodes: Node$1[], visit: (node: Node$1, memo: any, parent: Node$1 | null, index: number) => any, memo: any): any;
declare function findLeaves(node: Node$1): Node$1[];
declare function findNode(node: Node$1, test: (node: Node$1) => boolean): { node: Node$1, parent: Node$1, index: number, path: Node$1[] } | null;
declare function calk(node: Node$1): Node$1;
declare function bend(line: Node$1[]): Node$1;
declare function filterNode(node: Node$1, test: (node: Node$1) => boolean): Node$1;

declare class PersistenceService {
	constructor(model: Model, createDefaultModel: () => Model);

	save(settings?: { [key: string]: string[] }): { [key: string]: any };
	load(model: { [key: string]: any }, settings?: { [key: string]: string[] }): void;
	reset(settings?: { [key: string]: string[] }): { [key: string]: any };
}

declare class Pipe {
	static readonly data: RowsPipe;
	static readonly filter: RowsPipe;
	static readonly pagination: RowsPipe;
	static readonly sort: RowsPipe;
	static readonly memo: MemoPipe<any[]>;
	static readonly group: MemoPipe<PipeFolder>;
	static readonly pivot: MemoPipe<PipeFolder>;
	static readonly column: MemoPipe<PipeFolder>;
	static readonly columnIndex: MemoPipe<PipeFolder>;
	static readonly animation: MemoPipe<PipeFolder>;
	static readonly view: MemoPipe<PipeFolder>;
	static readonly scene: MemoPipe<PipeFolder>;
}

declare class Resource {
	constructor(data?: any, scope?: any);

	data: any;
	scope: any;
}

declare class RowDetails {
	constructor(item: any, column: ColumnModel);

	item: any;
	column: ColumnModel;
}

declare function flatView(model: Model, mode: RowStateMode): any[];

declare function toggleStatus(rows: any[], status: Map<any, RowDetailsStatus>, mode: RowStateMode):
	Map<any, RowDetailsStatus>;

declare function invalidateStatus(rows: any[], status: Map<any, RowDetailsStatus>, mode: RowStateMode):
	Map<any, RowDetailsStatus>;

declare function takeOnce<T>(): OperatorFunctionLike<T, T>;
declare function filter<T>(test: (x: T) => boolean): OperatorFunctionLike<T, T>;

declare class SelectionService {
	constructor(model: Model);

	lookup(items: any[], unit?: string): any[];
	map(entries: any[]): any[];
	keyFactory<K>(unit: string): (any) => K;
	hashFactory(): (key: string) => any;
}

declare function parseFactory<V>(type: string, editor?: string): (v: any) => V;
declare function compareParseFactory<V>(type: string, editor?: string): (v: any) => V;
declare function getType(value: any): string;
declare function inferType(value: any[]): string;
declare function resolveType(value: any[]): string;
declare function isPrimitive(type: string): boolean;

declare function css(element: HTMLElement, property: string, value: string): string;
declare function elementFromPoint(x: number, y: number): HTMLElement;
declare function eventPath(event: MouseEvent | KeyboardEvent): HTMLElement[];
declare function parents(element: HTMLElement): HTMLElement[];

declare class Fastdom {
    static mutate: (task: () => void) => any;
    static measure: (task: () => void) => any;
    static clear(token: any);
    static invoke: (task: () => void) => any;
}

declare function guid(): string;

declare function jobLine(delay: number): (job: () => void) => Promise<void>;

declare namespace jobLine {
	function run(job: any, delay: number): Defer<any>;
}

declare function getLabel(row: any, column: ColumnModel): any;
declare function setLabel(row: any, column: ColumnModel, label: any): void;
declare function getLabelFactory(column: ColumnModel): (row: any) => any;

declare function stringifyFactory(property: string): (model: any) => string;

declare function predicateFactory(search: any): (item: any) => boolean;

declare function getValue(row: any, column: ColumnModel): any;
declare function setValue(row: any, column: ColumnModel, value: any): void;
declare function getValueFactory(column: ColumnModel): (row: any) => any;

declare function assignWith(x: any, y: any): any;
declare function noop(): void;
declare function yes(): boolean;
declare function no(): boolean;
declare function identity<T>(x: T): T;
declare function toCamelCase(...names: string[]): string;
declare function escapeRegexp(text: string): string;
declare function orderBy(data: any[], selectors: ((x: any) => any)[], compares: ((x: any, y: any) => number)[]): void;
declare function htmlEncode(text: string): string;
declare function startCase(text: string): string;
declare function uniq<T>(collection: Array<T>): Array<T>;

declare function max<T>(collection: Array<T>): T | undefined;
declare function isUndefined(value: any): boolean;
declare function isNumber(value: any): boolean;
declare function isArray(value: any): boolean;
declare function isFunction(value: any): boolean;
declare function isObject(value: any): boolean;
declare function isString(value: any): boolean;
declare function isImage(value: any): boolean;
declare function isUrl(value: any): boolean;
declare function isEmail(value: string): boolean;
declare function isDate(value: any): boolean;
declare function clone(value: any): any;
declare function cloneDeep(value: any): any;
declare function flatten<T>(collection: Array<Array<T>>): T[];
declare function binarySearch<T>(list: Array<any>, value: any): number;
declare function getTypeName(ctor: new () => any): string;

declare interface Validator {
	validate(value: any): boolean;
	getErrors(): Array<string>;
}

declare function hasRules(rules: any, key: string): boolean;
declare function createValidator(rules: any, key?: string): Validator;

declare function viewFactory(
	plugin: GridPlugin,
	commandManager: CommandManager,
	vscroll: any,
	selectors: any
): (host: any) => void;

declare class ViewHost {
	constructor(plugin: GridPlugin);

	invalidate(): void;

	mouseDown(e: MouseEvent);
	mouseUp(e: MouseEvent);

	mouseMove(e: MouseEvent);

	mouseEnter(e: MouseEvent);
	mouseLeave(e: MouseEvent);
}

export { Action, Aggregation, ArrayColumn, ArrayColumnModel, Bag, BodyHost, BodyLet, BoolColumn, BoolColumnModel, Box, BoxHost, Cell, CellEditor, CellView, ClipboardLet, CohortColumn, CohortColumnModel, ColumnListHost, ColumnListState, ColumnListStateGeneration, ColumnListStateTypeDetection, ColumnModel, ColumnModelCategory, ColumnModelPin, ColumnModelType, ColumnModelWidthMode, ColumnView, Command, CommandManager, Composite, CsvExport, CurrencyColumn, CurrencyColumnModel, Data, DataColumnModel, DataState, DateColumn, DateColumnModel, DateTimeColumn, DateTimeColumnModel, Defer, Disposable, DisposableResource, DragService, EditLet, EditService, EditState, EditStateMethod, EditStateMode, EditorOptions, EmailColumn, EmailColumnModel, Event, EventListener, EventManager, Expression, Fastdom, Fetch, FetchContext, FileColumn, FileColumnModel, FilterLet, FilterRowColumn, FilterRowColumnModel, FilterState, FilterStateFetch, FilterStateMatch, FilterStatePredicate, FilterStateUnit, FocusAfterRenderService, FocusService, FootLet, FormatService, GRID_PREFIX, GridError, GridHost, GridLet, GridPlugin, GridService, GridState, GridStateInteractionMode, GroupColumn, GroupColumnModel, GroupLet, GroupState, GroupStateMode, GroupStateSummary, GroupSummaryColumn, GroupSummaryColumnModel, Guard, HeadHost, HeadLet, HighlightLet, IVscrollContainer, IVscrollContext, IVscrollSettings, IdColumn, IdColumnModel, ImageColumn, ImageColumnModel, JsonExport, Keyboard, LEFT_BUTTON, LayoutLet, Lazy, Log, MIDDLE_BUTTON, Markup, MarkupVisitor, MemoPipe, Model, ModelBuilder, ModelChanges, ModelEvent, ModelEventArg, ModelTag, NO_BUTTON, NavigationLet, NavigationState, Node$1 as Node, NumberColumn, NumberColumnModel, ObservableEvent, ObservableLike, ObservableReplyEvent, ObserverLike, OperatorFunctionLike, PadColumn, PadColumnModel, PaginationLet, PaginationState, PaginationStateMode, PasswordColumn, PasswordColumnModel, PersistenceSchedule, PersistenceService, PersistenceState, PersistenceStorage, Pipe, PipeCallback, PipeContext, PipeFolder, PipePivot, PipeUnit, PipeUnitWhy, PivotColumn, PivotColumnModel, PivotState, RIGHT_BUTTON, ReferenceColumn, ReferenceColumnModel, Resource, RestState, Row, RowDetails, RowDetailsColumn, RowDetailsColumnModel, RowDetailsLet, RowDetailsStatus, RowEditor, RowExpandColumn, RowExpandColumnModel, RowIndicatorColumn, RowIndicatorColumnModel, RowLet, RowNumberColumn, RowNumberColumnModel, RowOptionsColumn, RowOptionsColumnModel, RowState, RowStateMode, RowStateUnit, RowsPipe, ScrollLet, ScrollState, ScrollStateMode, SelectColumn, SelectColumnModel, SelectionLet, SelectionService, SelectionState, SelectionStateArea, SelectionStateMode, SelectionStateUnit, Shortcut, ShortcutDispatcher, SortLet, SortState, SortStateDirection, SortStateMode, Storage, StyleCellCallback, StyleCellContext, StyleLet, StyleRowCallback, StyleRowContext, StyleState, SubjectLike, SubscribableLike, Table, TableCommandManager, Td, TextColumn, TextColumnModel, TimeColumn, TimeColumnModel, Tr, UnaryFunctionLike, UnsubscribableLike, UrlColumn, UrlColumnModel, Validator, View, ViewHost, VisibilityState, XmlExport, assignWith, bend, binarySearch, bodyCellClassifier, buildExpression, calk, clone, cloneDeep, columnFactory, compareParseFactory, createValidator, css, deserialize, elementFromPoint, escapeRegexp, eventPath, filter, filterNode, findColumn, findIndex, findLeaves, findLine, findNode, flatView, flatten, flattenColumns, generate, generateFactory, getCellValue, getLabel, getLabelFactory, getType, getTypeName, getValue, getValueFactory, graphFlatView, guid, hasRules, headCellClassifier, htmlEncode, identity, inferType, invalidateStatus, isArray, isDate, isEmail, isFunction, isImage, isNumber, isObject, isPrimitive, isString, isUndefined, isUrl, jobLine, lineView, mapColumns, max, no, noop, orderBy, parents, parseFactory, preOrderDFS, predicateFactory, resolveType, selectColumn, selectColumnIndex, selectRow, selectRowIndex, serialize, setLabel, setValue, startCase, stringifyFactory, tableFactory, takeOnce, toCamelCase, toggleStatus, uniq, viewFactory, widthFactory, yes };
