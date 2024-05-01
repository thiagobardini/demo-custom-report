import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Select } from "@mantine/core";
import Loading from "./Loading";
import { useAppContext } from "@/context";
import { ApiResponse } from "../../utils/interfaces";
import { useParams, useRouter, usePathname } from "next/navigation";

interface SelectReportProps {
  closeDropdown: () => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SelectPreviousReport: React.FC<SelectReportProps> = ({ closeDropdown }) => {
  const [isSelectorDisabled, setSelectorDisabled] = useState(false);
  const { data, error, isLoading } = useSWR<ApiResponse>("/api/index", fetcher);
  const { selectReportContext, setSelectReportContext, setReportIdContext, reportIdContext } = useAppContext();

  const router = useRouter();
  const pathname = usePathname();

  const params = useParams<{ reportId: string; reportName: string }>();
  const reportIdParam = params.reportId;

  // if the pathname includes '/history' then disable the selector
  useEffect(() => {
    const isHistoryPage = pathname.includes("/history");
    setSelectorDisabled(isHistoryPage);

    if (isHistoryPage && data?.indexData && data.indexData.length > 0) {
      setSelectReportContext(0);
      setReportIdContext(data.indexData[0].reportId);
      router.push(`/reports/${data.indexData[0]?.reportId}/${params.reportName}/e2e/history`);
      closeDropdown();
    }
  }, [pathname, data, setReportIdContext, closeDropdown]);

  useEffect(() => {
    if (reportIdParam && data?.indexData) {
      const report = data.indexData.find((report) => report.reportId === reportIdParam);
      if (report) {
        setReportIdContext(reportIdParam);
      } else {
        setReportIdContext(data.indexData[0].reportId);
      }
    }
  }, [reportIdParam, data, reportIdContext, selectReportContext]);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Loading />;
  if (!data || !Array.isArray(data.indexData) || data.indexData.length === 0) {
    return <div>No report data available</div>;
  }

  const selectedReport = () => {
    if (reportIdContext) {
      return data.indexData.find((report) => report.reportId === reportIdContext);
    } else {
      return data.indexData[0];
    }
  };

  if (!selectedReport) {
    console.error("Selected report is undefined");
    setReportIdContext(data.indexData[0].reportId);
    setSelectReportContext(0);
    return <div>Report not found</div>;
  }

  const handleReportChange = (value: string | null) => {
    if (value) {
      // Find the index of the selected report so you can display Previous Reports Banner
      const reportIndex = data.indexData.findIndex((report) => report.reportId === value);
      setSelectReportContext(reportIndex);

      setReportIdContext(value);

      // Logic to find the report name based on ID if necessary
      const reportName = params.reportName || "Report";

      // Refresh the URL with the new reportId and reportName
      if (params.reportId && params.reportName) {
        router.push(`/reports/${value}/${reportName}/e2e`);
      }
    }
  };

  const defaultValue = `id: ${data.indexData[selectReportContext].reportId} - ${data.indexData[selectReportContext].reportDate.split(" - ")[0]}`;
  return (
    <div>
      <Select
        // description='Choose a report'
        description='Previous reports'
        // placeholder='Choose a report'
        placeholder={defaultValue.toString()}
        value={selectReportContext.toString()}
        onChange={handleReportChange}
        data={data.indexData.map((report) => ({
          value: report.reportId,
          label: `id: ${report.reportId} - ${report.reportDate.split(" - ")[0]}`,
        }))}
        defaultValue={defaultValue.toString()}
        disabled={isSelectorDisabled}
      />
    </div>
  );
};

export default SelectPreviousReport;
