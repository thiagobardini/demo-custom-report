import { test, expect, TestInfo } from "@playwright/test";
import { goToPort } from "../../../utils/generalTestUtils";
import configConstants from "../../../data/configConstants.json";
import reportId from "../../../../next-js/public/data/reportId.json";

import {
  customReportTestInfoCondition,
  customReportTestInfoTestDescribe,
  customReportTestInfoConditionPass,
} from "../../../utils/customReport";

const report = [
  {
    id: "001",
    url: "mini-market-tbardini.vercel.app",
    email: "thiagobardini@icloud.com",
    reporter: "Thiago",
  },
];
test.describe("Mini Market @smoke", () => {
  test.setTimeout(130000);
  const testReportId = reportId.reportId;

  test.beforeEach(async ({}, testInfo: TestInfo) => {
    customReportTestInfoTestDescribe({
      testInfo: testInfo,
      testReportId: testReportId,
      testReportName: "Mini Market",
      testPath: "mini-market-tbardini.vercel.app > Stripe Payment",
      typeOfTest: "e2e",
      tickets: `["TICKET-001"]`,
    });
  });

  // API Endpoint For Testing
  const miniMarketUrlPort = configConstants.miniMarketUrl;

  // Setup the test environment
  goToPort(miniMarketUrlPort);
  report.forEach((data) => {
    test("Stripe Payment", async ({ page }, testInfo) => {
      testInfo.duration;
      testInfo.snapshotSuffix;

      // Custom report screenshot name & path
      let imageName: string = "";
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

        await expect(async () => {
          imageName = `mini-market-Pass.png`;
          await customReportTestInfoConditionPass({
            page: page,
            testInfo: testInfo,
            data: data,
            pathScreenshot: pathScreenshot,
            imageName: imageName,
            jiraRef: "",
            errorMessage: "",
          });
        }).toPass();
      } catch (error) {
        await customReportTestInfoCondition({
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
