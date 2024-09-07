"use strict";

const _ = require("lodash");
const Faker = require("Faker");
const P = require("bluebird");

/*
    We don't like OOP - in fact - we despise it!

    However, most real world implementations of something like a log source
    will be in OO form - therefore - we simulate that interaction here.
*/

export interface LogEntryType {
  date: Date;
  msg: string;
  sourceIndex?: number;
}

export interface LogSourceType {
  drained: boolean;
  last: LogEntryType;
  getNextPseudoRandomEntry: () => LogEntryType;
  pop: () => LogEntryType | boolean;
  popAsync: () => Promise<LogEntryType | boolean>;
}

export default class LogSource implements LogSourceType {
  drained: boolean;
  last: LogEntryType;

  constructor() {
    this.drained = false;
    this.last = {
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * _.random(40, 60)),
      msg: Faker.Company.catchPhrase(),
    };
  }

  getNextPseudoRandomEntry(): LogEntryType {
    return {
      date: new Date(
        this.last.date.getTime() +
          1000 * 60 * 60 * _.random(10) +
          _.random(1000 * 60)
      ),
      msg: Faker.Company.catchPhrase(),
    };
  }

  pop(): LogEntryType | boolean {
    this.last = this.getNextPseudoRandomEntry();
    if (this.last.date > new Date()) {
      this.drained = true;
    }
    return this.drained ? false : this.last;
  }

  popAsync(): Promise<LogEntryType | boolean> {
    this.last = this.getNextPseudoRandomEntry();
    if (this.last.date > new Date()) {
      this.drained = true;
    }
    return P.delay(_.random(8)).then(() => (this.drained ? false : this.last));
  }
}
