import { Box, Title, Accordion, Group, Flex, Text, Table } from "@mantine/core";
import { ReportDescribeTypes } from "@/app/utils/interfaces";

interface ReportDataTicket {
  data: ReportDescribeTypes[];
}

const TicketsCovered = (data: ReportDataTicket) => {
  const { ticketsJira, specs } = data.data[0] || {};

  const activeTickets: string[] = [];

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
        const tickets = spec.specJiraTicket.split(",").map((t) => t.trim());

        // Count each ticket
        tickets.forEach((ticket) => {
          if (ticket) {
            ticketCounts[ticket] = (ticketCounts[ticket] || 0) + 1;
            if (ticketCounts[ticket] > 0) {
              // if the ticket is not already in the activeTickets array, add it
              if (!activeTickets.includes(ticket)) {
                activeTickets.push(ticket);
              }
            }
          }
        });
      }
    });
    return Object.entries(ticketCounts).map(([ticket, count], index) => (
      <Table.Tr key={index}>
        <Table.Td>
          <a href={`https://techqa1.translations.com/browse/${ticket}`} target='_blank' rel='noopener noreferrer'>
            {ticket}
          </a>
        </Table.Td>
        <Table.Td>{count}</Table.Td>
      </Table.Tr>
    ));
  };

  // Listen to the activeTickets array
  rows();

  console.log(activeTickets, "activeTickets");
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
                    {activeTickets.length === 0 ? <Title order={5}>No Active Tickets</Title> : <Title order={5}>Active Failed Tickets</Title>}

                    <Text size='xs' c='red' fw={400}>
                      {activeTickets.join(" | ")}
                    </Text>
                  </div>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Flex justify='center'>
                  {activeTickets.length === 0  ? (
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
