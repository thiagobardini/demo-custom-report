"use client";

import { MantineTheme, MantineThemeOverride, createTheme } from "@mantine/core";

type MantineThemes = MantineTheme & MantineThemeOverride;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const theme = createTheme({
  fontFamily: '__Poppins_732638, __Poppins_Fallback_732638, sans-serif',
  breakpoints: {
    lg: "75em",
    md: "65em",
    sm: "48em",
    xl: "88em",
    xs: "36em"
  },
  colors: {
    text1: ['#FFFFFF', '#000000', '#0d0d0d', '#0071DB', '#FF6C2E', '#18AFD1', '#00B7DF', '#2C49AC', '#E9476E', '#0d0d0d'],
    text2: ['#FFC266', '#162B75', '#071D49', '#D9D9D9', '#AE3EB6', '#00807B', '#C24E00', '#764E9A', '#3A8131', '#546D9E'],
    text3: ['#BB446E', '#FF9416', '#6A68DF', '#2C78C9', '#677C13', '#833A1A', '#BA4597', '#B94A13', '#9E004D', '#996900'],
    text4: ['#00328D', '#102A65', '#687967'],
    background1: ['#FFFFFF', '#000000', '#FAFBFF', '#0d0d0d', '#EFF4FB', '#0071DB', '#1F3689', '#0086F6', '#1890FF'],
    background2: ['#FFA216', '#D5D9F0', '#FFDD86', '#F9FBFE', '#FAFAFA', '#FFC69F', '#F0F4FD', '#F0F4F9', '#E9F1FD', '#DC4147'],
    background3: ['#B9DDFF', '#DEEDFF', '#E0F0FF'],
    dot1: ['#146FAF', '#FFA216', '#1890FF', '#EE5CE7'],
    border1: ['#0d0d0d', '#808080', '#B3B3CC', '#E3E3E3', '#CBD1F9', '#FFB700'],
    button1: ['#0d0d0d', '#BB3EAB', '#85D3FF','#FFAF51', '#DBEEFF', '#005B46', '#9E004D', '#FFB169', '#0076B8', '#0074E0'],
    button2:['#CA4B0C'],
    icon1: [],
    divider1: ['#CFDAF4', '#0d0d0d', '#91B3FA'],
    articlesList1: ['#F9EAFA', '#E6F4F3', '#E6F1FF', '#FAEDE7', '#FFF6E8', '#F3F2F8'],
  },
  components: {
    Text: {
      styles: (theme: MantineThemes) => ({
        root: {
          color: theme.colors.text1[2],
        }
      })
    },
    Title: {
      styles: (theme: MantineThemes) => ({
        root: {
          color: theme.colors.text1[2],
        }
      })
    },
    Button: {
      styles: (theme: MantineThemes, {variant = ''}) => ({
        root: {
          transform: 'none',
          '&:active': {
            transform: 'none',
          },
          height: "3rem",
          borderRadius: 14,
          color: variant !== 'outline'
            ? theme.colors.text1[0]
            : theme.colors.text1[2],
          backgroundColor: variant !== 'outline'
            ? theme.colors.button1[0]
            : 'transparent',
          '&:hover': {
            backgroundColor: theme.colors.button1[0],
          },
          borderWidth: variant !== 'outline'
            ? 'none'
            : '2px',
          borderColor: variant !== 'outline'
            ? 'transparent'
            : theme.colors.button1[0]
        },
        input: {
          transform: 'none',
          '&:active': {
            transform: 'none',
          },
        }
      })
    },
    Card: {
      styles: () => ({
        root: {
          borderRadius: 20
        }
      })
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);
