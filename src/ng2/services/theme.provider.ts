import {Injectable} from '@angular/core';
import {TemplateCacheService} from './template-cache.service';
import AppError from 'core/infrastructure/error';
import {ThemeService} from './theme.service';

@Injectable()
export class ThemeProvider {
  private themes: Map<string, () => (string) => void> = new Map();
  private themeService: ThemeService = null;

  constructor(private cache: TemplateCacheService) {
    this.themeService = new ThemeService(this.themes, this.cache);
  }

  register(theme, apply) {
    // TODO: add exception if theme is not found
    if (this.themes.has(theme)) {
      throw new AppError('qgrid.service', `Theme '${theme}' was registered already'`);
    }

    this.themes.set(theme, apply);
  }

  service() {
    return this.themeService;
  }
}
