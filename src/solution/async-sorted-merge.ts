import { LogEntryType, LogSourceType } from "../lib/log-source";
import { PrinterType } from "../lib/printer";

const asyncMergeLogSources = (
  logSources: LogSourceType[],
  printer: PrinterType
) => {
  return new Promise(async (resolve, reject) => {
    console.log("async-sorted-merge");
  });
};

export default asyncMergeLogSources;
