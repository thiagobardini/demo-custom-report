import React, { useEffect, useState } from "react";
import { Accordion, Card, Table, TextInput, Title, Box, Badge, Flex } from "@mantine/core";
import ImageAccordionModal from "./ImageAccordionModal";
import { Report, Spec } from "../../utils/interfaces";
import Loading from "./Loading";

const MissingTests = () => {
  const [latestJsonData, setLatestJsonData] = useState<Report | null>(null);
  const [previousJsonData, setPreviousJsonData] = useState<Report | null>(null);
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);
  const [previousReportId, setPreviousReportId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filteredTests, setFilteredTests] = useState<Spec[]>([]);

  useEffect(() => {
    fetch("/data/reportId.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const numericId = parseInt(data.reportId, 10); 
        const adjustedReportNumericId = numericId - 1;
        const adjustedReportId = adjustedReportNumericId.toString().padStart(3, "0"); 
        setCurrentReportId(adjustedReportId); // Current report id
        const previousAdjustedNumericId = numericId - 2; 
        const previousAdjustedReportId = previousAdjustedNumericId.toString().padStart(3, "0"); 
        setPreviousReportId(previousAdjustedReportId); // Previous report id
      })
      .catch((error) => {
        console.error("Failed to load reportId.json", error);
        setError(`Failed to load - fetch("/data/reportId.json"): ${error.message}`);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentReportId) {
      setLoading(true);
      fetch(`/public/data/WordsServedEstimatePage/WordsServedEstimatePage-${currentReportId}.json`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then(
          (result) => {
            setLatestJsonData(result);
            setLoading(false);
          },
          (error) => {
            console.error("Failed to load the JSON file", error);
            setError(`Failed to load - fetch(/public/data/WordsServedEstimatePage/WordsServedEstimatePage-${currentReportId}.json): ${error.message}`);
            setLoading(false);
          }
        );
    }
  }, [currentReportId]);

  useEffect(() => {
    if (previousReportId) {
      setLoading(true);
      fetch(`/public/data/WordsServedEstimatePage/WordsServedEstimatePage-${previousReportId}.json`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then(
          (result) => {
            setPreviousJsonData(result);
            setLoading(false);
          },
          (error) => {
            console.error("Failed to load the JSON file", error);
            setError("Failed to load data");
            setLoading(false);
          }
        );
    }
  }, [previousReportId]);

  // This function compares two sets of tests and returns the ones that are missing
  function findMissingTests(currentTests: Spec[], previousTests: Spec[]): Spec[] {
    const currentTestIds = new Set(currentTests.map((test) => test.testId));
    return previousTests.filter((test) => !currentTestIds.has(test.testId));
  }

  // Define the missingTests array and populate it with the missing tests
  let missingTests: Spec[] = [];
  if (latestJsonData && previousJsonData) {
    missingTests = findMissingTests(latestJsonData.specs, previousJsonData.specs);
  }

  // useEffect(() => {
  //   if (search) {
  //     setFilteredTests(
  //       missingTests.filter(
  //         (test) =>
  //           test.title.toLowerCase().includes(search.toLowerCase()) ||
  //           test.testId.toLowerCase().includes(search.toLowerCase()) ||
  //           test.status.toLowerCase().includes(search.toLowerCase()) ||
  //           test.message.toLowerCase().includes(search.toLowerCase()) ||
  //           test.jiraTicket.toLowerCase().includes(search.toLowerCase()) ||
  //           test.reporter.toLowerCase().includes(search.toLowerCase())
  //       )
  //     );
  //   } else {
  //     setFilteredTests(missingTests);
  //   }
  // }, [latestJsonData, previousJsonData, search]);

  useEffect(() => {
    let missingTests: Spec[] = [];
  
    if (latestJsonData && previousJsonData) {
      missingTests = findMissingTests(latestJsonData.specs, previousJsonData.specs);
    }
  
    if (search) {
      setFilteredTests(
        missingTests.filter(
          (test) =>
            test.title.toLowerCase().includes(search.toLowerCase()) ||
            test.testId.toLowerCase().includes(search.toLowerCase()) ||
            test.status.toLowerCase().includes(search.toLowerCase()) ||
            test.message.toLowerCase().includes(search.toLowerCase()) ||
            test.jiraTicket.toLowerCase().includes(search.toLowerCase()) ||
            test.reporter.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredTests(missingTests);
    }
  }, [latestJsonData, previousJsonData, search]);
  

  if (loading) return <div><Loading/></div>;
  if (error) return <div>Error WordsServedEstimatePage: {error}</div>;

  const accordionContent = (
    <>
      <Box style={{ marginBottom: "md", backgroundColor: "#ffffff", padding: "10px", borderRadius: "8px" }}>
        <Accordion.Item value='Missing Tests'>
          <Accordion.Control>
            <Flex gap={20} justify='space-between' align='center' direction='row'>
              <Title order={4}>Missing Tests:  {missingTests.length}</Title>
            </Flex>
          </Accordion.Control>
          <Accordion.Panel>
              <TextInput placeholder='Search for tests...' description='Search:' value={search} onChange={(event) => setSearch(event.currentTarget.value)} mb='md' style={{ width: "16rem" }} />
            <Table striped highlightOnHover withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Id</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Reporter</Table.Th>
                  <Table.Th>Jira Ref</Table.Th>
                  <Table.Th>Screenshot</Table.Th>
                  <Table.Th>Description</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredTests.map((test, index) => (
                  <Table.Tr key={test.testId} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f0f0f0" }}>
                    <Table.Td>{test?.testId}</Table.Td>
                    <Table.Td>
                      <Badge color={test?.status === "Pass" ? "green" : "red"}>{test?.status}</Badge>
                    </Table.Td>
                    <Table.Td>{test?.title}</Table.Td>
                    <Table.Td>{test?.reporter}</Table.Td>
                    <Table.Td>{test?.jiraTicket}</Table.Td>
                    <Table.Td>
                      <ImageAccordionModal imageUrl={test.screenshotPath} message={test.message} title={test?.websiteUrl} />
                    </Table.Td>
                    <Table.Td>{test.message}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Accordion.Panel>
        </Accordion.Item>
      </Box>
    </>
  );

  return (
    <>
      {missingTests.length > 0 && (
        <Card shadow='sm' padding='lg' radius='md' style={{ backgroundColor: "#f8f9fa" }} mt='md'>
          <Accordion styles={{ item: { borderBottom: 0 } }}>{accordionContent}</Accordion>
        </Card>
      )}
    </>
  );
};

export default MissingTests;
