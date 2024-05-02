"use client";

import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/context";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { Box, Flex, Text, Transition, Burger, Paper, Anchor } from "@mantine/core";
import SelectPreviousReport from "../shared/SelectPreviousReport";
import HistoryBanner from "@/app/components/shared/HistoryBanner";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const { selectReportContext } = useAppContext();
  const [opened, { toggle: toggleDropdown, close: closeDropdown }] = useDisclosure(false);

  const isTabletSize = useMediaQuery("(max-width: 1039px)");

  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown
  const burgerRef = useRef<HTMLButtonElement>(null); // Ref for the burger icon

  // Setup event listener for outside clicks
  useEffect(() => {
    // Specify the type for 'event' as 'MouseEvent'
    const handleOutsideClick = (event: MouseEvent) => {
      // Ensure the elements exist before calling 'contains'
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && burgerRef.current && !burgerRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (opened) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [opened, closeDropdown]);

  const isHistoryPage = pathname.endsWith("/e2e/history");
  const isReportPage = pathname.endsWith("/e2e") && !isHistoryPage;

  return (
    <>
      <Box maw={1280}>
        <Flex
          w='100%'
          // className='md:h-28 sm:h20 py-2'
          className='py-2'
          pt={isTabletSize ? 10 : 20}
          bg='background1.2'
          pos='fixed'
          top={0}
          style={{
            zIndex: 299,
            boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box w='100%' h='100%' maw={1280} mx='auto' px='1rem' pt={isTabletSize ? 0 : 20}>
            <Flex h='100%' w='100%' justify={{ base: "center", sm: "space-between" }} align='center' px='1rem'>
              <Link href='/' onClick={closeDropdown}>
                <Flex justify={{ base: "center", sm: "space-between" }} align='center' direction='row'>
                  <Box display={{ base: "none", md: "block" }} style={{ position: "fixed", mr: 2 }}>
                    <Image src={"/animations/tb-logo-glasses.gif"} alt={"TBardini navigation logo"} width={120} height={75} />
                  </Box>
                  <Box display={{ base: "block", md: "none" }}>
                    <Image src={"/images/tbtag.png"} alt={"TBardini navigation logo"} width={70} height={70} />
                  </Box>
                  <Text display={{ base: "block", sm: "block" }} c='text1.9' pl={{ base: "10px", md: "130px" }} style={{ fontSize: isTabletSize ? "1.4rem" : "2.4rem", fontWeight: 700 }}>
                    DEMO REPORT
                  </Text>
                </Flex>
              </Link>
              {!isTabletSize && (
                <Flex align='center' justify='center' gap='lg'>
                  <Box mt='lg'>
                    {/* Link to the history page of the current report */}
                    {isReportPage && (
                      <Link href={`${pathname}/history`}>
                        <Anchor fw='600' component='a' size='sm' c='text1.9' underline='hover'>
                          History View
                        </Anchor>
                      </Link>
                    )}
                    {isHistoryPage && (
                      <Link href={pathname.replace("/e2e/history", "/e2e")}>
                        <Anchor fw='600' component='a' size='sm' c='text1.9' underline='hover'>
                          Back to Report
                        </Anchor>
                      </Link>
                    )}
                  </Box>

                  <SelectPreviousReport closeDropdown={closeDropdown} />
                </Flex>
              )}
              {isTabletSize && (
                <>
                  <Burger ref={burgerRef} ml='auto' display={{ base: "initial", md: "none" }} color='#00205B' opened={opened} onClick={toggleDropdown} aria-label='Toggle navigation' />

                  <Transition transition='slide-down' duration={100} mounted={opened}>
                    {(styles) => (
                      <Paper ref={dropdownRef} withBorder shadow='md' p='md' style={{ ...styles, position: "absolute", top: "100%", left: 0, right: 0, zIndex: 500 }}>
                        <SelectPreviousReport closeDropdown={closeDropdown} />
                        <Box mt='lg' style={{ textAlign: "center" }} onClick={toggleDropdown}>
                          {isReportPage && (
                            <Link href={`${pathname}/history`}>
                              <Anchor fw='600' component='a' size='sm' c='text1.9' underline='hover'>
                                History View
                              </Anchor>
                            </Link>
                          )}
                          {isHistoryPage && (
                            <Link href={pathname.replace("/e2e/history", "/e2e")}>
                              <Anchor fw='600' component='a' size='sm' c='text1.9' underline='hover'>
                                Back to Report
                              </Anchor>
                            </Link>
                          )}
                        </Box>
                      </Paper>
                    )}
                  </Transition>
                </>
              )}
            </Flex>
          </Box>
        </Flex>
        {selectReportContext !== 0 && (
          <Box style={{ position: "fixed", zIndex: 2 }} top={isTabletSize ? "90px" : "108px"} right='0' w='100%' mx='auto'>
            <HistoryBanner closeDropdown={closeDropdown} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Navbar;
