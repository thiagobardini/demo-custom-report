"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const customReport_1 = require("../../../utils/customReport");
const reportId_json_1 = __importDefault(require("../../../../next-js/public/data/reportId.json"));
test_1.test.describe("Test1 @smoke @regression @sanity", () => {
    (0, test_1.test)("Test1", async ({ page }) => {
        const testReportId = reportId_json_1.default.reportId;
        await page.goto("https://www.dakotasoft.com/");
        test_1.test.beforeEach(async ({}, testInfo) => {
            const params = {
                testInfo: testInfo,
                testReportId: "test1",
                testReportName: "Test1",
                testPath: "dakotasoft.com",
                typeOfTest: "e2e",
                tickets: `["TICKET-2658", "TICKET-2663", "TICKET-489"]`,
            };
            (0, customReport_1.customReportTestInfoTestDescribe)(params);
        });
        await (0, test_1.expect)(page.locator("h1")).toContainText("Drive EHS Compliance. Improve ESG Performance. Gain Actionable Insight.");
    });
});
