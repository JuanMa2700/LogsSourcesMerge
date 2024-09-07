"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const Faker = require("Faker");
const P = require("bluebird");
class LogSource {
    constructor() {
        this.drained = false;
        this.last = {
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * _.random(40, 60)),
            msg: Faker.Company.catchPhrase(),
        };
    }
    getNextPseudoRandomEntry() {
        return {
            date: new Date(this.last.date.getTime() +
                1000 * 60 * 60 * _.random(10) +
                _.random(1000 * 60)),
            msg: Faker.Company.catchPhrase(),
        };
    }
    pop() {
        this.last = this.getNextPseudoRandomEntry();
        if (this.last.date > new Date()) {
            this.drained = true;
        }
        return this.drained ? false : this.last;
    }
    popAsync() {
        this.last = this.getNextPseudoRandomEntry();
        if (this.last.date > new Date()) {
            this.drained = true;
        }
        return P.delay(_.random(8)).then(() => (this.drained ? false : this.last));
    }
}
exports.default = LogSource;
