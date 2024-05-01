import { client } from "../prisma";

export async function getHistoryReport(reportName: string) {
  try {
    const data = await client.reportHistory.findMany({
      where: {
        titleReport: reportName,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (e) {
    console.error(e, "Error getting history report");
    throw e;
  }
}
