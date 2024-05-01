"use client";

import React from "react";
import { Flex, Text, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear() || "";
  const isTabletSize = useMediaQuery("(max-width: 1039px)");

  return (
    <Box>
      <Flex className='footer' gap='0.5rem' justify='center' align='center' direction='row' wrap='wrap' rowGap={5} bg='background1.6' py={30} w='100%'>
        <Link href='https://www.tbardini.com/'>
          <Image src={"/images/TBardini-dot-light.png"} alt={"TBardini navigation logo"} width={isTabletSize ? 100 : 100} height={isTabletSize ? 50 : 75} />
        </Link>
        <a href='/'>
          <Text c='text1.0' fw='bolder' fz={isTabletSize ? "0.75rem" : "1rem"} pt='xs'>
            &copy; {year}
          </Text>
        </a>
      </Flex>
    </Box>
  );
};

export default Footer;
