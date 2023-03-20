// Packages
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// MUI Components
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// MUI Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// API Data
import { useLoginMutation } from "state/api";
import { setUserId } from "state";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isSuccess, isLoading, isError, error, data }] =
    useLoginMutation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });

    login({
      username: data.get("username"),
      password: data.get("password"),
    });
  };

  if (isSuccess) {
    dispatch(setUserId(data.id));
    navigate("/products");
  }

  return (
    <Box>
      <Grid container component="main">
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} square marginX="auto">
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login Page
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                type="text"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <LoadingButton
                loading={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={isError} autoHideDuration={6000}>
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          {error?.data?.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
