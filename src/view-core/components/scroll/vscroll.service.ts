function factory(settings) {
  return {
    settings: {},
    container: {
      reset: () => {
      },
      apply: () => {
      }
    }
  }
}

export class VScrollService {
  get factory() {
    return factory;
  }
}
