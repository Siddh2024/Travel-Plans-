import React, { useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Divider,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WalletIcon from "@mui/icons-material/Wallet";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import TranslateIcon from "@mui/icons-material/Translate";
import HotelIcon from "@mui/icons-material/Hotel";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { logout } from "../redux/actions/authActions";

// Views
import DashboardHome from "./dashboard/DashboardHome";
import TripsView from "./dashboard/TripsView";
import ExpensesView from "./dashboard/ExpensesView";
import WeatherView from "./dashboard/WeatherView";
import TranslatorView from "./dashboard/TranslatorView";
import BookingView from "./dashboard/BookingView";
import ProfileView from "./dashboard/ProfileView";
import TripDetail from "./dashboard/TripDetail";

const drawerWidth = 280;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", path: "", icon: <DashboardIcon /> },
    { text: "My Trips", path: "trips", icon: <ExploreIcon /> },
    { text: "Expenses", path: "expenses", icon: <WalletIcon /> },
    { text: "Weather", path: "weather", icon: <WbSunnyIcon /> },
    { text: "Translator", path: "translator", icon: <TranslateIcon /> },
    { text: "Bookings", path: "bookings", icon: <HotelIcon /> },
  ];

  const isActive = (path) => {
    const currentPath = location.pathname.split("/dashboard/")[1] || "";
    if (path === "") return currentPath === "";
    return currentPath.startsWith(path);
  };

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#FFFFFF",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            textDecoration: "none",
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
              boxShadow: "0 6px 20px rgba(20, 184, 166, 0.25)",
            }}
          >
            <ExploreIcon sx={{ color: "white", fontSize: 22 }} />
          </Box>
          <Typography
            sx={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "1.375rem",
              fontWeight: 800,
              color: "#0D1B2A",
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
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            display: { md: "none" },
            color: "#64748B",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: "rgba(13, 27, 42, 0.06)" }} />

      {/* User Info */}
      <Box sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1.75,
            borderRadius: "14px",
            background: "linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(20, 184, 166, 0.04) 100%)",
            border: "1px solid rgba(20, 184, 166, 0.12)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.12) 0%, rgba(20, 184, 166, 0.06) 100%)",
            },
          }}
          onClick={() => {
            navigate("/dashboard/profile");
            setMobileOpen(false);
          }}
        >
          <Avatar
            alt={user?.name || "User"}
            sx={{
              width: 44,
              height: 44,
              background: "linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)",
              fontWeight: 700,
              fontSize: 16,
              boxShadow: "0 4px 12px rgba(20, 184, 166, 0.25)",
            }}
          >
            {user?.name?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#0D1B2A",
                fontSize: "0.9375rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.name || "Traveler"}
            </Typography>
            <Typography
              sx={{
                color: "#64748B",
                fontSize: "0.75rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.email || ""}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "rgba(13, 27, 42, 0.06)" }} />

      {/* Nav Items */}
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography
          sx={{
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "#94A3B8",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            px: 1.5,
            mb: 1,
          }}
        >
          Main Menu
        </Typography>
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={`/dashboard/${item.path}`}
                onClick={() => setMobileOpen(false)}
                selected={isActive(item.path)}
                sx={{
                  borderRadius: "12px",
                  py: 1.25,
                  px: 1.5,
                  transition: "all 0.2s ease",
                  "&.Mui-selected": {
                    background: "linear-gradient(135deg, #FF6B5A 0%, #FF8A7D 100%)",
                    color: "white",
                    boxShadow: "0 4px 14px rgba(255, 107, 90, 0.3)",
                    "& .MuiListItemIcon-root": { color: "white" },
                    "&:hover": {
                      background: "linear-gradient(135deg, #E8533D 0%, #FF6B5A 100%)",
                    },
                  },
                  "&:hover:not(.Mui-selected)": {
                    background: "rgba(20, 184, 166, 0.06)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive(item.path) ? "white" : "#64748B",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ borderColor: "rgba(13, 27, 42, 0.06)" }} />
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: "12px",
            py: 1.25,
            px: 1.5,
            color: "#EF4444",
            transition: "all 0.2s ease",
            "&:hover": {
              background: "rgba(239, 68, 68, 0.08)",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: "#EF4444" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#F8FAFC" }}>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
              boxShadow: "4px 0 24px rgba(13, 27, 42, 0.08)",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
              boxShadow: "1px 0 0 rgba(13, 27, 42, 0.06)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          background: "#F8FAFC",
          minHeight: "100vh",
        }}
      >
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            background: "rgba(248, 250, 252, 0.9)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(13, 27, 42, 0.06)",
          }}
        >
          <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { md: "none" },
                color: "#0D1B2A",
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Search Bar */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                background: "white",
                border: "1px solid rgba(13, 27, 42, 0.08)",
                borderRadius: "12px",
                px: 2,
                py: 0.75,
                flex: 1,
                maxWidth: 400,
                transition: "all 0.2s ease",
                "&:focus-within": {
                  borderColor: "#14B8A6",
                  boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)",
                },
              }}
            >
              <SearchIcon sx={{ color: "#94A3B8", mr: 1, fontSize: 20 }} />
              <input
                type="text"
                placeholder="Search trips, destinations..."
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "0.875rem",
                  color: "#0D1B2A",
                  width: "100%",
                  fontFamily: "inherit",
                }}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="Notifications">
                <IconButton
                  sx={{
                    color: "#64748B",
                    background: "white",
                    border: "1px solid rgba(13, 27, 42, 0.08)",
                    width: 42,
                    height: 42,
                    "&:hover": {
                      background: "#F8FAFC",
                      borderColor: "#14B8A6",
                    },
                  }}
                >
                  <Badge
                    badgeContent={0}
                    sx={{
                      "& .MuiBadge-badge": {
                        background: "linear-gradient(135deg, #FF6B5A 0%, #FF8A7D 100%)",
                      },
                    }}
                  >
                    <NotificationsIcon sx={{ fontSize: 20 }} />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Profile">
                <IconButton
                  onClick={handleMenu}
                  sx={{
                    p: 0.5,
                    border: "2px solid transparent",
                    borderRadius: "50%",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#14B8A6",
                    },
                  }}
                >
                  <Avatar
                    alt={user?.name || "User"}
                    sx={{
                      width: 38,
                      height: 38,
                      background: "linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    borderRadius: "16px",
                    boxShadow: "0 10px 40px rgba(13, 27, 42, 0.12)",
                    border: "1px solid rgba(13, 27, 42, 0.06)",
                    minWidth: 180,
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid rgba(13, 27, 42, 0.06)" }}>
                  <Typography sx={{ fontWeight: 700, color: "#0D1B2A", fontSize: "0.9375rem" }}>
                    {user?.name || "Traveler"}
                  </Typography>
                  <Typography sx={{ color: "#64748B", fontSize: "0.75rem" }}>
                    {user?.email || ""}
                  </Typography>
                </Box>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/dashboard/profile");
                  }}
                  sx={{
                    py: 1.25,
                    mx: 1,
                    my: 0.5,
                    borderRadius: "8px",
                    "&:hover": {
                      background: "rgba(20, 184, 166, 0.06)",
                    },
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon fontSize="small" sx={{ color: "#64748B" }} />
                  </ListItemIcon>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    Profile
                  </Typography>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    py: 1.25,
                    mx: 1,
                    my: 0.5,
                    borderRadius: "8px",
                    color: "#EF4444",
                    "&:hover": {
                      background: "rgba(239, 68, 68, 0.06)",
                    },
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: "#EF4444" }} />
                  </ListItemIcon>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ minHeight: "calc(100vh - 65px)" }}>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="trips" element={<TripsView />} />
            <Route path="trips/:id" element={<TripDetail />} />
            <Route path="expenses" element={<ExpensesView />} />
            <Route path="weather" element={<WeatherView />} />
            <Route path="translator" element={<TranslatorView />} />
            <Route path="bookings" element={<BookingView />} />
            <Route path="profile" element={<ProfileView />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
