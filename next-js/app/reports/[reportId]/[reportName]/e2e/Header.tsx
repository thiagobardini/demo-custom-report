import React from "react";
import { Flex } from "@mantine/core";
import PageHeader from "@/app/components/shared/PageHeader";


export const HeaderReport = ({ title }: { title?: string }) => {
  const titleNoCamelCase = title ? title.split(/(?<=[a-z])(?=[A-Z])/g).join(" ") : "Default Title";

  return (
    <Flex w='100%' direction='column' rowGap='1rem' mt={{base: "xl", sm: "xs"}}>
      <PageHeader slogan='Playwright Test Report' title={titleNoCamelCase || "Default Title"} dotColor='dot1.0' titleFontWeight={600} />
    </Flex>
  );
};

export default HeaderReport;
