import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LoginIcon from "@mui/icons-material/Login";
import ExploreIcon from "@mui/icons-material/Explore";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData, navigate));
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
              background: "radial-gradient(ellipse, rgba(255, 107, 90, 0.12) 0%, transparent 60%)",
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
              background: "radial-gradient(ellipse, rgba(20, 184, 166, 0.1) 0%, transparent 60%)",
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
              Welcome Back to Your Next Adventure
            </Typography>
            
            <Typography
              sx={{
                color: "rgba(248, 250, 252, 0.6)",
                fontSize: "1.0625rem",
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              Sign in to access your personalized travel dashboard, saved trips, and exclusive experiences.
            </Typography>

            {/* Stats */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 4,
                pt: 2,
              }}
            >
              {[
                { value: "2.4K+", label: "Destinations" },
                { value: "98%", label: "Satisfaction" },
                { value: "180+", label: "Countries" },
              ].map((stat, i) => (
                <Box key={i} sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "1.75rem",
                      fontWeight: 800,
                      background: "linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(248, 250, 252, 0.5)",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {/* Right side with login form */}
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
            maxWidth: 440,
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
                mb: 4,
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

          <Box sx={{ textAlign: "center", mb: 4 }}>
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
              Sign In
            </Typography>
            <Typography
              sx={{
                color: "#64748B",
                fontSize: "0.9375rem",
              }}
            >
              Enter your credentials to continue
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
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                autoComplete="current-password"
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
                  mb: 2,
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

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      sx={{
                        color: "#94A3B8",
                        "&.Mui-checked": {
                          color: "#14B8A6",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "0.875rem", color: "#64748B" }}>
                      Remember me
                    </Typography>
                  }
                />
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#14B8A6",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#0D9488",
                    },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                endIcon={<LoginIcon />}
                sx={{
                  py: 1.5,
                  mb: 3,
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  background: "linear-gradient(135deg, #FF6B5A 0%, #FF8A7D 100%)",
                  boxShadow: "0 4px 14px rgba(255, 107, 90, 0.3)",
                  textTransform: "none",
                  "&:hover": {
                    background: "linear-gradient(135deg, #E8533D 0%, #FF6B5A 100%)",
                    boxShadow: "0 8px 25px rgba(255, 107, 90, 0.4)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Sign In
              </Button>

              <Divider sx={{ my: 3 }}>
                <Typography
                  sx={{
                    fontSize: "0.8125rem",
                    color: "#94A3B8",
                    fontWeight: 500,
                  }}
                >
                  OR CONTINUE WITH
                </Typography>
              </Divider>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1.5,
                }}
              >
                {[
                  { icon: <GoogleIcon />, color: "#DB4437" },
                  { icon: <FacebookIcon />, color: "#4267B2" },
                  { icon: <TwitterIcon />, color: "#1DA1F2" },
                ].map((social, i) => (
                  <IconButton
                    key={i}
                    sx={{
                      width: 52,
                      height: 52,
                      border: "1px solid rgba(13, 27, 42, 0.1)",
                      borderRadius: "12px",
                      color: social.color,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        background: `${social.color}10`,
                        borderColor: social.color,
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </form>
          </Paper>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography sx={{ fontSize: "0.9375rem", color: "#64748B" }}>
              {"Don't have an account? "}
              <Link
                component={RouterLink}
                to="/register"
                sx={{
                  fontWeight: 600,
                  color: "#14B8A6",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#0D9488",
                  },
                }}
              >
                Get started free
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

export default Login;
