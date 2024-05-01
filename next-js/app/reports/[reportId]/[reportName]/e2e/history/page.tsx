import History from './History'
import { Container } from '@mantine/core'
import { getHistoryReport } from '@/app/db/actions/getHistoryReportAction'
import { ApiHistoryResponse } from '@/app/utils/interfaces'

export function generateStaticParams() {
  return [
    { reportId: '001', reportName: 'MiniMarket', e2e: true, history: true },
    { reportId: '001', reportName: 'GloballinkGo', e2e: true, history: true },
  ]
}

export default async function Page(context: {
  params: { reportId: string; reportName: string }
}) {
  const reportName = context.params.reportName

  const data: ApiHistoryResponse[] | undefined = (
    await getHistoryReport(reportName)
  ).map(
    (item) =>
      ({
        id: item.id,
        reportId: item?.reportId,
        reportTestId: item?.reportTestId,
        titleReport: item?.titleReport,
        titlePath: item?.titlePath,
        dateHistory: item?.dateHistory,
        changesDetected: item?.changesDetected,
        createdAt: item?.createdAt,
        updatedAt: item?.updatedAt,
      } as ApiHistoryResponse)
  )

  return (
    <Container size="xl" my="md">
      <History data={data} />
    </Container>
  )
}
