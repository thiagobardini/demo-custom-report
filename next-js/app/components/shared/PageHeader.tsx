import React from "react";
import { Flex, Text } from "@mantine/core";

const PageHeader = ({ slogan, title, dotColor, textColor, titleFontWeight }: { slogan: string; title: string; dotColor: string; textColor?: string; titleFontWeight?: number }) => (
  <Flex w='100%' justify='center' wrap='wrap' rowGap='0.75rem' my={{ base: "0.7rem", sm: "2rem" }}>
    <Text tt='uppercase' c={textColor || "text1.9"} ta='center' fz='1rem' fw={500}>
      <Text style={{ display: "inline-block", marginRight: "0.5rem" }} span>
        <Text display='block' bg={dotColor} w='0.7rem' h='0.7rem' style={{ borderRadius: 100 }} span />
      </Text>
      {slogan}
    </Text>
    <Text w='100%' ta='center' fz={{ base: "1.8rem", sm: "3rem" }} fw={titleFontWeight || 700} lh={{base:'2rem', xs: "3rem"}} c={textColor || "text1.9"}>
      {title}
    </Text>
  </Flex>
);

export default PageHeader;
