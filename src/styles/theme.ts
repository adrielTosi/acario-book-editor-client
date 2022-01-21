const theme = {
  colors: {
    bg_primary: "#2E3438",
    bg_comp_1: "#111B22",
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
  },

  font: {
    heading: "Work Sans",
    body: "Work Sans",
  },
};

export type Theme = typeof theme;

export default theme;