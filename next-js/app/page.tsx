import React from "react";
import HomePage from "./home/HomePage";
import { populateDatabase } from "./db/scripts/populateDatabase";
import { Box } from "@mantine/core";


export default async function Home() {
  // Populate the database with data from Json files in the 'public/data' directory
  populateDatabase();

  return (
    <Box mb="lg">
      <HomePage />
    </Box>
  );
}
