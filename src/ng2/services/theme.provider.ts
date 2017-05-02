import {Injectable} from '@angular/core';
import {TemplateCacheService} from './template-cache.service';
import AppError from 'core/infrastructure/error';

@Injectable()
export class ThemeProvider {
  private themes: Map<string, () => (string) => void> = new Map();

  constructor() {
  }

  register(theme, apply) {
    // TODO: add exception if theme is not found
    if (this.themes.has(theme)) {
      throw new AppError('qgrid.service', `Theme '${theme}' was registered already'`);
    }

    this.themes.set(theme, apply);
  }

  get(theme): (TemplateCacheService) => void {
    if (!this.themes.has(theme)) {
      throw new AppError('theme.service', `Can't find theme '${theme}'`);
    }

    return this.themes.get(theme);
  }
}
