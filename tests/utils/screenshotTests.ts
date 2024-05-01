// screenshotTests.ts
import { expect, Page } from "@playwright/test";

interface ScreenshotTestParams {
  page: Page;
  testId?: string;
  screenshotName: string;
  fullPage?: boolean;
  maskTestIds?: string[];
  maxDiffPixelRatioNum?: number;
}

// Function to check full page screenshot without mask
export async function checkFullPageScreenshot({ page, screenshotName, fullPage = false }: ScreenshotTestParams): Promise<void> {
  await page.waitForLoadState("load"); 
  await page.waitForTimeout(3000); 

  await page.click("body");
  await expect(page).toHaveScreenshot(screenshotName, { fullPage, animations: "disabled", timeout: 10000 });
}

// Function to check full page screenshot with mask
export async function checkFullPageScreenshotWithMask({ page, screenshotName, fullPage = false, maskTestIds = [] }: ScreenshotTestParams): Promise<void> {
  // Create masks for dynamic elements we want to exclude from the screenshot
  const mask = maskTestIds.map((testId) => page.locator(`[data-testid="${testId}"]`));

  // Wait for each masked element to be visible before taking the screenshot
  for (const maskLocator of mask) {
    await maskLocator.first().waitFor({ state: "visible", timeout: 10000 });
  }

  await expect(page).toHaveScreenshot(screenshotName, { fullPage, mask, timeout: 10000 });
}

// Function to check screenshot of a specific element with no mask
export async function checkElementScreenshot({ page, testId, screenshotName }: ScreenshotTestParams): Promise<void> {
  const locator = page.locator(`[data-testid="${testId}"]`);
  await locator.waitFor({ state: "visible" });
  await page.waitForTimeout(1000);
  await expect(locator).toHaveScreenshot(screenshotName, { timeout: 10000 });
}

// Function to check screenshot of specific element with mask
export async function checkElementScreenshotWithMask({ page, testId, screenshotName, maskTestIds = [] }: ScreenshotTestParams): Promise<void> {
  const locator = page.locator(`[data-testid="${testId}"]`);
  await locator.waitFor({ state: "visible" });
  await page.waitForTimeout(1000);
  const mask = maskTestIds.map((testId) => page.locator(`[data-testid="${testId}"]`));
  await expect(locator).toHaveScreenshot(screenshotName, { mask, timeout: 10000 });
}

// Function to check screenshot with pixel ratio considerations
export async function checkScreenshotPixelRatio({ page, testId, screenshotName, maxDiffPixelRatioNum }: ScreenshotTestParams): Promise<void> {
  const locator = page.locator(`[data-testid="${testId}"]`);
  await locator.waitFor({ state: "visible" });
  await page.waitForTimeout(1000);
  await expect(locator).toHaveScreenshot(screenshotName, {
    maxDiffPixelRatio: maxDiffPixelRatioNum,
    // You might want to include other options like maxDiffPixels if needed
    timeout: 10000,
  });
}
