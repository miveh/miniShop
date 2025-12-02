import { createTheme } from "@mui/material";
import lightPalette from "./lightPalette";
import darkPalette from "./darkPalette";

const initTheme = () =>
  createTheme({
    colorSchemes: {
      light: {
        palette: lightPalette,
      },
      dark: {
        palette: darkPalette,
      },
    },
    spacing: "4px",
  });
export default initTheme;
