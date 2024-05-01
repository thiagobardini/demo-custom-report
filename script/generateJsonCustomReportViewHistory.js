"--no-ignore";
const fs = require("fs");
const path = require("path");
const reportId = require("../next-js/public/data/reportId.json").reportId;

let projectTitle;

function compareSpecs(oldSpecs, newSpecs, projectDetails) {
  projectTitle = projectDetails.title;
  const changesDetected = [];
  if (!Array.isArray(newSpecs)) {
    console.error("newSpecs is not an array:", newSpecs);
    return; // Return undefined
  }
  newSpecs.forEach((newSpec) => {
    const oldSpec = oldSpecs.find((old) => old.testId === newSpec.testId);
    let changeDetails = { testDetails: { previous: {}, actual: {} } };

    changeDetails.testDetails = {
      testId: newSpec.testId,
      title: newSpec.title,
      reporter: newSpec.reporter,
      newTest: false,
      status: newSpec.status,
    };
    if (oldSpec) {
      changeDetails.testDetails.previous = {};
      changeDetails.testDetails.actual = {};
      if (oldSpec.status !== newSpec.status) {
        changeDetails.testDetails.previous.statusChange = oldSpec.status;
        changeDetails.testDetails.actual.statusChange = newSpec.status;
      }
      if (oldSpec.reporter !== newSpec.reporter) {
        changeDetails.testDetails.previous.reporterChange = oldSpec.reporter;
        changeDetails.testDetails.actual.reporterChange = newSpec.reporter;
      }
      if (oldSpec.message !== newSpec.message) {
        changeDetails.testDetails.previous.messageChange = oldSpec.message;
        changeDetails.testDetails.actual.messageChange = newSpec.message;
      }
      // If there are any changes, add the changeDetails to the changesDetected array
      if (Object.keys(changeDetails.testDetails.previous).length > 0) {
        changesDetected.push(changeDetails);
      }
    } else {
      // If there is no oldSpec, this means it is a new test
      changesDetected.push({
        testDetails: {
          reportId: reportId,
          testId: newSpec.testId,
          title: newSpec.title,
          newTest: true,
          status: newSpec.status,
          previous: {},
          actual: {
            statusChange: newSpec.status,
            reporter: newSpec.reporter,
            messageChange: newSpec.message,
          },
        },
      });
    }
  });

  return {
    reportId: reportId,
    id: projectDetails.id,
    title: projectDetails.title,
    titlePath: projectDetails.titlePath,
    date: projectDetails.date,
    changesDetected,
  };
}

function getJSONFilesFromDir(directory) {
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      return {
        path: path.join(directory, file),
        mtime: fs.statSync(path.join(directory, file)).mtime,
      };
    })
    .sort((a, b) => b.mtime - a.mtime) // Orden by the most recent file
    .map((file) => file.path); // Return only the path
}

function loadJSONFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/*
The function scans a directory for test result subdirectories, 
compares the latest two test spec files within each, 
and records any changes in a new JSON file stored in a history subfolder.
*/
const testResultsDir = path.join(__dirname, "..", "./next-js/public/data");

fs.readdirSync(testResultsDir).forEach((folder) => {
  const subDirPath = path.join(testResultsDir, folder);
  if (fs.statSync(subDirPath).isDirectory()) {
    const jsonFiles = getJSONFilesFromDir(subDirPath);
    if (jsonFiles.length >= 2) {
      const latestFilePath = jsonFiles[0];
      const secondLatestFilePath = jsonFiles[1];

      const latestData = loadJSONFile(latestFilePath);
      const secondLatestData = loadJSONFile(secondLatestFilePath);

      const differences = compareSpecs(secondLatestData[0].specs, latestData[0].specs, latestData[0]);
      if (differences.changesDetected && differences.changesDetected.length > 0) {
        const historyFolderPath = path.join(subDirPath, "history");
        if (!fs.existsSync(historyFolderPath)) {
          fs.mkdirSync(historyFolderPath);
        }

        const differencesFileName = `${projectTitle}-changes-${reportId}.json`;
        const differencesFilePath = path.join(historyFolderPath, differencesFileName);

        // Write the data to a JSON file
        const dataToWrite = differences;
        console.log("dataToWrite", dataToWrite);
        console.log("differencesFilePath", differencesFilePath);
        
        fs.writeFileSync(differencesFilePath, JSON.stringify(dataToWrite, null, 2));
        // eslint-disable-next-line no-console
        console.log(`Differences detected in ${folder}. File created: ${differencesFileName}`);
      }
    }
  }
});

// eslint-disable-next-line no-console
console.log("JSON reports generated successfully - generateJsonCustomReportViewHistory.js.");
