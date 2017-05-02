import {Injectable} from '@angular/core';
import Event from 'core/infrastructure/event';
import {ThemeProvider} from "./theme.provider";
import {TemplateCacheService} from "./template-cache.service";

@Injectable()
export class ThemeService {
  changed = new Event();
  private themeName = '';

  constructor(private themeProvider: ThemeProvider, private cache: TemplateCacheService) {
  }

  get name(): string {
    return this.themeName;
  }

  set name(value: string) {
    if (value !== this.themeName) {
      const oldName = this.themeName;
      const apply = this.themeProvider.get(value);
      this.themeName = value;

      apply(this.cache);

      this.changed.emit({
        newValue: value,
        oldValue: oldName
      });
    }
  }
}
