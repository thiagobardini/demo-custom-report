import React from "react";
import { Flex } from "@mantine/core";
import PageHeader from "@/app/components/shared/PageHeader";

export const Header = () => {
    return (
        <Flex
            w="100%"
            direction="column"
            rowGap="1rem"
            pt="sm"
        >
            <PageHeader
                slogan="Playwright Test Report"
                title="Test Suite Overview"
                dotColor="dot1.0"
                titleFontWeight={600}
            />
        </Flex>
    )
}

export default Header;
