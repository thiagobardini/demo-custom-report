import { Page, TestInfo } from "@playwright/test";

export interface customReporttDescribeInterface {
  testInfo: TestInfo;
  testReportId: string;
  testReportName: string;
  testPath: string;
  typeOfTest: string;
  tickets: string;
}

export interface customReportConditionInterface {
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
