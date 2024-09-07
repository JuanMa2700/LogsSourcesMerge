import LogSource, { LogEntryType } from "../lib/log-source";

describe("Log Source Behaviors", () => {
  test("It should synchronously drain a log source", () => {
    const source = new LogSource();
    let entry = source.pop();
    expect(new Date() > (entry as LogEntryType).date).toBeTruthy();
    expect((entry as LogEntryType).msg).toBeTruthy();
    entry = source.pop();
    expect(new Date() > (entry as LogEntryType).date).toBeTruthy();
    expect((entry as LogEntryType).msg).toBeTruthy();
    source.last.date = new Date();
    entry = source.pop();
    expect(entry as LogEntryType).toBeFalsy();
  });

  test("It should asynchronously drain a log source", async () => {
    const source = new LogSource();
    let entry = await source.popAsync();
    expect(new Date() > (entry as LogEntryType).date).toBeTruthy();
    expect((entry as LogEntryType).msg).toBeTruthy();
    entry = await source.popAsync();
    expect(new Date() > (entry as LogEntryType).date).toBeTruthy();
    expect((entry as LogEntryType).msg).toBeTruthy();
    source.last.date = new Date();
    entry = await source.popAsync();
    expect(entry as LogEntryType).toBeFalsy();
  });
});
