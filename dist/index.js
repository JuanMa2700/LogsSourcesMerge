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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_source_1 = __importDefault(require("./lib/log-source"));
const printer_1 = __importDefault(require("./lib/printer"));
function runSolutions(sourceCount) {
    return new Promise(async (resolve, reject) => {
        /**
         * Challenge Number 1!
         *
         * Assume that a LogSource only has one method: pop() which will return a LogEntry.
         *
         * A LogEntry is simply an object of the form:
         * {
         * 		date: Date,
         * 		msg: String,
         * }
         *
         * All LogEntries from a given LogSource are guaranteed to be popped in chronological order.
         * Eventually a LogSource will end and return boolean false.
         *
         * Your job is simple: print the sorted merge of all LogEntries across `n` LogSources.
         *
         * Call `printer.print(logEntry)` to print each entry of the merged output as they are ready.
         * This function will ensure that what you print is in fact in chronological order.
         * Call 'printer.done()' at the end to get a few stats on your solution!
         */
        const syncLogSources = [];
        for (let i = 0; i < sourceCount; i++) {
            syncLogSources.push(new log_source_1.default());
        }
        try {
            const syncSortedMerge = await Promise.resolve().then(() => __importStar(require("./solution/sync-sorted-merge")));
            syncSortedMerge.default(syncLogSources, new printer_1.default());
            resolve(true);
        }
        catch (e) {
            reject(e);
        }
    }).then(() => {
        return new Promise(async (resolve, reject) => {
            /**
             * Challenge Number 2!
             *
             * Similar to Challenge Number 1, except now you should assume that a LogSource
             * has only one method: popAsync() which returns a promise that resolves with a LogEntry,
             * or boolean false once the LogSource has ended.
             *
             * Your job is simple: print the sorted merge of all LogEntries across `n` LogSources.
             *
             * Call `printer.print(logEntry)` to print each entry of the merged output as they are ready.
             * This function will ensure that what you print is in fact in chronological order.
             * Call 'printer.done()' at the end to get a few stats on your solution!
             */
            const asyncLogSources = [];
            for (let i = 0; i < sourceCount; i++) {
                asyncLogSources.push(new log_source_1.default());
            }
            const asyncSortedMerge = await Promise.resolve().then(() => __importStar(require("./solution/async-sorted-merge")));
            try {
                asyncSortedMerge.default(asyncLogSources, new printer_1.default());
                resolve(true);
            }
            catch (e) {
                reject(e);
            }
        });
    });
}
// Adjust this input to see how your solutions perform under various loads.
runSolutions(100);
