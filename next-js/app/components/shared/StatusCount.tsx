import React from "react";
import { Text, Badge, Group, Paper } from "@mantine/core";
import { CheckboxIcon, CrossCircledIcon } from "@radix-ui/react-icons";

function StatusCount({ passCount, failCount }: { passCount: number; failCount: number }) {
  return (
    <Paper withBorder shadow='md' p='sm' mt='md' radius='md' style={{ backgroundColor: "#f8f9fa" }}>
      <Group gap='xl' justify='center'>
        <Group gap='xs'>
          <CheckboxIcon color='#28a745' style={{ width: "20px", height: "20px" }} />
          <Text fw='500' size='lg'>
            Pass:
          </Text>
          <Badge color='green' variant='filled'>
            {passCount}
          </Badge>
        </Group>
        <Group gap='xs'>
          <CrossCircledIcon style={{ width: "20px", height: "20px", color: "red" }} />
          <Text fw='500' size='lg'>
            Fail:
          </Text>
          <Badge color='red' variant='filled'>
            {failCount}
          </Badge>
        </Group>
      </Group>
    </Paper>
  );
}

export default StatusCount;
