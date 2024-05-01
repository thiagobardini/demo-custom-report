"--no-ignore";
const fs = require("fs");
const path = require("path");
const reportId = require("../next-js/public/data/reportId.json").reportId;

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

function generateJsonCustomReportIndex() {
  const reportDirPath = path.join(__dirname, "..", "next-js/public/data");
  const dateTimeStamp = getFormattedDateTime();

  let directories = fs
    .readdirSync(reportDirPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  let reports = directories.map((dir) => {
    const jsonFiles = fs
      .readdirSync(path.join(reportDirPath, dir))
      .filter((file) => file.endsWith(".json"))
      .map((file) => path.join(reportDirPath, dir, file))
      .sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime);

    if (jsonFiles.length > 0) {
      const latestReport = JSON.parse(fs.readFileSync(jsonFiles[0], "utf8"));
      const passCount = latestReport[0].passCount || 0;
      const failCount = latestReport[0].failCount || 0;
      const testCount = passCount + failCount;
      const testPath = latestReport[0].titlePath;
      const testId = latestReport[0].id;
      const typeOfTest = latestReport[0].typeOfTest;
      const date = latestReport[0].date;
      const title = latestReport[0].title;

      return {
        dirName: dir,
        title,
        testId,
        testPath,
        date,
        typeOfTest,
        passCount,
        failCount,
        totalTests: testCount,
      };
    } else {
      return { directory: dir, message: "No test reports found" };
    }
  });

  const reportJSONContent = {
    reportId,
    reportDate: dateTimeStamp,
    tests: reports,
  };

  // Write the data to a JSON file
  const dataToWrite = [reportJSONContent];

  fs.writeFileSync(path.join(__dirname, "..", `next-js/public/data`, "jsonReportIndex.json"), JSON.stringify(dataToWrite, null, 2), "utf8");
}

generateJsonCustomReportIndex();

// eslint-disable-next-line no-console
console.log("JSON Index report generated successfully - generateJSONCustomReportIndex.js.");
