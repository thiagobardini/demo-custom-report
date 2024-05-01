"--no-ignore";
const fs = require("fs");
const path = require("path");
const jsonData = require("../test-results/test-results.json");
const reportIdData = require("../next-js/public/data/reportId.json");

let idCounter = 1;
// Returns the current date and time in the format "MM/DD/YY - HH:MM"
function getFormattedDateTime() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedDateTime = `${month}/${day}/${year} - ${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  return formattedDateTime;
}

const dateTimeStamp = getFormattedDateTime();

// Function to sanitize and normalize titles for folder names
function sanitizeTitle(title) {
  return (
    title
      // Remove the suffix "@smoke"
      .replace(/@smoke$/, "")
      // Remove special characters, including "|", ">", and spaces
      .replace(/[\|\s>]+/g, " ")
      // Split the string into words, then capitalize the first letter of each word
      // Join them back without spaces
      .trim() // Garantee that extra spaces at the beginning and end are removed
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("")
  );
}

jsonData.suites.forEach((suite) => {
  suite.suites.forEach((subSuite) => {
    // Check if there are any tests with annotations
    const hasAnnotations = subSuite.specs.some((spec) => spec.tests.some((test) => test.annotations && test.annotations.length));

    if (!hasAnnotations) return; // Skip tests without info.annotations

    // Process suites with annotations
    const sanitizedTitle = sanitizeTitle(subSuite.title);
    const folderName = path.join(__dirname, "..", `next-js/public/data`, sanitizedTitle);
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
    }

    let specsArray = [];

    subSuite.specs.forEach((spec) => {
      spec.tests.forEach((test) => {
        const testAnnotations = test.annotations;
        let passCount = 0;
        let failCount = 0;

        // The second annotation contains the required information
        if (testAnnotations && testAnnotations.length > 1) {
          const annotationData = JSON.parse(testAnnotations[1].description);
          const annotationDataProject = JSON.parse(testAnnotations[0].description);

          // // Regex to extract the Jira ticket number from the URL
          // const jiraUrl = annotationData.jiraRef;
          // const jiraTicketRegex = /browse\/(MOXIE-\d+)$/;
          // const match = jiraUrl.match(jiraTicketRegex);
          // const jiraTicket = match ? match[1] : "";

          const specObject = {
            testId: testAnnotations[1].type,
            title: spec.title,
            websiteUrl: annotationData.websiteUrl,
            reporter: annotationData.reporter,
            screenshotPath: annotationData.screenshotPath,
            status: test.results[0].status === "passed" ? "Pass" : "Fail",
            jiraRef: annotationData.jiraRef,
            jiraTicket: annotationData.jiraTicket,
            message:
              test.results[0].status === "passed"
                ? "Test passed successfully"
                : test.results[0].error && test.results[0].error.message
                  ? test.results[0].error.message.replace(/Error:\s+/g, "")
                  : "Error message not available.",
          };

          specsArray.push(specObject);

          const customData = {
            title: sanitizeTitle(subSuite.title),
            reportId: annotationDataProject.testReportId,
            id: testAnnotations[0].type,
            titlePath: annotationDataProject.testPath,
            typeOfTest: annotationDataProject.typeOfTest,
            date: dateTimeStamp,
            tickets: annotationDataProject.tickets,
            passCount: passCount,
            failCount: failCount,
            specs: specsArray,
          };

          customData.specs.forEach((spec) => {
            if (spec.status === "Pass") {
              passCount++;
            } else if (spec.status === "Fail") {
              failCount++;
            }
          });

          customData.passCount = passCount;
          customData.failCount = failCount;

          const currentReportId = reportIdData.reportId;

          // Write the data to a JSON file
          const dataToWrite = [customData];

          const fileName = path.join(folderName, `${sanitizeTitle(subSuite.title).replace(/ /g, "-")}-${currentReportId}.json`);
          fs.writeFileSync(fileName, JSON.stringify(dataToWrite, null, 2));
          idCounter++;
        }

        const files = fs
          .readdirSync(folderName)
          .map((fileName) => {
            const filePath = path.join(folderName, fileName);
            return {
              name: fileName,
              time: fs.statSync(filePath).mtime.getTime(),
            };
          })
          .sort((a, b) => b.time - a.time); // Sort by most recent

        //  Keep only the 4 most recent files
        if (files.length > 5) {
          files.slice(5).forEach((file) => {
            fs.unlinkSync(path.join(folderName, file.name)); // Delete the older files
          });
        }
      });
    });
  });
});
// eslint-disable-next-line no-console
console.log("JSON reports generated successfully - generateJsonCustomReport.js.");
