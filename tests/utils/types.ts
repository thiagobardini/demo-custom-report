import { Page, TestInfo } from "@playwright/test";

export interface CustomReporttDescribeTypes {
  testInfo: TestInfo;
  testReportId: string;
  testReportName: string;
  testPath: string;
  typeOfTest: string;
  tickets: string;
}

export interface CustomReportConditionTypes {
  page: Page;
  testInfo: TestInfo;
  pathScreenshot: string;
  data: {
    id?: string;
    url?: string;
    email?: string;
    reporter?: string;
  };
  imageName: string;
  jiraRef?: string;
  errorMessage?: string;
}

export type TestInfoDemoReportTypes = {
  testInfo: TestInfo;
  testReportId: string;
  testReportName: string;
  testPath: string;
  typeOfTest: string;
  tickets: string;
};

export interface GlobalLinkWebsiteDataTypes {
  id: string;
  url: string;
  email: string;
  reporter: string;
}

export interface CustomReportTypes {
  page: Page;
  testInfo: TestInfo;
  data: GlobalLinkWebsiteDataTypes;
  pathScreenshot: string;
  imageName: string;
  jiraRef: string;
  errorMessage: string;
}
