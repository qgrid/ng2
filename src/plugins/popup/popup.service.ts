import {Injectable} from '@angular/core';
import {AppError} from '@grid/core/infrastructure';
import {Model} from '@grid/core/infrastructure/model';
import Popup from '@grid/plugins/popup/popup.entry';

export interface IOffset {
  left: number;
  top: number;
}

export interface ITarget {
  offset: () => IOffset;
  height: () => number;
  width: () => number;
}

export interface IPopupSettings {
  height: any;
  width: any;
  offsetTop: any;
  offsetLeft: any;
  target: any;
  id: string;
}

@Injectable()
export default class PopupService {

  constructor(private popups: Popup[]) {
  }

  public close(id: string): void {
    if (!this.isOpened(id)) {
      throw new AppError('popup.service', `Can't close popup '${id}', it's not opened`);
    }
    const item = this.popups[id];

    delete this.popups[id];
    item.close();
  }

  public isOpened(id: string): boolean {
    return this.popups.hasOwnProperty(id);
  }

  public closeAll(): void {
    for (let key of Object.keys(this.popups)) {
      this.close(key);
    }
  }

  private createPopup(): HTMLElement {
    // const popup = angular.element('<q-grid:popup-panel id="id" model="model"></q-grid:popup-panel>');
    // eslint-disable-line no-undef
    // this.popups[settings.id] = new PopupEntry(popup, settings, this.$document[0].body);
    //
    // this.$document[0].body.appendChild(popup[0]);
    // this.$compile(popup)(popupScope);
    return null;
  }

  private createScope(): object {
    // this.$rootScope.$new(false, scope);
    return null;
  }

  private getWindowWidth(): number {
    // this.$window.innerWidth;
    return null;
  }

  private getWindowHeight(): number {
    // this.$window.innerHeight;
    return null;
  }

  private getWindowInnerWidth(): number {
    // this.$window.innerWidth
    return null;
  }

  private getWindowInnerHeight(): number {
    // this.$window.innerHeight
    return null;
  }

  public open(settings: IPopupSettings, model: Model, scope: object): void {
    if (this.popups.hasOwnProperty(settings.id)) {
      return;
    }

    const target = this.targetize(settings);
    const pos = this.position(target, settings);
    const popupScope = this.createScope();

    // popupScope.model = model;
    // popupScope.id = settings.id;

    const popup = this.createPopup();

    // popup.attr('id', settings.id);
    // popup.css({left: pos.left + 'px', top: pos.top + 'px', zIndex: 79});

    // if (settings.resizable) {
    //   popup.addClass('resizable');
    // }
    //
    // if (settings.collapsible) {
    //   popup.addClass('collapsible');
    // }
    //
    // if (settings.cls) {
    //   popup.addClass(settings.cls);
    // }
    //
    // this.popups[settings.id].focus();
  }

  public expand(id: string): void {
    const item = this.popups[id];
    item.expand();
  }

  public collapse(id: string): void {
    const item = self.popups[id];
    item.collapse();
  }

  public focus(id: string): void {
    for (let [, popup] of this.popups) {
      popup.unfocus();
    }

    const popup = this.popups[id];
    popup.focus();
  }

  public resize(id: string, settings: IPopupSettings): void {
    const item = this.popups[id];
    item.resize(settings);
  }

  public targetize(settings: IPopupSettings): ITarget {
    const target = settings.target;
    if (!target) {
      return {
        offset: () => {
          return {
            left: (this.getWindowInnerWidth()) / 2,
            top: (this.getWindowInnerHeight() - (parseInt(settings.height) || 0)) / 2
          };
        },
        height: () => {
          return 500;
        },
        width: () => {
          return 400;
        }
      };
    }

    const rect = target.getBoundingClientRect();
    return {
      offset: () => ({
        left: rect.left,
        top: rect.top
      }),
      height: () => target.clientHeight,
      width: () => target.clientWidth
    };
  }

  public position(target: ITarget, settings: IPopupSettings): IOffset {
    const dy = parseInt(settings.offsetTop) || 0;
    const dx = parseInt(settings.offsetLeft) || 0;
    const w = this.getWindowWidth();
    const h = this.getWindowHeight();
    const p = target.offset();
    const x = p.left;
    const y = p.top;
    const eh = parseInt(settings.height) || target.height();
    const ew = parseInt(settings.width) || target.width();
    const eh2 = eh / 2;
    const ew2 = ew / 2;
    const gtx1 = x + ew2 > w;
    const ltx0 = x - ew2 < 0;
    const gty1 = y + eh > h;
    const lty0 = y - eh < 0;
    const l = ltx0 && gtx1
      ? w / 2 - ew2
      : gtx1
        ? x - ew - dx
        : ltx0
          ? x + dx
          : x - ew2 + dx;
    const t = lty0 && gty1
      ? h / 2 - eh2
      : gty1
        ? y - eh - dy
        : lty0
          ? y + dy
          : y + dy;

    return {
      left: l,
      top: t
    };
  }

  public get(id: string): any {
    return this.popups[id];
  }
}
