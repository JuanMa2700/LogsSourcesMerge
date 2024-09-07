"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
class Printer {
    constructor() {
        this.last = new Date(0);
        this.logsPrinted = 0;
        this.startTime = new Date();
    }
    print(log) {
        if (!_.isDate(log.date)) {
            throw new Error(log.date + " is not a date");
        }
        if (log.date >= this.last) {
            console.log(log.date, log.msg);
        }
        else {
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
exports.default = Printer;
