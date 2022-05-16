import * as css from '../services/css';

export class StyleEntry {
  constructor(element, sheets, markDirty) {
    this.element = element;
    this.list = new Set();
    this.sheets = sheets;
    this.markDirty = markDirty;
  }

  class(key, style) {
    key = css.escape(key);
    this.list.add(key);
    this.markDirty(this);
    if (style) {
      const sheets = this.sheets;
      if (!sheets.has(key)) {
        sheets.set(key, style);
      }
    }
  }
}

export class StyleMonitor {
  constructor(model) {
    this.model = model;
    this.entries = new Set();
    this.newSheets = new Map();
    this.oldSheets = new Map();
  }

  enter() {
    const newSheets = this.newSheets;
    let entries = this.entries;
    for (const entry of entries) {
      for (const cls of entry.list) {
        entry.element.removeClass(cls, true);
      }
    }

    entries = this.entries = new Set();
    const markDirty = entry => entries.add(entry);

    return element => {
      const entry = new StyleEntry(element, newSheets, markDirty);
      return entry.class.bind(entry);
    };
  }

  exit() {
    const entries = this.entries;
    for (const entry of entries) {
      for (const cls of entry.list) {
        entry.element.addClass(cls, true);
      }
    }

    const newSheets = this.newSheets;
    const oldSheets = this.oldSheets;
    const id = this.model.grid().id;
    for (const cls of oldSheets.keys()) {
      if (!newSheets.has(cls)) {
        const sheet = css.sheet(id, cls);
        sheet.remove();
      }
    }

    for (const [cls, style] of newSheets.entries()) {
      if (!oldSheets.has(cls)) {
        const sheet = css.sheet(id, cls);
        sheet.set({ [`.${cls}`]: style });
      }
    }

    this.oldSheets = newSheets;
    this.newSheets = new Map();
  }
}
