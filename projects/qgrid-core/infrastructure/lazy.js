export class Lazy {
    constructor(build) {
        this.build = build;
    }

    get instance() {
        return this.value || (this.value = this.build());
    }
}