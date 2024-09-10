import Heap from "heap";
import { LogEntryType, LogSourceType } from "../lib/log-source";
import { PrinterType } from "../lib/printer";

/* When dealing with a small number of log sources (e.g., two or three),
a straightforward approach is to compare the current log entries from
each source and print the smallest one. This approach involves a linear
comparison of the logs from all sources, which can be manageable with
a small number of sources.
However, as the number of log sources increases, this comparison method
becomes less efficient. The time complexity of comparing each log from
every source becomes impractical, as it scales poorly with the number
of sources and log entries.
For a large number of log sources, a more efficient solution is to use
a min-heap. A min-heap is a priority queue that always provides access
to the smallest element efficiently.
In summary, for a small number of sources, direct comparison can be
sufficient, but for a large number of sources, a min-heap offers a
more scalable and efficient solution by optimizing the organization and
retrieval of log entries.*/

const asyncMergeLogSources = (
  logSources: LogSourceType[],
  printer: PrinterType
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const minHeap = new Heap<LogEntryType>(
        (a: LogEntryType, b: LogEntryType) =>
          a.date.getTime() - b.date.getTime()
      );

      const initialLogs = await Promise.all(
        logSources.map((source) => source.popAsync())
      );

      initialLogs.forEach((log, index) => {
        if (log) {
          minHeap.push({ ...(log as LogEntryType), sourceIndex: index });
        }
      });

      const buffer: Record<string, LogEntryType[]> = {};
      logSources.forEach((_, i) => {
        buffer[i] = [];
      });

      let existsLogs = true;

      while (existsLogs) {
        const newLogs = await Promise.all(
          logSources.map((source) => source.popAsync())
        );
        newLogs.forEach((l, index) => {
          if (l)
            buffer[index].push({ ...(l as LogEntryType), sourceIndex: index });
        });
        if (newLogs.every((l) => !l)) existsLogs = false;
      }

      while (minHeap.size() > 0) {
        const smallest = minHeap.pop();
        if (smallest) {
          printer.print(smallest);

          const smallestLogSource = buffer[smallest.sourceIndex!];
          const nextLog = smallestLogSource.shift();
          if (nextLog) {
            minHeap.push({
              ...(nextLog as LogEntryType),
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

export default asyncMergeLogSources;
