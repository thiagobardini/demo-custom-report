import React, { useEffect, useState, useCallback } from "react";
import { Text, Paper, Badge, Box, Title, Anchor, Accordion, Group } from "@mantine/core";
import { ChangesDetectedProps, ChangesTestDetails } from "@/app/utils/interfaces";
import Loading from "./Loading";

interface ChangesDetectedComponentProps {
  testName: string | undefined;
  compact?: boolean;
  reportIdContextProps: string;
}

const ChangesDetected = ({ reportIdContextProps, testName, compact }: ChangesDetectedComponentProps) => {
  const [changes, setChanges] = useState<ChangesDetectedProps | null>(null);
  const [loading, setLoading] = useState(true);

  const isCompact = compact ?? false;

  const loadChanges = useCallback(() => {
    setChanges(null); // Reset changes
    if (!reportIdContextProps || !testName) return;

    const fileName = `${testName}-changes-${reportIdContextProps}.json`;
    setLoading(true);
    fetch(`/data/${testName}/history/${fileName}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((result) => setChanges(result))
      .catch((error) => {
        console.error("Failed to load the JSON file ", error);
      })
      .finally(() => setLoading(false));
  }, [reportIdContextProps, testName]);

  useEffect(() => {
    loadChanges();
  }, [loadChanges]);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  const changesDetected = changes?.changesDetected ?? [];

  const renderChanges = (changes: ChangesTestDetails[]) => {
    return changes.map((change, index) => {
      const { testId, title, newTest, reporter, previous, actual } = change.testDetails;
      const itemBackground = index % 2 === 0 ? "#ffffff" : "#f0f0f0";

      const textStyle = isCompact ? "xs" : "sm";
      const paddingStyle = isCompact ? "2px" : "10px";
      const boxMarginBottom = isCompact ? "md" : "md";
      const badgeVariant = isCompact ? "light" : "filled";

      const changeContent = (
        <Box key={index} style={{ marginBottom: boxMarginBottom, backgroundColor: itemBackground, padding: paddingStyle }}>
          <Text size={textStyle} style={{ marginBottom: "4px" }}>
            <Badge color={actual?.statusChange === "Pass" ? "green" : "red"} variant={badgeVariant}>
              {testId}
            </Badge>{" "}
            Reported by:{" "}
            <Text span fw={700}>
              {reporter}
            </Text>{" "}
            -{" "}
            <Text span fw={700}>
              {title}
            </Text>
            :
            {!newTest && previous && (
              <>
                <Text span size={textStyle}>
                  {previous.statusChange && (
                    <>
                      <Text span> Status changed from </Text>
                      <Badge color='orange' variant={badgeVariant}>
                        {previous.statusChange}
                      </Badge>
                      <Text span> to </Text>
                      <Badge color={actual?.statusChange === "Pass" ? "green" : "red"}>{actual?.statusChange}</Badge>.
                    </>
                  )}
                  {previous.messageChange && (
                    <>
                      <Text span> Description changed from </Text>
                      <Text span style={{ textDecoration: "line-through" }}>
                        {previous.messageChange}
                      </Text>
                      <Text span> to </Text>
                      <Text span fw={700}>
                        {actual?.messageChange}.
                      </Text>
                    </>
                  )}
                </Text>
              </>
            )}
            {newTest && (
              <Text span size={textStyle}>
                <Text span> New test reported: </Text>
                <Text span fw={700}>
                  {actual?.messageChange} .
                </Text>
              </Text>
            )}
          </Text>
        </Box>
      );
      return !isCompact ? (
        <Anchor key={testId} href={`#testId-${testId}`} underline='never'>
          {changeContent}
        </Anchor>
      ) : (
        changeContent
      );
    });
  };

  // Changes detected style
  const backGroundColor = !isCompact ? "#f8f9fa" : "#ffffff";
  const paddingXStyle = !isCompact ? "10px" : "0";
  const paddingYStyle = !isCompact ? 2 : 0;
  const boxShadowStyle = !isCompact ? "0px 1px 2px 0px rgba(0, 0, 0, 0.1)" : undefined;
  const borderRadiusStyle = !isCompact ? "8px" : 0;
  const marginStyle = !isCompact ? "sm" : 0;
  const boxMarginBottom = isCompact ? "md" : "md";

  // No changes detected style
  const textStyle = isCompact ? "sm" : "sm";
  const paddingStyle = isCompact ? "sm" : "sm";
  const boxMargin = isCompact ? 0 : 0;
  const paddingXYStyle = isCompact ? 0 : "xs";

  return (
    <>
      {changesDetected && changesDetected.length === 0 ? (
        <Paper shadow='xs' p={paddingXYStyle} my={boxMargin}>
          <Box py={paddingStyle} w="auto" style={{ backgroundColor: "#f0f0f0" }}>
            <Text size={textStyle} px="xs"   style={{ textAlign: "center" }}>
              No changes have been detected from the previous test.
            </Text>
          </Box>
        </Paper>
      ) : (
        <Box
          px={paddingXStyle}
          pt={paddingYStyle}
          mt={marginStyle}
          style={{ marginBottom: boxMarginBottom, backgroundColor: backGroundColor, boxShadow: boxShadowStyle, borderRadius: borderRadiusStyle }}
        >
          <>
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
                      <Title order={5}>Changes Detected: {changes?.changesDetected ? changes.changesDetected.length : 0}</Title>
                      <Text size='xs' c='dimmed' fw={400}>
                        Report id: {reportIdContextProps}
                      </Text>
                    </div>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>{renderChanges(changesDetected)}</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </>
        </Box>
      )}
    </>
  );
};

export default ChangesDetected;
