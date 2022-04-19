export const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

const theme = {
  colors: {
    bg_primary: "#111B22",
    bg_comp_1: "#2E3438",
    bg_comp_1_light: "#19232B",
    bg_comp_2: "#383E42",

    comp_outline: "#3A4349",
    contrast_low: "#566976",
    contrast_med: "#ACBAC3",
    contrast_high: "#FFFFFF",

    accent_1_200: "rgba(255, 220, 51, 0.8)",
    accent_1_500: "#FFD340",
    accent_1_600: "#EEC500",
    accent_1_700: "#D9B300",
    accent_1_bg_light: "rgba(255, 220, 51, 0.2)",

    accent_2_200: "rgba(172, 91, 229, 0.8)",
    accent_2_500: "#B449FD",
    accent_2_600: "#9237D3",
    accent_2_700: "rgba(180, 73, 253, 0.2)",

    danger: "#DC3545",
    danger_bg: "#F8E0E0",
    success: "#28A745",
    success_bg: "#FCF8E3",
    warning: "#FFC107",
    warning_bg: "#FCF8E3"
  },

  font: {
    heading: "Work Sans",
    body: "Work Sans",
  },

  device: {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
  }
};


export type Theme = typeof theme;

export default theme;
