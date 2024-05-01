"use client";

import React, { useEffect } from "react";
import useSWR from "swr";
import { Flex, Text, CloseButton } from "@mantine/core";
import { IconXboxX } from "@tabler/icons-react";
import { ApiResponse } from "../../utils/interfaces";
import { useAppContext } from "@/context";
import { useParams, useRouter } from "next/navigation";

interface HistoryBannerProps {
  closeDropdown: () => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HistoryBanner: React.FC<HistoryBannerProps> = ({ closeDropdown }) => {
  const { data } = useSWR<ApiResponse>("/api/index", fetcher);
  const { setSelectReportContext, setReportIdContext, reportIdContext } = useAppContext();

  const router = useRouter();
  const params = useParams<{ reportId: string; reportName: string }>();

  useEffect(() => {
    if (params.reportId) {
      setReportIdContext(params.reportId);
    }
  }, [params.reportId, setReportIdContext, setSelectReportContext, reportIdContext]);

  if (!data || !Array.isArray(data.indexData) || data.indexData.length === 0) {
    return <div>No report data available</div>;
  }

  const handleClose = () => {
    setReportIdContext(data.indexData[0]?.reportId);
    setSelectReportContext(0);

    // Logic to find the report name based on ID if necessary
    const reportName = params.reportName;
    // Refresh the URL with the new reportId and reportName
    if (params.reportId && params.reportName) {
      router.push(`/reports/${data.indexData[0]?.reportId}/${reportName}/e2e`);
    }

    closeDropdown();
  };

  return (
    <Flex
      direction='row'
      justify='center'
      align='center'
      w='100%'
      mx='auto'
      bg='yellow'
      py='1.5'
      px='2rem'
      style={{
        zIndex: 299,
        boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ flex: 1 }}>
        <Text c='black' size='xs' ta='center' fw='500'>
          This is a Previous Report
        </Text>
      </div>

      <CloseButton onClick={handleClose} size='sm' variant='transparent' c='black' icon={<IconXboxX size='1rem' stroke={1.5} />} />
    </Flex>
  );
};

export default HistoryBanner;
