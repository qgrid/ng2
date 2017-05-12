import {Element, ElementCore} from './element';

class LayerCore extends ElementCore {
  resource() {
  }
}

const empty = new LayerCore();

export class Layer extends Element {
  constructor(protected element: HTMLElement) {
    super(element);
  }

  static get empty() {
    return empty;
  }

  resource(id, state) {
    // const link = this.template.link(
    //   `qgrid.${id}.tpl.html`,
    //   state,
    //   [id]
    // );
    //
    // const $element = angular.element(this.element);
    // this.$layerScope = this.$scope.$new();
    // link($element, this.$layerScope);
  }

  destroy() {
    // if (this.$layerScope) {
    //   this.$layerScope.$destroy();
    //   this.$layerScope = null;
    // }
  }
}


