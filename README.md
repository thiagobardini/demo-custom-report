![Demo Report Logo](https://www.tbardini.com/assets/TBardini-dot-dark-MIMyJ2zW.png)

# Demo Report: Customized Testing Solutions

## Introduction

This repository, named "Demo Report," showcases my capabilities in customizing testing solutions. I utilize Playwright for test automation, scripts to extract and send data to MongoDB, and incorporate modern technologies such as Next.js, Prisma, and TypeScript. The purpose of this project is to highlight my ability to integrate various tools and technologies to create a robust and adaptable testing solution.

## Project Configuration

"Demo Report" is set up to effectively test web applications using the following technologies:

- **Playwright**: For automating user interface tests.
- **Next.js**: The framework used to develop the front end of the reporting solution.
- **Prisma**: As an ORM to interact with MongoDB, facilitating database operations.
- **MongoDB**: The database used to store test data and results.

## Testing Process

### Data Extraction and Submission

1. **Extraction Script**: Custom scripts extract necessary data for the tests.
2. **Submission to MongoDB**: Data is sent to MongoDB using Prisma, ensuring that data is available during the tests.

### Automation with Playwright

- **Setup**: Configuring Playwright to test across different browsers and devices.
- **Test Execution**: Tests are run to verify the functionality and user interface of the application.

## Custom Reports

- **Report Generation**: I use scripts to generate test reports in customized formats.
- **Results Visualization**: Integration with Next.js to create a user interface where reports can be viewed and analyzed.

## Use of Modern Technologies

- **Next.js**: Development of the front end for report viewing.
- **Prisma**: Database management that makes it easier to interact with MongoDB.
- **TypeScript**: Used to write testing and report generation scripts, ensuring safer and more maintainable code.

## Conclusion

The "Demo Report" exemplifies my ability to create and customize testing solutions that are not only functional but also adaptable to the needs of different software projects. This repository serves as a showcase of my technical knowledge and my ability to apply this knowledge in practical situations.



---

![Playwright Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Playwright_Logo.svg/300px-Playwright_Logo.svg.png)

# About Playwright

Playwright is a robust automation tool designed to support comprehensive testing across all modern browsers. It facilitates fast, reliable, and capable testing solutions that enhance our capability to deliver high-quality software products.

## Core Features

- **Broad Browser Compatibility**: Playwright supports tests across all major browsers, including Chrome, Firefox, Safari, and Edge, both on desktop and mobile platforms.
- **Automated Interaction**: Simulates a wide range of user interactions such as clicks, form entries, and scroll actions, making it a powerful tool for user experience testing.
- **Visual Regression Testing**: Ensures the UI remains consistent across different builds by capturing and comparing visual snapshots.
- **End-to-End (E2E) Testing**: Covers the entire application flow, testing everything from frontend user interactions to backend API integration, ensuring a comprehensive validation of the system's functionality.

## Types of Tests

### Visibility Tests
- **Element Verification**: Verifies the presence and correct display of UI elements against expected results.
- **Design Adherence**: Ensures that the UI matches the design specifications in terms of layout, color schemes, and responsiveness.
- **Targeted Screenshot Testing**: Focuses on specific components within the application to monitor changes over time or after updates.

### End-to-End (E2E) Tests
- **User Journey Simulation**: Mimics complete user paths through the application to validate each step of the process, from login to transaction completion.

## Project Configuration and Test Execution

Playwright is integrated into our project environment, allowing for seamless setup and execution of tests. Here is how we configure and run our tests:

```json
"scripts": {
  "test:ui": "npx playwright test ./tests/* --ui",
  "generate:custom-test-report": "node ./script/generateJsonCustomReport.js && node ./script/generateJsonCustomReportViewHistory.js && node ./script/generateJsonCustomReportIndex.js && node ./script/updateReportId.js"
}