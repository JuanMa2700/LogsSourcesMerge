"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_source_1 = __importDefault(require("../lib/log-source"));
describe("Log Source Behaviors", () => {
    test("It should synchronously drain a log source", () => {
        const source = new log_source_1.default();
        let entry = source.pop();
        expect(new Date() > entry.date).toBeTruthy();
        expect(entry.msg).toBeTruthy();
        entry = source.pop();
        expect(new Date() > entry.date).toBeTruthy();
        expect(entry.msg).toBeTruthy();
        source.last.date = new Date();
        entry = source.pop();
        expect(entry).toBeFalsy();
    });
    test("It should asynchronously drain a log source", async () => {
        const source = new log_source_1.default();
        let entry = await source.popAsync();
        expect(new Date() > entry.date).toBeTruthy();
        expect(entry.msg).toBeTruthy();
        entry = await source.popAsync();
        expect(new Date() > entry.date).toBeTruthy();
        expect(entry.msg).toBeTruthy();
        source.last.date = new Date();
        entry = await source.popAsync();
        expect(entry).toBeFalsy();
    });
});
