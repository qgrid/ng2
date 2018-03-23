import { Injectable } from '@angular/core';
import { VscrollContainer } from './vscroll.container';
import { VscrollSettings } from './vscroll.settings';

export class VscrollContext {
	settings = new VscrollSettings(() => this.container.total);
	container = new VscrollContainer(this.settings);

	constructor() {
	}
}
