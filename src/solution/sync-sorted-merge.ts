import Heap from "heap";
import { LogEntryType, LogSourceType } from "../lib/log-source";
import { PrinterType } from "../lib/printer";

const syncMergeLogSources = (
  logSources: LogSourceType[],
  printer: PrinterType
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const minHeap = new Heap<LogEntryType>(
        (a: LogEntryType, b: LogEntryType) =>
          a.date.getTime() - b.date.getTime()
      );

      const initialLogs = logSources.map((source) => source.pop());

      initialLogs.forEach((log, index) => {
        if (log) {
          minHeap.push({ ...(log as LogEntryType), sourceIndex: index });
        }
      });

      while (minHeap.size() > 0) {
        const smallest = minHeap.pop();
        if (smallest) {
          printer.print(smallest);

          const smallestLogSource = logSources[smallest.sourceIndex!];
          const nextLog = smallestLogSource.pop();
          if (nextLog) {
            minHeap.push({
              ...(nextLog as LogEntryType),
              sourceIndex: smallest.sourceIndex,
            });
          }
        }
      }
      resolve(printer.done());
    } catch (e) {
      console.log(`////// ERROR: ${e} //////`);
      reject(e);
    }
  });
};

export default syncMergeLogSources;
