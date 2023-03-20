// Packages
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

// MUI Components
import { ThemeProvider } from "@mui/material/styles";
import { createTheme, CssBaseline } from "@mui/material";

// Pages
import { Cart, Login, Products, Layout } from "scenes";
// Components
import PublicRoute from "components/PublicRoute";
import ProtectedRoute from "components/ProtectedRoute";

// Theme
import { themeSettings } from "theme";

const App = () => {
  const mode = useSelector((state) => state.global.mode);
  const userId = useSelector((state) => state.global.userId);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute isLoggedIn={userId !== ""}>
                  <Login />
                </PublicRoute>
              }
            />

            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/products" replace />} />

              <Route
                path="/products"
                element={
                  <ProtectedRoute isLoggedIn={userId !== ""}>
                    <Products />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute isLoggedIn={userId !== ""}>
                    <Cart />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
