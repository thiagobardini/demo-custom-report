import fs from "fs";
import path from "path";
import { client } from "../prisma";
import { createHistoryData, createReportDescribeData, createReportIndexData } from "../actions/connectToDatabase";
import { ReportIndexData } from "../../utils/interfaces";

// Reads JSON files from each directory and creates data for the database

// Gets the list of directory names within the 'public/data' directory
const reportDirPath = path.join(process.cwd(), "public", "data");
const getDirectories = () => {
  return fs
    .readdirSync(reportDirPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

// Populates with Report Index data
export async function populateReportIndexDataBase() {
  const file = await fs.readFileSync(process.cwd() + "/public/data/jsonReportIndex.json", "utf8");
  const reportIndexData: ReportIndexData[] = JSON.parse(file);
  await createReportIndexData(reportIndexData);
}

// Populates with Report Describe data
export async function populateReportDescribeDatabase() {
  const directories = getDirectories();

  for (const dir of directories) {
    const dataDirectory = path.join(reportDirPath, dir);
    const fileNames = fs.readdirSync(dataDirectory);

    for (const fileName of fileNames) {
      const filePath = path.join(dataDirectory, fileName);
      if (fs.statSync(filePath).isFile()) {
        const fileContents = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(fileContents);
        await createReportDescribeData(jsonData);
      }
    }
  }
}

// Populates with History data
export async function populateHistoryReportDatabase() {
  const directories = getDirectories();

  for (const dir of directories) {
    const dataDirectory = path.join(reportDirPath, dir, "history");

    // Ensure the 'history' directory exists
    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory, { recursive: true });
    }

    // Proceed with file reading only if the directory exists or was created successfully
    const fileNames = fs.existsSync(dataDirectory) ? fs.readdirSync(dataDirectory) : [];

    for (const fileName of fileNames) {
      const filePath = path.join(dataDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const jsonData = JSON.parse(fileContents);

      // Call the function that handles database insertion here
      await createHistoryData(jsonData);
    }
  }
}

export const populateDatabase = async () => {
  try {
    await Promise.all([populateHistoryReportDatabase(), populateReportDescribeDatabase(), populateReportIndexDataBase()]);
    // eslint-disable-next-line no-console
    console.log("Database has been populated -  populateDatabase().");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("An error occurred while populating the database:", e);
  } finally {
    await client.$disconnect();
  }
};
