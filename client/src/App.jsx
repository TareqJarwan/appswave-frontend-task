// Packages
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

// Pages
import {
  Cart,
  Login,
  Products,
  Layout
} from 'scenes';

import { ThemeProvider } from "@mui/material/styles";
import { createTheme, CssBaseline } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";


const App = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes element={<Layout />}>
            <Route path="/" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
