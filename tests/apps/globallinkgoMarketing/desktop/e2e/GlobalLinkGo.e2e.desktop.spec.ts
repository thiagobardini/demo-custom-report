import { test, expect, TestInfo, Page } from "@playwright/test";
import { goToPort } from "../../../../utils/generalTestUtils";
import configConstants from "../../../../data/configConstants.json";
import reportId from "../../../../../next-js/public/data/reportId.json";
import {
  TestInfoDemoReportTypes,
  GlobalLinkWebsiteDataTypes,
  CustomReportTypes,
} from "../../../../utils/types";

import {
  customReportTestInfoCondition,
  customReportTestInfoTestDescribe,
  customReportTestInfoConditionPass,
} from "../../../../utils/customReport";

const websites: GlobalLinkWebsiteDataTypes[] = [
  {
    id: "001",
    url: "www.tbardini.com",
    email: "contact@bookshop.org",
    reporter: "Thiago",
  },
  {
    id: "002",
    url: "mantine.dev",
    email: "contact@mantine.com",
    reporter: "Thiago",
  },
  {
    id: "003",
    url: "forbes.com",
    email: "contact@forbes.com",
    reporter: "Thiago",
  },
  {
    id: "004",
    url: "techcrunch.com",
    email: "contact@techcrunch.com",
    reporter: "Thiago",
  },
  {
    id: "005",
    url: "theguardian.com",
    email: "contact@theguardian.com",
    reporter: "Thiago",
  },
  {
    id: "006",
    url: "wired.com",
    email: "contact@wired.com",
    reporter: "Thiago",
  },
  {
    id: "007",
    url: "foodnetwork.com",
    email: "contact@foodnetwork.com",
    reporter: "Thiago",
  },
  {
    id: "008",
    url: "smittenkitchen.com",
    email: "contact@smittenkitchen.com",
    reporter: "Thiago",
  },
  {
    id: "009",
    url: "thepioneerwoman.com",
    email: "contact@thepioneerwoman.com",
    reporter: "Thiago",
  },
  {
    id: "010",
    url: "food52.com",
    email: "contact@food52.com",
    reporter: "Thiago",
  },
  {
    id: "011",
    url: "thekitchn.com",
    email: "contact@thekitchn.com",
    reporter: "Thiago",
  },
  {
    id: "012",
    url: "cooksillustrated.com",
    email: "contact@cooksillustrated.com",
    reporter: "Thiago",
  },
  {
    id: "013",
    url: "delish.com",
    email: "contact@delish.com",
    reporter: "Thiago",
  },
  {
    id: "014",
    url: "cookstr.com",
    email: "contact@cookstr.com",
    reporter: "Thiago",
  },
  {
    id: "015",
    url: "simplyrecipes.com",
    email: "contact@simplyrecipes.com",
    reporter: "Thiago",
  },
  {
    id: "016",
    url: "www.kfc.com",
    email: "contact@test.com",
    reporter: "Thiago",
  },
  {
    id: "017",
    url: "www.lowes.com",
    email: "contact@test.com",
    reporter: "Thiago",
  },
  {
    id: "018",
    url: "www.pizzahut.com",
    email: "contact@test.com",
    reporter: "Thiago",
  },
  {
    id: "019",
    url: "www.homedepot.com",
    email: "contact@test.com",
    reporter: "Thiago",
  },
  {
    id: "020",
    url: "openai.com",
    email: "contact@test.com",
    reporter: "Thiago",
  },
];

