import { customReportConditionInterface, customReporttDescribeInterface } from "../interfaces/interfaces";

export function customReportTestInfoTestDescribe(data: customReporttDescribeInterface) {
  const { testInfo, testReportId, testReportName, testPath, typeOfTest, tickets } = data;
  const testParams = {
    testReportId: testReportId,
    testPath: testPath,
    typeOfTest: typeOfTest,
    tickets: tickets || "",
  };
  testInfo.annotations.push({
    type: `${testReportName}-${testReportId}`,
    description: JSON.stringify(testParams),
  });
}

export async function customReportTestInfoCondition(customReportData: customReportConditionInterface) {
  const { page, testInfo, data, imageName, jiraRef, errorMessage } = customReportData;

  const pathScreenshot = `next-js/public/test-report`;

  await page.screenshot({
    path: `${pathScreenshot}/${imageName}`,
    fullPage: true,
  });

  const htmlCustomReportData = {
    websiteId: data.id || "001",
    websiteUrl: data.url || "TestQA",
    reporter: data.reporter || "Playwright",
    jiraRef: `https://github.com/thiagobardini` || "",
    jiraTicket: jiraRef,
    screenshotPath: imageName,
  };

  const htmlDataReportDataString = JSON.stringify(htmlCustomReportData);
  testInfo.annotations.push({ type: data.id ?? "default-type", description: htmlDataReportDataString });

  throw new Error(errorMessage);
}
export async function customReportTestInfoConditionPass(customReportData: customReportConditionInterface) {
  const { page, testInfo, data, imageName, jiraRef } = customReportData;

  const pathScreenshot = `next-js/public/test-report`;

  await page.screenshot({
    path: `${pathScreenshot}/${imageName}`,
    fullPage: true,
  });

  const htmlCustomReportData = {
    websiteId: data.id || "001",
    websiteUrl: data.url || "TestQA",
    reporter: data.reporter || "Playwright",
    jiraRef: `https://github.com/thiagobardini` || "",
    jiraTicket: jiraRef,
    screenshotPath: imageName,
  };

  const htmlDataReportDataString = JSON.stringify(htmlCustomReportData);
  testInfo.annotations.push({ type: data.id ?? "default-type", description: htmlDataReportDataString });
}
