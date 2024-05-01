"use server";

import { client } from "../prisma";
import { ApiReportResponse } from "../../utils/interfaces";

export async function getReportAction(): Promise<ApiReportResponse[]> {
  const data = await client.reportDescribe.findMany({
    include: {
      specs: true,
    },
    orderBy: {
      testDescribeDate: "desc",
    },
  });

  return data.map((report) => ({
    reports: [],
    ...report,
    testDescribeDate: report.testDescribeDate || "", 
  }));
}