test.describe("GlobalLink Go @smoke", () => {
  // Heavy tests - only run on Chromium
  test.setTimeout(130000);
  test.skip(
    ({ browserName }) => browserName !== "chromium",
    "Test only runs on Chromium.",
  );
  const testReportId = reportId.reportId as string;

  test.beforeEach(async ({}, testInfo: TestInfo) => {
    const params: TestInfoDemoReportTypes = {
      testInfo: testInfo,
      testReportId: testReportId,
      testReportName: "GlobalLink Go",
      testPath: "globallinkgo.com > WordsServedEstimatePage",
      typeOfTest: "e2e",
      tickets: `["TICKET-2658", "TICKET-2663", "TICKET-489"]`,
    };

    customReportTestInfoTestDescribe(params);
  });

  // API Endpoint For Testing
  const globalLinkGoPort = configConstants.glgoMarketing;

  // Setup the test environment
  goToPort(globalLinkGoPort);

  websites.forEach((data) => {
    const { id, url, email } = data;
    test(`${url}`, async ({ page }: { page: Page }, testInfo: TestInfo) => {
      testInfo.duration;
      testInfo.snapshotSuffix;

      // Custom report screenshot name & path
      let imageName;
      const pathScreenshot = `next-test-report/public/test-report`;

      await page.getByRole("button", { name: "Pricing" }).click();
      await page.getByLabel("Your Website *").click();
      await page.getByLabel("Your Website *").fill(url);
      await page.getByLabel("Your Email *").click();
      await page.getByLabel("Your Email *").fill(email);

      //  Verify if the email and URL were filled before proceeding
      const isUrlFilled = await page
        .getByLabel("Your Website *")
        .evaluate((node: HTMLInputElement) => node.value.length > 0);
      const isEmailFilled = await page
        .getByLabel("Your Email *")
        .evaluate((node: HTMLInputElement) => node.value.length > 0);

      // Encode the URL, e.g., "www.bostonhpa.org%2Fpublic"
      const encodedWebsiteUrl = encodeURIComponent(url);

      // Listen for the QuickQuote response
      const quickQuoteResponsePromise = page.waitForResponse(
        (response) =>
          response.url().includes(`QuickQuote?domain=${encodedWebsiteUrl}`),
        { timeout: 130000 },
      );

      // Listen for the CRM API response
      const crmAPIResponsePromise = page.waitForResponse(
        (response) => response.url().includes(`CRM/objects/contacts`),
        { timeout: 130000 },
      );

      // Click the "Calculate Now" button if the fields are already filled
      if (isUrlFilled && isEmailFilled) {
        await page.getByRole("button", { name: "Calculate Now" }).click();
      } else {
        // Try to fill the fields if they are not filled
        if (!isUrlFilled) {
          await page.getByLabel("Your Website *").fill(url);
        }
        if (!isEmailFilled) {
          await page.getByLabel("Your Email *").fill(email);
        }
        // Click the "Calculate Now" button
        await page.getByRole("button", { name: "Calculate Now" }).click();
      }

      // await quickQuoteRequestPromise;
      await page.waitForRequest(
        (request) => request.url().includes("QuickQuote?domain="),
        { timeout: 130000 },
      );

      // Go to the Words Served Estimate page
      await Promise.race([
        page.goto(`${globalLinkGoPort}/estimate?domain=${url}&email=${email}`, {
          waitUntil: "load",
          timeout: 130000,
        }),
        page.getByRole("dialog").getByRole("button").click(),
        page
          .locator('text="Failed to connect to the"')
          .waitFor({ state: "visible", timeout: 130000 })
          .then(async () => {
            const imageName = `image${id}_Failed.png`;

            const params: CustomReportTypes = {
              page: page,
              testInfo: testInfo,
              data: data,
              pathScreenshot: pathScreenshot,
              imageName: imageName,
              jiraRef: "Ticket-4444",
              errorMessage: `API/QuickQuote (504) has no spider jobs - Failed to connect to the website.`,
            };
            await customReportTestInfoCondition(params);
          }),
      ]);
      await quickQuoteResponsePromise;

      const quickQuoteResponse = await quickQuoteResponsePromise;

      const analyzedWordsText = await page
        .getByTestId("pw-analyzed-words")
        .textContent({ timeout: 130000 });
      const analyzedWords: number | null = analyzedWordsText
        ? parseInt(analyzedWordsText, 10)
        : null;

      const statusCode = quickQuoteResponse.status();

      // Failure scenarios:

      // 1. The status is 'Cancelled' QuickQuote API 404 status
      if (!quickQuoteResponse.ok()) {
        // Custom report data
        imageName = `image${id}_Cancelled.png`;
        const params: CustomReportTypes = {
          page: page,
          testInfo: testInfo,
          data: data,
          pathScreenshot: pathScreenshot,
          imageName: imageName,
          jiraRef: "TICKET-2658",
          errorMessage: `API/QuickQuote - Cancelled - Getting ${statusCode} status`,
        };

        await customReportTestInfoCondition(params);
      }

      const crmAPIResponse = await crmAPIResponsePromise;

      // 2. The analyzed words are zero - QuickQuote API 200 status
      if (
        (analyzedWords === null ||
          analyzedWords === 0 ||
          isNaN(analyzedWords)) &&
        quickQuoteResponse.ok()
      ) {
        await crmAPIResponsePromise;

        //  2.1) CRM API status is not 200
        if (crmAPIResponse.status() !== 200) {
          imageName = `image${id}_ZeroWords_CrmApi_Fail.png`;
          const params: CustomReportTypes = {
            page: page,
            testInfo: testInfo,
            data: data,
            pathScreenshot: pathScreenshot,
            imageName: imageName,
            jiraRef: "TICKET-489,TICKET-2663",
            errorMessage: `Two failures: API/QuickQuote - Zero words analyzed despite 'OK' (${statusCode}) response (TICKET-2663) & CRM API - Getting ${crmAPIResponse.status()} status (TICKET-489)`,
          };
          await customReportTestInfoCondition(params);
        } else if (analyzedWords === 0) {
          imageName = `image${id}_ZeroWords_Fail.png`;
          const params: CustomReportTypes = {
            page: page,
            testInfo: testInfo,
            data: data,
            pathScreenshot: pathScreenshot,
            imageName: imageName,
            jiraRef: "TICKET-2663",
            errorMessage: `API/QuickQuote - Zero words analyzed despite 'OK' (${statusCode}) response`,
          };
          await customReportTestInfoCondition(params);
        } else {
          // Analyzedwords is NaN
          imageName = `image${id}_FailedTo_Fail.png`;
          const params: CustomReportTypes = {
            page: page,
            testInfo: testInfo,
            data: data,
            pathScreenshot: pathScreenshot,
            imageName: imageName,
            jiraRef: "No Jira Ref",
            errorMessage: `API/QuickQuote (${statusCode}) has no spider jobs - Failed to connect to the website.`,
          };
          await customReportTestInfoCondition(params);
        }
      }

      await crmAPIResponsePromise;
      // 3. Pass and CRM API status is not 200
      if (crmAPIResponse.status() !== 200) {
        imageName = `image-${id}_CrmApi_Fail.png`;
        const params: CustomReportTypes = {
          page: page,
          testInfo: testInfo,
          data: data,
          pathScreenshot: pathScreenshot,
          imageName: imageName,
          jiraRef: "TICKET-489",
          errorMessage: `Test PASS, but CRM API - Getting ${crmAPIResponse.status()} status (TICKET-489)`,
        };
        await customReportTestInfoCondition(params);
      } else {
        // 4. Pass
        await expect(async () => {
          imageName = `image${id}_Pass.png`;
          const params: CustomReportTypes = {
            page: page,
            testInfo: testInfo,
            data: data,
            pathScreenshot: pathScreenshot,
            imageName: imageName,
            jiraRef: "",
            errorMessage: "",
          };
          await customReportTestInfoConditionPass(params);
        }).toPass();
      }
    });
  });
});
