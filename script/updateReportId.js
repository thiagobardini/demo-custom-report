"--no-ignore";
const fs = require("fs");
const path = require("path");

// Path to the reportId.json file
const reportIdPath = path.join(__dirname, "..", "next-js/public/data/reportId.json");

// This function reads the reportId.json, increments the reportId, and writes it back to the file.
function updateReportId() {
  // Check if the reportId.json file exists
  if (!fs.existsSync(reportIdPath)) {
    throw new Error("reportId.json file not found.");
  }

  // Read the file content
  const content = fs.readFileSync(reportIdPath, "utf8");
  const reportIdObj = JSON.parse(content);

  // Increment the reportId if it is a valid number
  if (reportIdObj.reportId && !isNaN(reportIdObj.reportId)) {
    // Convert reportId to an integer, increment it, and pad it with leading zeros
    reportIdObj.reportId = (parseInt(reportIdObj.reportId, 10) + 1).toString().padStart(3, "0");
  } else {
    throw new Error("Invalid or missing reportId in the JSON file.");
  }

  // Write the updated reportId back to the reportId.json file
  fs.writeFileSync(reportIdPath, JSON.stringify(reportIdObj, null, 2), "utf8");
}

// Call the function to update the reportId
updateReportId();
