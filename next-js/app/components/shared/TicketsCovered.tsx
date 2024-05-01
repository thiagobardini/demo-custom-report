import { Box, Title, Accordion, Group, Flex, Text, Table } from "@mantine/core";
import useSWR from "swr";
import { ApiReportResponse } from "@/app/utils/interfaces";
import Loading from "./Loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TicketsCovered = () => {
  const { data, error, isLoading } = useSWR<ApiReportResponse>("/api/reports", fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Loading />;

  if (!data || !Array.isArray(data.reports) || data.reports.length === 0) {
    return <div>No report data available</div>;
  }

  const { ticketsJira, specs } = data.reports[0] || {};

  const ticketsJiraArray = () => {
    if (!ticketsJira) {
      return [];
    }
    let tickets = [];
    if (typeof ticketsJira === "string") {
      try {
        tickets = JSON.parse(ticketsJira);
      } catch (error) {
        return [];
      }
    }
    return tickets;
  };

  
  const rows = () => {
  // Count the number of times each ticket appears in the specs
    const ticketCounts: { [key: string]: number } = {};
  
    specs.forEach((spec) => {
      if (spec.specJiraTicket) {
        // Divide the tickets string and remove whitespace
        const tickets = spec.specJiraTicket.split(",").map(t => t.trim());
  
        // Count each ticket
        tickets.forEach((ticket) => {
          if (ticket) {
            ticketCounts[ticket] = (ticketCounts[ticket] || 0) + 1;
          }
        });
      }
    }) 

    return Object.entries(ticketCounts).map(([ticket, count], index) => (
      <Table.Tr key={index}>
        <Table.Td>
          <a href={`https://github.com/thiagobardini`} target='_blank' rel='noopener noreferrer'>
            {ticket}
          </a>
        </Table.Td>
        <Table.Td>{count}</Table.Td>
      </Table.Tr>
    ));
  };
  
  return (
    <>
      <Box px='xs' pt='xs' my='xs' style={{ backgroundColor: "#f8f9fa", boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.1)", borderRadius: "8x" }}>
        <Box>
          <Accordion
            styles={{
              content: {
                padding: 0,
              },
            }}
          >
            <Accordion.Item value='ChangesDetected'>
              <Accordion.Control style={{ padding: "0px !important" }} p={0}>
                <Group wrap='nowrap'>
                  <div>
                    <Title order={5}>Tickets Covered:</Title>
                    <Text size='xs' c='dimmed' fw={400}>
                      Report id: {"No report id"}
                    </Text>
                  </div>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Flex justify='center'>
                  {ticketsJiraArray().length === 0 ? (
                    <Text size='xs' c='dimmed' fw={400}>
                      No tickets in the database.
                    </Text>
                  ) : (
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Ticket</Table.Th>
                          <Table.Th>Total</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{rows()}</Table.Tbody>
                    </Table>
                  )}
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Box>
      </Box>
    </>
  );
};

export default TicketsCovered;
