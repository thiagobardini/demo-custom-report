import { test, expect, Page } from "@playwright/test";

// Types
type DataObject = { [key: string]: string };

// Navigates to the specified port
const goToPort = (port: string) => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${port}?testing=groovy`, { waitUntil: "load" });
    // eslint-disable-next-line no-console
    page.on("console", (msg) => console.log(msg.text()));
  });
};

// Navigates to the specified project
const goToProject = (projectName: string) => {
  test.beforeEach("Go to Project", async ({ page }) => {
    await page.getByTestId("pw-project-selector").click();
    await page.getByPlaceholder("Search...").fill(projectName);
    await page.getByPlaceholder("Search...").press("ArrowDown");

    // Check if the project with the specified name exists
    const projectExists = await page.getByRole("menuitem", { name: projectName, exact: true }).isVisible();
    if (!projectExists) {
      // Throw an error if the project is not found
      throw new Error(`Project "${projectName}" not found. Provide a valid project name.`);
    }

    await page.getByRole("menuitem", { name: projectName }).press("Enter");
    await page.click("body");
  });
};

// Returns the current date and time in the format "MM/DD/YY-HH:MM"
export function getFormattedDateTime(): string {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // A hora '0' deve ser '12'
  const formattedDateTime = `${month}/${day}/${year} - ${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  return formattedDateTime;
}

// Returns the locator for a button based on the page name
const getLocator = (page: Page, pageName: string) => page.getByRole("button", { name: pageName });

// Checks text visibility
async function checkTextVisibility(page: Page, textId: string, dataObject: DataObject, dataKey: string): Promise<void> {
  const element = page.locator(`[data-testid="${textId}"]`);
  await expect(element).toBeVisible();

  if (typeof dataObject[dataKey] === "undefined") {
    throw new Error(`The key '${dataKey}' is not defined in the data object.`);
  }
  await expect(element).toHaveText(dataObject[dataKey]);
}

// Checks tooltip visibility
async function checkTooltipVisibility(page: Page, textId: string, dataObject: DataObject, dataKeyTitle: string, dataKeyTooltip: string): Promise<void> {
  const tooltipTrigger = page.locator(`[data-testid="${textId}"]`);
  await tooltipTrigger.hover();
  const tooltip = page.locator('[role="tooltip"]').first();

  if (typeof dataObject[dataKeyTooltip] === "undefined") {
    throw new Error(`The key '${dataKeyTooltip}' is not defined in the data object.`);
  }

  await expect(tooltip).toHaveText(dataObject[dataKeyTooltip]);
  await page.click("body");
}

// Checks the visibility of an icon and its associated tooltip
async function checkIconAndTooltipVisibility(page: Page, iconId: string, dataObject: DataObject, dataKey: string): Promise<void> {
  const icon = page.locator(`[data-testid="${iconId}"]`);
  await icon.hover();
  const tooltip = page.locator('[role="tooltip"]').first();

  if (typeof dataObject[dataKey] === "undefined") {
    throw new Error(`The key '${dataKey}' is not defined in the data object.`);
  }
  await expect(tooltip).toHaveText(dataObject[dataKey]);
  await page.click("body");
}

// Clicks a tab or button based on the tab or button name
export async function clickTabOrButton(page: Page, testId: string, dataObject: DataObject, tabButtonName: string): Promise<void> {
  const tabButton = page.locator(`[data-testid="${testId}"]`, { hasText: dataObject[tabButtonName] });
  await tabButton.click();
}

// Exports
export { goToPort, goToProject, getLocator, checkTextVisibility, checkIconAndTooltipVisibility, checkTooltipVisibility };
