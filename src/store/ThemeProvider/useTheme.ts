import React, { useEffect, useState } from "react";
import { createMuiTheme, Theme, useMediaQuery } from "@material-ui/core";
import { darkTheme, lightTheme } from "./theme";

export function useTheme(): {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [state, setState] = useState(prefersDarkMode);

  useEffect(() => {
    setState(prevState => {
      if (prevState !== prefersDarkMode) {
        return prefersDarkMode;
      }
    });
  }, [prefersDarkMode]);

  const theme = React.useMemo(
    () => createMuiTheme(state ? darkTheme : lightTheme),
    [state]
  );

  return { theme, setTheme: setState };
}
