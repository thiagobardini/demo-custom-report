"use server";

import { NextResponse } from "next/server";
import { getReportAction } from "../../db/actions/getReportAction";

export async function GET() {
  const reports = await getReportAction();

  // const reportName = reports?.filter((report: any) => report?.tests.some((test: any) => test.dirName === params.reportName));

  return NextResponse.json({
    reports,
  });
}
