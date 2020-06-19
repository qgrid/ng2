import { CommandPalette } from '@qgrid/core/command/command.palette';
import { Disposable } from '../infrastructure/disposable';
import { DomTable } from '../dom/dom';
import { Event } from '@qgrid/core/event/event';
import { Grid, GridService } from '../grid/grid';
import { GridLet } from '@qgrid/core/grid/grid.let';
import { GridLet as NgxGridLet } from '../grid/grid-let';
import { GridModel } from '../grid/grid-model';
import { GridRoot } from '../grid/grid-root';
import { Injectable, OnDestroy } from '@angular/core';
import { Lazy } from '@qgrid/core/infrastructure/lazy';
import { ObservableLike, ObservableEvent, ObservableReplyEvent } from '@qgrid/core/rx/rx';
import { ShortcutService } from '../shortcut/shortcut.service';

@Injectable()
export class GridPlugin implements OnDestroy {
	private commandPaletteLazy = new Lazy(() => new CommandPalette(this.model, this.shortcutService.shortcut));

	readonly disposable = new Disposable();

	readonly observe = <TState>(event: Event<TState>): ObservableLike<TState> => {
		return new ObservableEvent(event, this.disposable);
	}

	readonly observeReply = <TState>(event: Event<TState>): ObservableLike<TState> => {
		return new ObservableReplyEvent(event, this.disposable);
	}

	constructor(
		private $view: NgxGridLet,
		private $root: GridRoot,
		private shortcutService: ShortcutService,
	) {
	}

	get model(): GridModel {
		const { model } = this.$root;
		return model;
	}

	get view(): GridLet {
		return this.$view;
	}

	get table(): DomTable {
		const { table } = this.$root;
		return table;
	}

	get commandPalette(): CommandPalette {
		return this.commandPaletteLazy.instance;
	}

	ngOnDestroy() {
		this.disposable.finalize();
	}
}
