import * as React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth"

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme();

const SignIn = (props) => {
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [login, {error}] = useMutation(LOGIN_USER);


    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    
      // submit form
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await login({
            variables: { ...formState },
          });
    console.log(data.login.token);
          Auth.login(data.login.token);
        } catch (e) {
          console.error(e);
        }
    
        // clear form values
        setFormState({
          email: '',
          password: '',
        });
      };

  return (
    <ThemeProvider theme={theme}>
      <Container id="login-container" component="main" maxWidth="xs" onSubmit={handleSubmit}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#152741" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          {/* <Typography component="h1" variant="h5">
            LOG IN
          </Typography> */}
          <Box
            component="form"
            
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="login-email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formState.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="login-password"
              autoComplete="current-password"
              value={formState.password}
              onChange={handleChange}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              id="login-btn"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LOG IN
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account?  SIGN UP"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
