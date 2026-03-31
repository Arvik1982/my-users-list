export const typography = {
  desktop: {
    title: { weight: 600, size: 24 },
    headline: { weight: 600, size: 20 },
    text1: {
      semibold: { weight: 600, size: 18 },
      medium: { weight: 500, size: 18 },
    },
    text2: {
      semibold: { weight: 600, size: 16 },
      medium: { weight: 500, size: 16 },
    },
    caption: { weight: 400, size: 14 },
  },
  mobile: {
    title1: { weight: 600, size: 24 },
    headline: { weight: 600, size: 18 },
    text1: {
      semibold: { weight: 600, size: 16 },
      medium: { weight: 500, size: 16 },
    },
    text2: {
      semibold: { weight: 600, size: 14 },
      medium: { weight: 500, size: 14 },
    },
    caption2: { weight: 600, size: 10 },
  },
} as const;
