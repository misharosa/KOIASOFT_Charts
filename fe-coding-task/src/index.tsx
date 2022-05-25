import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";
import { HomePage } from "./components/HomePage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

declare module '@mui/material/styles' {
        interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

const theme: ThemeOptions = createTheme({
    status: {
        danger: 'white',
    },
});

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <ThemeProvider theme={theme}>
            <HomePage />
          </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>
);
