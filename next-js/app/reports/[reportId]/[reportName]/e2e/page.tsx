import Report from "./Report";
import Header from "./Header";
import { Container } from "@mantine/core";

export function generateStaticParams() {
  return [
    { reportId: "002", reportName: "MiniMarket", e2e: true, history: true },
    { reportId: "002", reportName: "GloballinkGo", e2e: true, history: true },
    { reportId: "001", reportName: "MiniMarket", e2e: true, history: true },
    { reportId: "001", reportName: "GloballinkGo", e2e: true, history: true },
  ];
}

export default function Page({ params }: { params: { reportId: string; reportName: string } }) {
  const { reportName } = params;
  return (
    <Container size='xl' my='md'>
      <Header title={reportName || "No Title"} />
      <div>
        <Report />
      </div>
    </Container>
  );
}

