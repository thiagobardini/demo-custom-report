"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocator = exports.goToProject = exports.goToPort = void 0;
exports.getFormattedDateTime = getFormattedDateTime;
exports.clickTabOrButton = clickTabOrButton;
exports.checkTextVisibility = checkTextVisibility;
exports.checkIconAndTooltipVisibility = checkIconAndTooltipVisibility;
exports.checkTooltipVisibility = checkTooltipVisibility;
const test_1 = require("@playwright/test");
// Navigates to the specified port
const goToPort = (port) => {
    test_1.test.beforeEach(async ({ page }) => {
        await page.goto(`${port}?testing=groovy`, { waitUntil: "load" });
        // eslint-disable-next-line no-console
        page.on("console", (msg) => console.log(msg.text()));
    });
};
exports.goToPort = goToPort;
// Navigates to the specified project
const goToProject = (projectName) => {
    test_1.test.beforeEach("Go to Project", async ({ page }) => {
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
exports.goToProject = goToProject;
// Returns the current date and time in the format "MM/DD/YY-HH:MM"
function getFormattedDateTime() {
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
const getLocator = (page, pageName) => page.getByRole("button", { name: pageName });
exports.getLocator = getLocator;
// Checks text visibility
async function checkTextVisibility(page, textId, dataObject, dataKey) {
    const element = page.locator(`[data-testid="${textId}"]`);
    await (0, test_1.expect)(element).toBeVisible();
    if (typeof dataObject[dataKey] === "undefined") {
        throw new Error(`The key '${dataKey}' is not defined in the data object.`);
    }
    await (0, test_1.expect)(element).toHaveText(dataObject[dataKey]);
}
// Checks tooltip visibility
async function checkTooltipVisibility(page, textId, dataObject, dataKeyTitle, dataKeyTooltip) {
    const tooltipTrigger = page.locator(`[data-testid="${textId}"]`);
    await tooltipTrigger.hover();
    const tooltip = page.locator('[role="tooltip"]').first();
    if (typeof dataObject[dataKeyTooltip] === "undefined") {
        throw new Error(`The key '${dataKeyTooltip}' is not defined in the data object.`);
    }
    await (0, test_1.expect)(tooltip).toHaveText(dataObject[dataKeyTooltip]);
    await page.click("body");
}
// Checks the visibility of an icon and its associated tooltip
async function checkIconAndTooltipVisibility(page, iconId, dataObject, dataKey) {
    const icon = page.locator(`[data-testid="${iconId}"]`);
    await icon.hover();
    const tooltip = page.locator('[role="tooltip"]').first();
    if (typeof dataObject[dataKey] === "undefined") {
        throw new Error(`The key '${dataKey}' is not defined in the data object.`);
    }
    await (0, test_1.expect)(tooltip).toHaveText(dataObject[dataKey]);
    await page.click("body");
}
// Clicks a tab or button based on the tab or button name
async function clickTabOrButton(page, testId, dataObject, tabButtonName) {
    const tabButton = page.locator(`[data-testid="${testId}"]`, { hasText: dataObject[tabButtonName] });
    await tabButton.click();
}
