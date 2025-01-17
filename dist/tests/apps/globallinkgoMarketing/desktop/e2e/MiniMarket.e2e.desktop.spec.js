"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const generalTestUtils_1 = require("../../../../utils/generalTestUtils");
const configConstants_json_1 = __importDefault(require("../../../../data/configConstants.json"));
const reportId_json_1 = __importDefault(require("../../../../../next-js/public/data/reportId.json"));
const customReport_1 = require("../../../../utils/customReport");
const report = [
    {
        id: "001",
        url: "mini-market-tbardini.vercel.app",
        email: "thiagobardini@icloud.com",
        reporter: "Thiago",
    },
];
test_1.test.describe("Mini Market @smoke", () => {
    test_1.test.setTimeout(130000);
    const testReportId = reportId_json_1.default.reportId;
    test_1.test.beforeEach(async ({}, testInfo) => {
        (0, customReport_1.customReportTestInfoTestDescribe)({
            testInfo: testInfo,
            testReportId: testReportId,
            testReportName: "Mini Market",
            testPath: "mini-market-tbardini.vercel.app > Stripe Payment",
            typeOfTest: "e2e",
            tickets: `["TICKET-001"]`,
        });
    });
    // API Endpoint For Testing
    const miniMarketUrlPort = configConstants_json_1.default.miniMarketUrl;
    // Setup the test environment
    (0, generalTestUtils_1.goToPort)(miniMarketUrlPort);
    report.forEach((data) => {
        (0, test_1.test)("Stripe Payment", async ({ page }, testInfo) => {
            testInfo.duration;
            testInfo.snapshotSuffix;
            // Custom report screenshot name & path
            let imageName = "";
            const pathScreenshot = `next-test-report/public/test-report`;
            try {
                // Click on the "Start Shopping" button
                await page.getByRole("link", { name: "Start shopping" }).click();
                // Add product to cart
                await page.getByRole("button", { name: "$10" }).click();
                // await expect(page.getByText("1", { exact: true })).toBeVisible();
                await page.getByRole("button", { name: "$10" }).click();
                // await expect(page.getByText("2", { exact: true })).toBeVisible();
                await page.getByRole("button", { name: "$2.75" }).click();
                // await expect(page.getByText("1", { exact: true })).toBeVisible();
                await page.getByRole("button", { name: "$5" }).click();
                await page.getByRole("button", { name: "$5" }).click();
                await page.getByRole("button", { name: "$5" }).click();
                // await expect(page.getByText("3", { exact: true })).toBeVisible();
                await page.getByRole("button", { name: "$3.25" }).click();
                // await expect(page.getByText("1").nth(4)).toBeVisible();
                // await expect(page.getByRole("link", { name: "Cart (7)" })).toBeVisible();
                // await page.getByRole("link", { name: "Cart (7)" }).click();
                // await page.getByText("Card number: 4242 4242 4242").click();
                // await page.getByPlaceholder("Email").click();
                // await page.getByPlaceholder("Email").fill(email);
                await (0, test_1.expect)(async () => {
                    imageName = `mini-market-Pass.png`;
                    await (0, customReport_1.customReportTestInfoConditionPass)({
                        page: page,
                        testInfo: testInfo,
                        data: data,
                        pathScreenshot: pathScreenshot,
                        imageName: imageName,
                        jiraRef: "",
                        errorMessage: "",
                    });
                }).toPass();
            }
            catch (error) {
                await (0, customReport_1.customReportTestInfoCondition)({
                    page: page,
                    testInfo: testInfo,
                    data: data,
                    pathScreenshot: pathScreenshot,
                    imageName: imageName,
                    jiraRef: "TICKET-001",
                    errorMessage: error instanceof Error ? error.message : String(error),
                });
            }
        });
    });
});
