import { Guard } from './guard';

export class ModelProxy {
    constructor(model) {
        const disposes = this.disposes = [];

        const modelHandler = {
            get: (target, key) => {
                Guard.hasProperty(target, key);

                if (key.endsWith('Changed')) {
                    const eventHandler = {
                        get: (event, key) => {
                            return (...args) => {
                                const off = event[key](...args);
                                disposes.push(off);
                                return () => {
                                    off();
                                    const index = disposes.indexOf(off);
                                    if (index >= 0) {
                                        disposes.splice(index, 1);
                                    }
                                };
                            }
                        }
                    };

                    return new Proxy(target[key], eventHandler);
                }

                return target[key];
            }
        };

        this.subject = new Proxy(model, modelHandler);
    }

    dispose() {
        const temp = this.disposes;
        this.disposes = [];
        for (let dispose of temp) {
            dispose();
        }
    }
}