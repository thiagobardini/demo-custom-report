import { NextResponse } from "next/server";
import { getIndexReport } from "../../db/actions/getReportIndexAction";

export async function GET() {
  const index = await getIndexReport();

  return NextResponse.json({
    indexData: index,
  });
}
