import { test, expect, TestInfo } from "@playwright/test";
import { customReportTestInfoTestDescribe } from "../../../utils/customReport";
import reportId from "../../../../next-js/public/data/reportId.json";

type BeforeEachParams = {
  testInfo: TestInfo;
  testReportId: string;
  testReportName: string;
  testPath: string;
  typeOfTest: string;
  tickets: string;
};

test.describe("Test1 @smoke @regression @sanity", () => {
  test("Test1", async ({ page }) => {
    const testReportId = reportId.reportId;

    await page.goto("https://www.dakotasoft.com/");
    
    test.beforeEach(async ({}, testInfo: TestInfo) => {
      const params: BeforeEachParams = {
        testInfo: testInfo,
        testReportId: "test1",
        testReportName: "Test1",
        testPath: "dakotasoft.com",
        typeOfTest: "e2e",
        tickets: `["TICKET-2658", "TICKET-2663", "TICKET-489"]`,
      };
      customReportTestInfoTestDescribe(params);
    });

    await expect(page.locator("h1")).toContainText(
      "Drive EHS Compliance. Improve ESG Performance. Gain Actionable Insight."
    );


  });
});
