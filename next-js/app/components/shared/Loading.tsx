import React from "react";
import { Loader, Center } from "@mantine/core";

function Loading() {
  return (
    <Center style={{ width: "100vw", height: "60vh" }}>
      <Loader color='indigo' />
    </Center>
  );
}

export default Loading;
