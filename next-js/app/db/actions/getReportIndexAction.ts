"use server";

import { client } from "../prisma";
import { ApiResponse } from "../../utils/interfaces";

export async function getIndexReport(): Promise<ApiResponse[]> {
  const data = await client.indexReports.findMany({
    include: {
      tests: true,
    },
    orderBy: {
      reportDate: "desc",
    },
  });

  return data.map((report) => ({
    indexData: [],
    ...report,
    reportDate: report.reportDate || "", 
  }));
}
