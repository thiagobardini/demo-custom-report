import React from "react";
import { metadata } from "./utils/metada";
import { ColorSchemeScript, BackgroundImage } from "@mantine/core";
import { Poppins } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { theme } from "../theme";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { AppWrapper } from "../context/index";

const poppins = Poppins({
  subsets: ["devanagari", "latin", "latin-ext"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
        <link rel='icon' type='image/png' sizes='16x16' href='./images/tbtag.png' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no' />
        <title>{String(metadata.title) || "DEMO REPORT"}</title>
        <meta name='description' content={String(metadata.description) || "TBardini's Playwright e2e test demo."} />
      </head>

      <body>
        <MantineProvider theme={theme}>
          <AppWrapper>
            <Analytics />
            <BackgroundImage w='100%' h='100%' src={"/estimate-page-background.svg"} style={{ backgroundRepeat: "repeat", backgroundSize: "cover" }}>
              <main className={`${poppins.className} main-container`}>
                <Navbar />
                <div className='flex-grow md:mt-28 mt-20'>{children}</div>
              </main>
              <Footer />
            </BackgroundImage>
          </AppWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}
