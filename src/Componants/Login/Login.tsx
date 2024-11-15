import React, { useState } from "react";
import { googleLogin, login } from "../../services/authServices";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate("/e-commerce"); // Redirect to home page after login
    } catch (err) {
      if (err instanceof Error) {
        setError("Failed to log in. " + err.message);
      } else {
        setError("Failed to log in due to an unknown error.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google successfully!");
      navigate("/e-commerce"); // Redirect to home page after Google login
    } catch (err) {
      if (err instanceof Error) {
        setError("Google login failed. " + err.message);
      } else {
        setError("Google login failed due to an unknown error.");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          width: "100%",
          maxWidth: 400, // Limits the width of the box
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Sign In
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ marginBottom: 2 }}
        >
          Login
        </Button>

        <GoogleButton
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            marginBottom: 2,
            borderRadius: 8,
          }}
        />

        {error && <Typography color="error">{error}</Typography>}
      </Box>

      <ToastContainer />
    </Container>
  );
};

export default Login;