"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customReportTestInfoTestDescribe = customReportTestInfoTestDescribe;
exports.customReportTestInfoCondition = customReportTestInfoCondition;
exports.customReportTestInfoConditionPass = customReportTestInfoConditionPass;
function customReportTestInfoTestDescribe(data) {
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
async function customReportTestInfoCondition(customReportData) {
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
        jiraRef: `https://github.com/thiagobardini`,
        jiraTicket: jiraRef,
        screenshotPath: imageName,
    };
    const htmlDataReportDataString = JSON.stringify(htmlCustomReportData);
    testInfo.annotations.push({ type: data.id ?? "default-type", description: htmlDataReportDataString });
    throw new Error(errorMessage);
}
async function customReportTestInfoConditionPass(customReportData) {
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
        jiraRef: `https://github.com/thiagobardini`,
        jiraTicket: jiraRef,
        screenshotPath: imageName,
    };
    const htmlDataReportDataString = JSON.stringify(htmlCustomReportData);
    testInfo.annotations.push({ type: data.id ?? "default-type", description: htmlDataReportDataString });
}
