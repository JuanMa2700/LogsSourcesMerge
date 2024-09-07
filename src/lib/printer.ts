import * as _ from "lodash";
import { LogEntryType } from "./log-source";

export interface PrinterType {
  last: Date;
  logsPrinted: number;
  startTime: Date;
  print: (log: LogEntryType) => void;
  done: () => void;
}

export default class Printer {
  last: Date;
  logsPrinted: number;
  startTime: Date;

  constructor() {
    this.last = new Date(0);
    this.logsPrinted = 0;
    this.startTime = new Date();
  }

  print(log: LogEntryType) {
    if (!_.isDate(log.date)) {
      throw new Error(log.date + " is not a date");
    }
    if (log.date >= this.last) {
      console.log(log.date, log.msg);
    } else {
      throw new Error(log.date + " is not greater than " + this.last);
    }
    this.last = log.date;
    this.logsPrinted++;
    if (this.logsPrinted === 1) {
      this.startTime = new Date();
    }
  }

  done() {
    var timeTaken = (new Date().getTime() - this.startTime.getTime()) / 1000;
    console.log("\n***********************************");
    console.log("Logs printed:\t\t", this.logsPrinted);
    console.log("Time taken (s):\t\t", timeTaken);
    console.log("Logs/s:\t\t\t", this.logsPrinted / timeTaken);
    console.log("***********************************\n");
  }
}
