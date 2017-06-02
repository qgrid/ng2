import {Layer} from './layer';

export class LayerService {
  constructor(private markup: any) {
  }

  create(name) {
    const markup = this.markup;
    // const node = markup.document.createElement(`div`);
    // node.classList.add(name);
    // node.classList.add(`${GRID_PREFIX}-layer`)
    // markup.view.appendChild(node);
    //
    // const ctrl = angular.element(markup.view).controller(VIEW_CORE_NAME);
    // if (!ctrl) {
    //   throw new AppError('box', 'Controller for box is not found')
    // }
    //
    // if (!ctrl.$scope) {
    //   throw new AppError('box', 'Controller scope for box is not found')
    // }

    return new Layer();
  }
}
