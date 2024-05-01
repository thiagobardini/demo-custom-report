import React, { useState, useEffect } from "react";
import { TextInput, Flex } from "@mantine/core";
import { HistoryReport } from "@/app/utils/interfaces";

interface Props {
  reports: HistoryReport[];
  setFilteredReports: (historyData: HistoryReport[]) => void;
}

const HistorySearch: React.FC<Props> = ({ reports, setFilteredReports }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    const filteredReports = reports
      .map((report) => {
        // Filter the keys below from the history report
        const changesDetected = report?.changesDetected?.filter((change) => {
          const create = change?.testDetails?.create;

          if (create) {
            return (
              report.reportId?.toLowerCase().includes(lowerSearchTerm) ||
              report.dateHistory?.toLowerCase().includes(lowerSearchTerm) ||
              create.status?.toLowerCase().includes(lowerSearchTerm) ||
              create.reported?.toLowerCase().includes(lowerSearchTerm) ||
              create.title?.toLowerCase().includes(lowerSearchTerm) ||
              // More Options to filter
              // create.previous?.create?.statusChange?.toLowerCase().includes(lowerSearchTerm) ||
              // create.previous?.create?.messageChange?.toLowerCase().includes(lowerSearchTerm) ||
              // create.previous?.create?.reporter?.toLowerCase().includes(lowerSearchTerm) ||
              create.actual?.create?.statusChange?.toLowerCase().includes(lowerSearchTerm) ||
              // create.actual?.create?.messageChange?.toLowerCase().includes(lowerSearchTerm) ||
              create.actual?.create?.reporter?.toLowerCase().includes(lowerSearchTerm)
            );
          }
          return false;
        });

        // If changes were found, return a new object containing the filtered changes
        if (changesDetected && changesDetected.length > 0) {
          return { ...report, changesDetected };
        }
        return undefined;
      })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((report): report is any => report !== undefined);

    setFilteredReports(filteredReports);
  }, [searchTerm, reports, setFilteredReports]);

  return (
    <Flex gap={20} justify='flex-end' align='center' direction='row'>
      <TextInput placeholder='Search history...' description='Search:' value={searchTerm} onChange={(event) => setSearchTerm(event.currentTarget.value)} style={{ width: "16rem" }} />
    </Flex>
  );
};

export default HistorySearch;
