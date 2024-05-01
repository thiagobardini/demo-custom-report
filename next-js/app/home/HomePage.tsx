"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Container, Text, Card, Badge, Divider, Button, Flex, SimpleGrid } from "@mantine/core";
import Header from "./Header";
import { ApiResponse, TestReport } from "../utils/interfaces";
import ChangesDetected from "../components/shared/ChangesDetected";
import Loading from "../components/shared/Loading";
import { useAppContext } from "@/context";

type TestBadgeProps = {
  count: number;
  label: string;
  color: string;
};

const TestBadge: React.FC<TestBadgeProps> = ({ count, label, color }) => (
  <Badge color={color} variant='light'>
    {label}: {count}
  </Badge>
);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HomePage = () => {
  const { data, error, isLoading } = useSWR<ApiResponse>("/api/index", fetcher);
  const { selectReportContext, setSelectReportContext, reportIdContext } = useAppContext();

  const router = useRouter();

  useEffect(() => {}, [data, selectReportContext, setSelectReportContext, reportIdContext]);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Loading />;
  if (!data || !Array.isArray(data.indexData) || data.indexData.length === 0) {
    return <div>No report data available</div>;
  }

  const indexdData = data?.indexData.filter((report) => report?.reportId === reportIdContext);

  const { reportId, reportDate, tests } = indexdData[0] || {};

  return (
    <>
      <Container size='xl' mt='lg'>
        <Header />
        {indexdData ? (
          <>
            <Flex direction='row' align={{ base: "flex-start", sm: "flex-start" }} justify='center' gap='lg' wrap='wrap' w='100%' my='1rem'>
              <div>
                <Text size='xs' c='dimmed' fw={400}>
                  Test Report ID:
                </Text>
                <Text fw='500' size='sm'>
                  {reportId}
                </Text>
              </div>
              <Divider orientation='vertical' color='divider1.0' />
              <div>
                <Text size='xs' c='dimmed' fw={400}>
                  Generated:
                </Text>
                <Text fw='500' size='sm'>
                  {reportDate}
                </Text>
              </div>
            </Flex>

            <Divider style={{ flex: 1 }} mb='xs' size='sm' color='divider1.0' orientation='horizontal' />

            <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} spacing='sm'>
              {tests?.map((test: TestReport, index: number) => (
                <Card key={index} shadow='sm' p='md' radius='sm'>
                  <Flex direction={{ base: "column", md: "row" }} gap='xs' align={{ base: "flex-start", md: "center" }}>
                    <Text size='sm' fw={700}>
                      {test.testPath}
                    </Text>
                    <div>
                      <TestBadge count={test.passCount} label='Passes' color='green' />
                      <TestBadge count={test.failCount} label='Fails' color='red' />
                      <TestBadge count={test.totalTests} label='Total' color='gray' />
                    </div>
                  </Flex>
                  <Divider my='sm' />
                  <div>
                    <ChangesDetected reportIdContextProps={reportIdContext} testName={test.dirName} compact={true} />
                    <Flex justify='center'>
                      <Button variant='outline' fullWidth size='sm' mt='sm' onClick={() => router.push(`/reports/${reportId}/${test.title}/e2e`)}>
                        View Details
                      </Button>
                    </Flex>
                  </div>
                </Card>
              ))}
            </SimpleGrid>
          </>
        ) : (
          <Text>No test reports found for the selected ID.</Text>
        )}
      </Container>
    </>
  );
};

export default HomePage;
