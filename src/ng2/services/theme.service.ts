import Event from 'core/infrastructure/event';
import {TemplateCacheService} from './template-cache.service';
import AppError from 'core/infrastructure/error';

const DEFAULT_THEME = 'default';

export class ThemeService {
  changed = new Event();
  private themeName = '';

  constructor(private themes: Map<string, (any) => (TemplateCacheService) => void>, private cache: TemplateCacheService) {
    this.name = DEFAULT_THEME;
  }

  get name(): string {
    return this.themeName;
  }

  set name(value: string) {
    if (value !== this.themeName) {
      const oldName = this.themeName;
      const apply = this.themes.get(value);
      if (!apply) {
        throw new AppError('theme.service', `Can't find constructor for theme '${value}'`);
      }

      this.themeName = value;

      apply(this.cache);

      this.changed.emit({
        newValue: value,
        oldValue: oldName
      });
    }
  }
}
