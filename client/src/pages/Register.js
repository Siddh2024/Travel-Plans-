import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authActions";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleOutlineIcon from "@mui/icons-material/TaskAlt";
import ArrowForwardIcon from "@mui/icons-material/East";
import ArrowBackIcon from "@mui/icons-material/West";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ExploreIcon from "@mui/icons-material/Explore";

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const steps = ["Personal Info", "Account Setup", "Confirmation"];

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = name === "agreeTerms" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    if (
      name === "confirmPassword" ||
      (name === "password" && formData.confirmPassword)
    ) {
      if (name === "password" && value !== formData.confirmPassword) {
        setPasswordError("Passwords do not match");
      } else if (name === "confirmPassword" && value !== formData.password) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep === steps.length - 1) {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
      };
      dispatch(register(payload, navigate));
    } else {
      handleNext();
    }
  };

  const isNextDisabled = () => {
    if (activeStep === 0) {
      return !formData.firstName || !formData.lastName;
    } else if (activeStep === 1) {
      return (
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        passwordError ||
        !formData.agreeTerms
      );
    }
    return false;
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#0D1B2A",
                mb: 3,
              }}
            >
              {"Let's get to know you"}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#14B8A6",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#14B8A6",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#14B8A6",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#14B8A6",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Typography
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#0D1B2A",
                mb: 3,
              }}
            >
              Create your account
            </Typography>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#14B8A6",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#14B8A6",
                },
              }}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      edge="end"
                      sx={{ color: "#64748B" }}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#14B8A6",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#14B8A6",
                },
              }}
            />
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!passwordError}
              helperText={passwordError}
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: passwordError ? "#EF4444" : "#14B8A6",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: passwordError ? "#EF4444" : "#14B8A6",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  name="agreeTerms"
                  sx={{
                    color: "#94A3B8",
                    "&.Mui-checked": {
                      color: "#14B8A6",
                    },
                  }}
                  required
                />
              }
              label={
                <Typography sx={{ fontSize: "0.875rem", color: "#64748B" }}>
                  I agree to the{" "}
                  <Link
                    component={RouterLink}
                    to="/terms"
                    sx={{
                      fontWeight: 600,
                      color: "#14B8A6",
                      textDecoration: "none",
                    }}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    component={RouterLink}
                    to="/privacy"
                    sx={{
                      fontWeight: 600,
                      color: "#14B8A6",
                      textDecoration: "none",
                    }}
                  >
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
          </>
        );
      case 2:
        return (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
                boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
              }}
            >
              <CheckCircleOutlineIcon
                sx={{ fontSize: 44, color: "white" }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#0D1B2A",
                mb: 1,
              }}
            >
              Almost there!
            </Typography>
            <Typography
              sx={{ color: "#64748B", fontSize: "0.9375rem", mb: 3 }}
            >
              Please review your information:
            </Typography>
            <Box
              sx={{
                textAlign: "left",
                mb: 3,
                p: 2.5,
                background: "#F8FAFC",
                borderRadius: "12px",
                border: "1px solid rgba(13, 27, 42, 0.06)",
              }}
            >
              <Typography
                sx={{ fontSize: "0.875rem", color: "#64748B", mb: 1 }}
              >
                <Box component="span" sx={{ fontWeight: 600, color: "#0D1B2A" }}>
                  Name:
                </Box>{" "}
                {formData.firstName} {formData.lastName}
              </Typography>
              <Typography sx={{ fontSize: "0.875rem", color: "#64748B" }}>
                <Box component="span" sx={{ fontWeight: 600, color: "#0D1B2A" }}>
                  Email:
                </Box>{" "}
                {formData.email}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
              {"By clicking \"Create Account\", you agree to our terms and privacy policy."}
            </Typography>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "#F8FAFC",
      }}
    >
      {/* Left side with premium visual */}
      {!isMobile && (
        <Box
          sx={{
            flex: 1,
            background: "linear-gradient(145deg, #0D1B2A 0%, #1B3A5C 45%, #1E4976 100%)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Ambient glow effects */}
          <Box
            sx={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "60%",
              height: "140%",
              background: "radial-gradient(ellipse, rgba(20, 184, 166, 0.1) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "-30%",
              left: "-10%",
              width: "50%",
              height: "100%",
              background: "radial-gradient(ellipse, rgba(255, 107, 90, 0.08) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          
          {/* Content */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              px: 6,
              maxWidth: 520,
            }}
          >
            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                mb: 4,
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 30px rgba(20, 184, 166, 0.3)",
                }}
              >
                <ExploreIcon sx={{ color: "white", fontSize: 28 }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "white",
                  letterSpacing: "-0.5px",
                }}
              >
                Pack
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #FF6B5A 0%, #FF8A7D 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Go
                </Box>
              </Typography>
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                color: "white",
                mb: 2,
                fontSize: "2.5rem",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Start Your Journey Today
            </Typography>
            
            <Typography
              sx={{
                color: "rgba(248, 250, 252, 0.6)",
                fontSize: "1.0625rem",
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              Join thousands of travelers who plan their dream adventures with PackGo. Discover destinations, track expenses, and create memories.
            </Typography>

            {/* Features */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
              {[
                "Access to 2,400+ curated destinations",
                "Smart expense tracking & budgeting",
                "AI-powered trip recommendations",
              ].map((feature, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{ fontSize: 14, color: "white" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      color: "rgba(248, 250, 252, 0.7)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {/* Right side with register form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 3, sm: 4 },
          background: "#F8FAFC",
        }}
      >
        <Box
          sx={{
            maxWidth: 480,
            width: "100%",
          }}
        >
          {/* Mobile Logo */}
          {isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 20px rgba(20, 184, 166, 0.25)",
                }}
              >
                <ExploreIcon sx={{ color: "white", fontSize: 22 }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#0D1B2A",
                }}
              >
                Pack
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #FF6B5A 0%, #FF8A7D 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Go
                </Box>
              </Typography>
            </Box>
          )}

          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "1.875rem",
                fontWeight: 800,
                color: "#0D1B2A",
                mb: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Create Account
            </Typography>
            <Typography
              sx={{
                color: "#64748B",
                fontSize: "0.9375rem",
              }}
            >
              Get started with your free account
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "20px",
              border: "1px solid rgba(13, 27, 42, 0.08)",
              background: "white",
              boxShadow: "0 8px 32px rgba(13, 27, 42, 0.06)",
            }}
          >
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                mb: 4,
                "& .MuiStepLabel-iconContainer .Mui-active": {
                  color: "#FF6B5A",
                },
                "& .MuiStepLabel-iconContainer .Mui-completed": {
                  color: "#14B8A6",
                },
                "& .MuiStepConnector-line": {
                  borderColor: "rgba(13, 27, 42, 0.12)",
                },
                "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
                  borderColor: "#14B8A6",
                },
                "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
                  borderColor: "#14B8A6",
                },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#64748B",
                      }}
                    >
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 4, minHeight: 220 }}>{getStepContent(activeStep)}</Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    visibility: activeStep === 0 ? "hidden" : "visible",
                    color: "#64748B",
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isNextDisabled()}
                  endIcon={
                    activeStep === steps.length - 1 ? (
                      <HowToRegIcon />
                    ) : (
                      <ArrowForwardIcon />
                    )
                  }
                  sx={{
                    borderRadius: "12px",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    px: 3,
                    py: 1.25,
                    background: "linear-gradient(135deg, #FF6B5A 0%, #FF8A7D 100%)",
                    boxShadow: "0 4px 14px rgba(255, 107, 90, 0.3)",
                    textTransform: "none",
                    "&:hover": {
                      background: "linear-gradient(135deg, #E8533D 0%, #FF6B5A 100%)",
                      boxShadow: "0 8px 25px rgba(255, 107, 90, 0.4)",
                    },
                    "&:disabled": {
                      background: "#E2E8F0",
                      color: "#94A3B8",
                    },
                  }}
                >
                  {activeStep === steps.length - 1 ? "Create Account" : "Next"}
                </Button>
              </Box>

              {activeStep === 0 && (
                <>
                  <Divider sx={{ my: 4 }}>
                    <Typography
                      sx={{
                        fontSize: "0.8125rem",
                        color: "#94A3B8",
                        fontWeight: 500,
                      }}
                    >
                      OR SIGN UP WITH
                    </Typography>
                  </Divider>

                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1.5 }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<GoogleIcon />}
                      sx={{
                        borderRadius: "12px",
                        py: 1.25,
                        px: 3,
                        flexGrow: 1,
                        maxWidth: 160,
                        color: "#DB4437",
                        borderColor: "rgba(219, 68, 55, 0.3)",
                        fontWeight: 600,
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#DB4437",
                          backgroundColor: "rgba(219, 68, 55, 0.04)",
                        },
                      }}
                    >
                      Google
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<FacebookIcon />}
                      sx={{
                        borderRadius: "12px",
                        py: 1.25,
                        px: 3,
                        flexGrow: 1,
                        maxWidth: 160,
                        color: "#4267B2",
                        borderColor: "rgba(66, 103, 178, 0.3)",
                        fontWeight: 600,
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#4267B2",
                          backgroundColor: "rgba(66, 103, 178, 0.04)",
                        },
                      }}
                    >
                      Facebook
                    </Button>
                  </Box>
                </>
              )}
            </form>
          </Paper>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography sx={{ fontSize: "0.9375rem", color: "#64748B" }}>
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  fontWeight: 600,
                  color: "#14B8A6",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#0D9488",
                  },
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: "auto", textAlign: "center", pt: 4 }}>
          <Typography sx={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
            © {new Date().getFullYear()} PackGo. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
