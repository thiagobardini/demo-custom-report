"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFullPageScreenshot = checkFullPageScreenshot;
exports.checkFullPageScreenshotWithMask = checkFullPageScreenshotWithMask;
exports.checkElementScreenshot = checkElementScreenshot;
exports.checkElementScreenshotWithMask = checkElementScreenshotWithMask;
exports.checkScreenshotPixelRatio = checkScreenshotPixelRatio;
const test_1 = require("@playwright/test");
// Function to check full page screenshot without mask
async function checkFullPageScreenshot({ page, screenshotName, fullPage = false, }) {
    await page.waitForLoadState("load");
    await page.waitForTimeout(3000);
    await page.click("body");
    await (0, test_1.expect)(page).toHaveScreenshot(screenshotName, {
        fullPage,
        animations: "disabled",
        timeout: 10000,
    });
}
// Function to check full page screenshot with mask
async function checkFullPageScreenshotWithMask({ page, screenshotName, fullPage = false, maskTestIds = [], }) {
    // Create masks for dynamic elements we want to exclude from the screenshot
    const mask = maskTestIds.map((testId) => page.locator(`[data-testid="${testId}"]`));
    // Wait for each masked element to be visible before taking the screenshot
    for (const maskLocator of mask) {
        await maskLocator.first().waitFor({ state: "visible", timeout: 10000 });
    }
    await (0, test_1.expect)(page).toHaveScreenshot(screenshotName, {
        fullPage,
        mask,
        timeout: 10000,
    });
}
// Function to check screenshot of a specific element with no mask
async function checkElementScreenshot({ page, testId, screenshotName, }) {
    const locator = page.locator(`[data-testid="${testId}"]`);
    await locator.waitFor({ state: "visible" });
    await page.waitForTimeout(1000);
    await (0, test_1.expect)(locator).toHaveScreenshot(screenshotName, { timeout: 10000 });
}
// Function to check screenshot of specific element with mask
async function checkElementScreenshotWithMask({ page, testId, screenshotName, maskTestIds = [], }) {
    const locator = page.locator(`[data-testid="${testId}"]`);
    await locator.waitFor({ state: "visible" });
    await page.waitForTimeout(1000);
    const mask = maskTestIds.map((testId) => page.locator(`[data-testid="${testId}"]`));
    await (0, test_1.expect)(locator).toHaveScreenshot(screenshotName, {
        mask,
        timeout: 10000,
    });
}
// Function to check screenshot with pixel ratio considerations
async function checkScreenshotPixelRatio({ page, testId, screenshotName, maxDiffPixelRatioNum, }) {
    const locator = page.locator(`[data-testid="${testId}"]`);
    await locator.waitFor({ state: "visible" });
    await page.waitForTimeout(1000);
    await (0, test_1.expect)(locator).toHaveScreenshot(screenshotName, {
        maxDiffPixelRatio: maxDiffPixelRatioNum,
        // You might want to include other options like maxDiffPixels if needed
        timeout: 10000,
    });
}
