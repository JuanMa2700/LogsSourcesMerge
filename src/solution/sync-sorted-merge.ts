import { LogEntryType, LogSourceType } from "../lib/log-source";
import { PrinterType } from "../lib/printer";

const syncMergeLogSources = (
  logSources: LogSourceType[],
  printer: PrinterType
) => {
  return new Promise(async (resolve, reject) => {
    console.log("sync-sorted-merge");
  });
};

export default syncMergeLogSources;
