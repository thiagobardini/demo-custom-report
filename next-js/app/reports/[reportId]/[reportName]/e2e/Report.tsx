"use client";

import React, { useEffect, useState, useMemo, Fragment } from "react";
import useSWR from "swr";
import Link from "next/link";
import { Text, Badge, Table, Divider, Box, TextInput, Flex, Grid, ScrollArea, Paper } from "@mantine/core";
import { ApiReportResponse, SpecDescribe, ApiResponse, ReportDescribeTypes } from "@/app/utils/interfaces";
import classes from "./Report.module.css";
import ChangesDetected from "@/app/components/shared/ChangesDetected";
import ImageAccordionModal from "@/app/components/shared/ImageAccordionModal";
import { useParams } from "next/navigation";
import Loading from "@/app/components/shared/Loading";
import StatusCount from "@/app/components/shared/StatusCount";
import VideoPlayer from "@/app/components/shared/VideoPlayer";
import { useAppContext } from "@/context";
import TicketsCovered from "@/app/components/shared/TicketsCovered";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Report = () => {
  const { data, error, isLoading } = useSWR<ApiReportResponse>("/api/reports", fetcher);
  const { data: indexData, isLoading: isIndexLoading } = useSWR<ApiResponse>("/api/index", fetcher);
  const params = useParams<{ reportId: string; reportName: string }>();
  const { reportIdContext, selectReportContext } = useAppContext();

  const [search, setSearch] = useState("");
  const [filteredTests, setFilteredTests] = useState<SpecDescribe[]>([]);

  const reportIdParam = params.reportId;
  const reportNameParam = params.reportName;

  
  const reportData = useMemo(() => {
    return data?.reports.filter((report) => `${report?.testDescribe}-${report?.reportId}` === `${reportNameParam}-${reportIdParam}`);
  }, [data, reportNameParam, reportIdParam]);

  useEffect(() => {
    // Refresh the context when changing reportIdParam or receiving new data
  }, [data, params, reportIdContext, selectReportContext]);

  useEffect(() => {
    if (reportData && reportData[0]?.specs) {
      if (search) {
        setFilteredTests(
          reportData[0].specs.filter(
            (test) =>
              test.specTitle.toLowerCase().includes(search.toLowerCase()) ||
              test.specId.toLowerCase().includes(search.toLowerCase()) ||
              test.specStatus.toLowerCase().includes(search.toLowerCase()) ||
              test.specMessage.toLowerCase().includes(search.toLowerCase()) ||
              test.specJiraTicket.toLowerCase().includes(search.toLowerCase()) ||
              test.specReporter.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else {
        setFilteredTests(reportData[0]?.specs);
      }
    }
  }, [search, reportData]);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Loading />;
  if (isIndexLoading) return <Loading />;

  if (reportIdParam) {
    const findReportId = indexData?.indexData?.some((report) => report.reportId === reportIdParam);
    if (!findReportId) return <div>Report not found</div>;
  } else {
    return false;
  }

  const { testDescribe, testDescribeId, testDescribePath, testDescribeDate, passCount, failCount, ticketsJira } = reportData?.[0] || {};

  const ticketsJiraArray = () => {
    if (!ticketsJira) {
      return <span>No tickets in the database.</span>;
    }
    let tickets = [];
    if (typeof ticketsJira === "string") {
      try {
        tickets = JSON.parse(ticketsJira);
      } catch (error) {
        console.error("Parsing error:", error);
        return <span>Invalid ticket format.</span>;
      }
    }
    if (tickets.length === 0) {
      return <span>No tickets in the database.</span>;
    }

    return tickets.map((ticket: string, index: number) => (
      <Fragment key={ticket}>
        <a href={`https://github.com/thiagobardini`} target='_blank' rel='noopener noreferrer'>
          {ticket}
        </a>
        {index < tickets.length - 1 ? <span> | </span> : null}
      </Fragment>
    ));
  };

  console.log("reportData", reportData);
  return (
    <>
      <Paper
        shadow='md'
        mb='xs'
        style={{
          marginBottom: "md",
          backgroundColor: "#f8f9fa",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }} justify='space-between' align='stretch'>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <div>
              <Text size='xs' c='dimmed' fw={400} className={classes.title}>
                Test name
              </Text>
              <Text fw='500' size='sm' className={classes.description}>
                {testDescribe}
              </Text>
            </div>
            <div>
              <Text size='xs' c='dimmed' fw={400} className={classes.title}>
                Test id
              </Text>
              <Text fw='500' size='sm' className={classes.description}>
                {testDescribeId}
              </Text>
            </div>
            <div>
              <Text size='xs' c='dimmed' fw={400} className={classes.title}>
                Test path
              </Text>
              <Text fw='500' size='sm' className={classes.description}>
                {testDescribePath}
              </Text>
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <div>
              <Text size='xs' c='dimmed' fw={400} className={classes.title}>
                API endpoint
              </Text>
              <Text fw='500' size='sm' className={classes.description}>
                {/* TODO: Refactor this to use the correct API endpoint */}
                Add an API endpoint to the report
              </Text>
            </div>

            <div>
              <Text size='xs' c='dimmed' fw={400} className={classes.title}>
                Tickets covered:
              </Text>
              <a href={`https://github.com/thiagobardini`} target='_blank' rel='noopener noreferrer'>
                <Text fw='500' size='sm' className={classes.description}>
                  {ticketsJiraArray()}
                </Text>
              </a>
            </div>
            <div>
              <Text size='xs' c='dimmed' fw={400} className={classes.title}>
                Generated
              </Text>
              <Text fw='500' size='sm' className={classes.description}>
                {testDescribeDate}
              </Text>
            </div>
          </Grid.Col>
        </Grid>
      </Paper>

      <ChangesDetected reportIdContextProps={reportIdContext} testName={testDescribe} />
      {selectReportContext === 0 && reportData && <TicketsCovered data={reportData as ReportDescribeTypes[]} />}

      {/* TODO: Add logic to show the video player only if the has video */}
      {/* <VideoPlayer src={testDescribe} alt='video' /> */}
      <StatusCount passCount={passCount ?? 0} failCount={failCount ?? 0} />

      <Divider my='md' />
      <Box
        style={{
          marginBottom: "md",
          backgroundColor: "#ffffff",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <Flex gap={20} justify='space-between' align='center' direction='row'>
          <Text fw='600' py='6' size='sm' className={classes.text}>
            <Text span size='xs' c='dimmed' fw={400} className={classes.title}>
              Total:
            </Text>{" "}
            {filteredTests.length.toString().padStart(3, "0")}
          </Text>
          <TextInput placeholder='Search for tests...' description='Search:' value={search} onChange={(event) => setSearch(event.currentTarget.value)} mb='md' style={{ width: "16rem" }} />
        </Flex>
        <Box className='table-responsive'>
          <ScrollArea w={1280} h={600} type='always' offsetScrollbars>
            <Table.ScrollContainer minWidth={500} type='native'>
              <Table striped highlightOnHover withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Test Name</Table.Th>
                    <Table.Th>Reported</Table.Th>
                    <Table.Th>Jira Ref</Table.Th>
                    <Table.Th>Screenshot</Table.Th>
                    <Table.Th>Description</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredTests?.map((item) => (
                    <Table.Tr key={item.specId} id={`testId-${item.specId}`} style={{ scrollMarginTop: "110px" }}>
                      <Table.Td>{item.specId}</Table.Td>
                      <Table.Td>
                        <Badge color={item.specStatus === "Pass" ? "green" : "red"}>{item.specStatus}</Badge>
                      </Table.Td>
                      <Table.Td>{item.specTitle}</Table.Td>
                      <Table.Td>{item.specReporter}</Table.Td>
                      <Table.Td>
                        {item.specJiraTicket
                          ? item.specJiraTicket.split(",").map((ticket, index) => (
                              <Fragment key={index}>
                                {index > 0 && " "}
                                <Link href={`https://github.com/thiagobardini`} target='_blank' rel='noopener noreferrer'>
                                  {ticket.trim()}
                                </Link>
                              </Fragment>
                            ))
                          : ""}
                      </Table.Td>

                      <Table.Td>
                        <ImageAccordionModal imageUrl={item.specScreenshotPath} message={item.specMessage} title={item.specUrl} />
                      </Table.Td>
                      <Table.Td>{item.specMessage}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </ScrollArea>
        </Box>
      </Box>
    </>
  );
};

export default Report;
