export interface Spec {
  testId: string;
  title: string;
  websiteUrl: string;
  reporter: string;
  screenshotPath: string;
  status: "Pass" | "Fail";
  jiraRef: string;
  jiraTicket: string;
  message: string;
}

export interface Report {
  title: string;
  reportId: string;
  id: string;
  titlePath: string;
  typeOfTest: string;
  tickets?: string;
  date: string;
  passCount: number;
  failCount: number;
  specs: Spec[];
}

export interface TestReport {
  dirName: string;
  title: string;
  testId: string;
  testPath: string;
  dateTest: string | undefined;
  typeOfTest: string;
  passCount: number;
  failCount: number;
  totalTests: number;
}

export interface ReportIndexData {
  reportId: string;
  reportDate: string;
  tests: TestReport[];
}

export interface ApiResponse {
  indexData: ReportIndexData[];
}

export interface ReportDataInterface {
  reportIndexData: Change[];
}

export interface ReportDataInterface {
  reportIndexData: Change[];
}

export interface ImageAccordionModalProps {
  imageUrl: string;
  message: string;
  title: string;
}

export interface Change {
  testDetails: {
    testId: string;
    reporter: string;
    title: string;
    newTest: boolean;
    status: string;
    previous?: {
      statusChange?: string;
      reporter?: string;
      messageChange?: string;
    };
    actual: {
      statusChange?: string | undefined;
      reporter?: string | undefined;
      messageChange?: string | undefined;
    };
  };
}

export interface ChangesDetectedInterface {
  changesDetected: Change[];
}

export interface StatusMessageProps {
  currentReportId: string;
}

export interface TestStatus {
  statusChange?: string | null;
  messageChange?: string | null;
  reporter?: string | null;
}

export interface TestDetails {
  testId?: string;
  title?: string;
  newTest?: boolean;
  reporter?: string;
  status?: string;
  previous?: TestStatus;
  actual?: TestStatus;
}

export interface ChangesTestDetails {
  testDetails: TestDetails;
}

export interface HistoryJsonTypes {
  reportId: string;
  id: string;
  title: string;
  titlePath: string;
  date: string;
  // changesDetected: ChangesTestDetails[];
  changesDetected: Change[];
}
export interface ChangesDetectedProps {
  reportId: string;
  reportTestId: string;
  titleReport: string;
  titlePath: string;
  dateHistory: string;
  // changesDetected: ChangesTestDetails[];
  changesDetected: Change[];
}

export interface ApiHistorytResponse {
  data: ChangesDetectedProps[]
}

export interface ReportDescribeTypes {
  reportId: string;
  testDescribeTitle: string;
  testDescribeId: string;
  typeOfTest: string;
  testDescribeDate: string;
  testDescribePath: string;
  ticketsJira?: string;
  testDescribe: string;
  passCount: number;
  failCount: number;
  specs: SpecDescribe[];
}

export interface ApiReportResponse {
  reports: ReportDescribeTypes[];
}

export interface SpecDescribe {
  specId: string;
  specTitle: string;
  specUrl: string;
  specReporter: string;
  specScreenshotPath: string;
  specStatus: "Pass" | "Fail";
  specJiraRef: string;
  specJiraTicket: string;
  specMessage: string;
}

// HistoryPage
export interface NestedCreateDetails {
  statusChange?: string;
  messageChange?: string;
  reporter?: string;
}

export interface CreateDetails {
  status: "Pass" | "Fail";
  reported: string;
  title: string;
  newTest: boolean;
  actual?: NestedCreatePreviousActual;
  previous?: NestedCreatePreviousActual;
}

export interface NestedCreatePreviousActual {
  create?: NestedCreateDetails;
}

export interface TestDetails {
  create?: CreateDetails;
}

export interface ChangeHistory {
  testDetails?: TestDetails;
}

export interface HistoryReport {
  id?: string;
  reportId?: string;
  reportTestId?: string;
  titleReport?: string;
  titlePath?: string;
  dateHistory?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  changesDetected?: ChangeHistory[];
}

export interface ApiHistoryResponse {
  data?: HistoryReport[] | undefined;
}

export interface ScriptConfigTypes {
  id: string;
  reportIdScript: string;
  scriptTag: string;
}

export interface ScriptApiResponse {
  data: ScriptConfigTypes[];
}