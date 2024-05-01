import { client } from "../prisma";
import { ReportIndexData, Report, HistoryJsonTypes  } from "../../utils/interfaces";

export async function createReportIndexData(reportIndexData: ReportIndexData[]) {
  for (const item of reportIndexData) {
    // Check if a report with the same reportId already exists
    const existingReport = await client.indexReports.findFirst({
      where: {
        reportId: item.reportId,
      },
    });
    if (!existingReport) {
      try {
        const data = await client.indexReports.create({
          data: {
            reportId: item.reportId,
            reportDate: item.reportDate,
            tests: {
              create: item.tests.map((test) => ({
                dirName: test.dirName,
                title: test.title,
                testId: test.testId,
                testPath: test.testPath,
                dateTest: item.reportDate,
                typeOfTest: test.typeOfTest,
                passCount: test.passCount,
                failCount: test.failCount,
                totalTests: test.totalTests,
              })),
            },
          },
        });

        // eslint-disable-next-line no-console
        console.log("Data inserted successfully - createReportIndexData - MongoDB");
        return data;
      } catch (e) {
        console.error("Error inserting data", item);
        console.error(e);
      }
    }
  }
}

export async function createReportDescribeData(reportDescribeData: Report[]) {
  for (const item of reportDescribeData) {
    const existingReport = await client.reportDescribe.findFirst({
      where: {
        testDescribeId: item.id,
      },
    });

    if (!existingReport) {
      try {
        const reportDescribe = await client.reportDescribe.create({
          data: {
            testDescribe: item.title,
            reportId: item.reportId,
            testDescribeId: item.id,
            testDescribePath: item.titlePath,
            typeOfTest: item.typeOfTest,
            testDescribeDate: item.date,
            ticketsJira: item.tickets,
            failCount: item.failCount,
            passCount: item.passCount,
            specs: {
              create: item.specs.map((spec) => ({
                specId: spec.testId,
                specTitle: spec.title,
                specUrl: spec.websiteUrl,
                specReporter: spec.reporter,
                specScreenshotPath: spec.screenshotPath,
                specStatus: spec.status,
                specJiraRef: spec.jiraRef,
                specJiraTicket: spec.jiraTicket,
                specMessage: spec.message,
              })),
            },
          },
        });

        // eslint-disable-next-line no-console
        console.log("Data inserted successfully - createReportDescribeData - MongoDB");
        return reportDescribe;
      } catch (e) {
        console.error("Error inserting data", item);
        console.error(e);
      }
    }
  }
}
export async function createHistoryData(data: HistoryJsonTypes) {
  // Check if a history with the given reportTestId already exists
  const existingTestHistory = await client.reportHistory.findFirst({
    where: {
      reportId: data.reportId, // Using reportTestId as the unique identifier
    },
  });
  // If it doesn't exist, create a new history along with its related tests
  if (!existingTestHistory) {
    try {
      const createdTestHistoryData = await client.reportHistory.create({
        data: {
          reportId: data.reportId,
          reportTestId: data.id,
          titleReport: data.title,
          titlePath: data.titlePath,
          dateHistory: data.date,
          // Ensure changesDetected is defined and is an array before mapping over it
          changesDetected: data.changesDetected?.map((changeDetected) => ({
            testDetails: {
              create: {
                testId: changeDetected.testDetails.testId,
                title: changeDetected.testDetails.title,
                reported: changeDetected?.testDetails.reporter,
                newTest: changeDetected.testDetails.newTest,
                status: changeDetected.testDetails.status,
                // Check if previous has any keys, if not, set it to undefined
                previous: Object.keys(changeDetected?.testDetails.previous || {}).length
                  ? {
                      create: {
                        statusChange: changeDetected.testDetails.previous?.statusChange,
                        messageChange: changeDetected.testDetails.previous?.messageChange,
                        reported: changeDetected.testDetails.previous?.reporter,
                      },
                    }
                  : undefined,
                // No need to check actual since it has data
                actual: {
                  create: {
                    statusChange: changeDetected.testDetails.actual?.statusChange,
                    messageChange: changeDetected.testDetails.actual?.messageChange,
                    reporter: changeDetected.testDetails.actual?.reporter,
                  },
                },
              },
            },
          })),
        },
      });
      // eslint-disable-next-line no-console
      console.log("Data inserted successfully - createHistoryData - MongoDB");
      return createdTestHistoryData;
    } catch (e) {
      console.error("Error inserting data - createHistoryData:", data);
      console.error(e);
    }
  } else {
    // console.log(`Entry with id ${data.id} already exists. Skipping insertion.`);
  }
}

