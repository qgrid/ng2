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
                            return (...args) => disposes.push(event[key](...args));
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
        const temp = Array.from(this.disposes);		
		for (let dispose of temp) {
			dispose();
		}
    }
}