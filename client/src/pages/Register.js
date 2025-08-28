import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import API_BASE_URL from "../config/api";

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!inputs.name.trim()) {
      newErrors.name = "Name is required";
    } else if (inputs.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputs.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(inputs.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!inputs.password) {
      newErrors.password = "Password is required";
    } else if (inputs.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name.trim(),
        email: inputs.email.trim(),
        password: inputs.password,
      });
      
      if (data.success) {
        toast.success("Registration successful! Please login to continue.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 2, sm: 4 },
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid #e9ecef",
            backgroundColor: "#ffffff",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 3, sm: 4 },
              px: { xs: 2, sm: 4 },
              background: "linear-gradient(135deg, #4285F4 0%, #3367D6 100%)",
              color: "white",
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <PersonAddIcon sx={{ color: "white", fontSize: 32 }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.75rem", sm: "2rem" },
                fontFamily: "system-ui, -apple-system, sans-serif",
                mb: 1,
              }}
            >
              Create Account
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "16px",
                fontFamily: "system-ui, -apple-system, sans-serif",
                opacity: 0.9,
              }}
            >
              Join BlogSpace and share your stories
            </Typography>
          </Box>

          {/* Form */}
          <Box sx={{ p: { xs: 3, sm: 4 } }}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                value={inputs.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#9aa0a6", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    "&:hover fieldset": {
                      borderColor: "#4285F4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4285F4",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#4285F4",
                  },
                }}
              />

              <TextField
                fullWidth
                name="email"
                label="Email Address"
                placeholder="Enter your email address"
                type="email"
                value={inputs.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#9aa0a6", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    "&:hover fieldset": {
                      borderColor: "#4285F4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4285F4",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#4285F4",
                  },
                }}
              />

              <TextField
                fullWidth
                name="password"
                label="Password"
                placeholder="Create a strong password"
                type={showPassword ? "text" : "password"}
                value={inputs.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#9aa0a6", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        sx={{ color: "#9aa0a6" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    "&:hover fieldset": {
                      borderColor: "#4285F4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4285F4",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#4285F4",
                  },
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: "#4285F4",
                  color: "white",
                  py: 1.5,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  boxShadow: "none",
                  mb: 3,
                  "&:hover": {
                    backgroundColor: "#3367D6",
                    boxShadow: "none",
                  },
                  "&:disabled": {
                    backgroundColor: "#9aa0a6",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Login Link */}
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#5f6368",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Already have an account?{" "}
                  <MuiLink
                    component={Link}
                    to="/login"
                    sx={{
                      color: "#4285F4",
                      textDecoration: "none",
                      fontWeight: 500,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign in here
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
