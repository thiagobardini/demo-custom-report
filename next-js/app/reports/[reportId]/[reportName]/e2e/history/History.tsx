"use client";

import React, { useState } from "react";
import { Text, Card, Group, Badge, Flex, Stack } from "@mantine/core";
import Loading from "@/app/components/shared/Loading";
import Header from "./Header";
import { ApiHistoryResponse, HistoryReport } from "@/app/utils/interfaces";
import HistorySearch from "@/app/reports/[reportId]/[reportName]/e2e/history/HistorySearch";
import { useParams } from "next/navigation";
import { useEffect } from "react";

interface HistoryPageProps {
  data?: ApiHistoryResponse[];
}

const HistoryPage: React.FC<HistoryPageProps> = ({ data = [] }) => {
  const [filteredReports, setFilteredReports] = useState<HistoryReport[]>([]);

  
  const [isLoading, setIsLoading] = useState(false);

  const param = useParams();
  const reportName = param.reportName;
  
  useEffect(() => {
    setIsLoading(true);
    if (!data) {
      setFilteredReports(data);
    }
    setIsLoading(false);
  }, [data]);

  if (isLoading) return <Loading />;

  const HistoryItem = ({ report }: { report: HistoryReport }) => {
    return (
      <Card shadow='sm' p='lg' radius='md' withBorder>
        <Group style={{ justifyContent: "space-between", marginBottom: 5, marginTop: 5 }}>
          <Text fw={500}>{report.reportTestId}</Text>
        </Group>

        <Text size='sm' mb='lg'>
          Date: {report.dateHistory}
        </Text>
        {report.changesDetected?.map((change, index) => {
          // const { create } = change.testDetails;
          return (
            <div key={index}>
              {change?.testDetails?.create?.newTest ? (
                <Flex align='center' style={{ marginBottom: 5 }} direction='row' gap='sm'>
                  <Badge
                    color={change?.testDetails?.create?.status === "Pass" ? "green" : "red"}
                    variant='light'
                    style={{
                      minWidth: "60px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {change?.testDetails?.create?.status}
                  </Badge>
                  <Text size='sm' style={{ lineHeight: 1.5 }}>
                    New test reported by <strong>{change?.testDetails?.create?.reported || "unknown"}</strong> for <strong>{change?.testDetails?.create?.title}</strong>
                  </Text>
                </Flex>
              ) : (
                <Flex align='center' mb='lg' direction='row' gap='sm'>
                  <Badge
                    color={change?.testDetails?.create?.status === "Pass" ? "green" : "red"}
                    variant='light'
                    style={{
                      minWidth: "60px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {change?.testDetails?.create?.status}
                  </Badge>
                  <Text size='sm' style={{ lineHeight: 1.5 }}>
                    Reported by: <strong>{change?.testDetails?.create?.reported}</strong> - <strong>{change?.testDetails?.create?.title}</strong>:{" "}
                    {change?.testDetails?.create?.previous?.create?.statusChange && (
                      <>
                        Status <u>changed</u> from{" "}
                        <Text span td='line-through'>
                          {change?.testDetails?.create?.previous.create.statusChange}
                        </Text>{" "}
                        to <strong style={{ backgroundColor: "#ffcc00" }}>{change?.testDetails?.create?.actual?.create?.statusChange} </strong>
                      </>
                    )}
                    {change?.testDetails?.create?.previous?.create?.messageChange && (
                      <>
                        <span>
                          Description <u>changed</u> from{" "}
                          <Text span td='line-through'>
                            {change?.testDetails?.create?.previous?.create?.messageChange}
                          </Text>{" "}
                          to <strong style={{ backgroundColor: "#ffcc00" }}>{change?.testDetails?.create?.actual?.create?.messageChange}</strong>{" "}
                        </span>
                      </>
                    )}
                    {change?.testDetails?.create?.previous?.create?.reporter && (
                      <span>
                        Reporter <u>changed</u> from{" "}
                        <Text span td='line-through'>
                          {change?.testDetails?.create?.previous?.create?.reporter}
                        </Text>{" "}
                        to <strong style={{ backgroundColor: "#ffcc00" }}>{change?.testDetails?.create?.actual?.create?.reporter}</strong>.
                      </span>
                    )}
                  </Text>
                </Flex>
              )}
            </div>
          );
        })}
      </Card>
    );
  };

  return (
    <>
      <Header slogan='View History Reports' title={reportName.toString()} />

      <Stack>
        {data.length === 0 ? (
          <Text style={{ textAlign: "center" }}> No history found</Text>
        ) : (
          <>
            <HistorySearch reports={data as HistoryReport[]} setFilteredReports={setFilteredReports} />

            {filteredReports.map((report, index) => (
              <HistoryItem key={index} report={report as HistoryReport} />
            ))}
          </>
        )}
      </Stack>
    </>
  );
};

export default HistoryPage;
