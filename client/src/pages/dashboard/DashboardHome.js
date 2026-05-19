import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  LinearProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExploreIcon from "@mui/icons-material/Explore";
import WalletIcon from "@mui/icons-material/Wallet";
import CheckCircleIcon from "@mui/icons-material/TaskAlt";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ArrowForwardIcon from "@mui/icons-material/East";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import HotelIcon from "@mui/icons-material/Hotel";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { getTrips } from "../../redux/actions/tripActions";
import { getAllUserExpenses } from "../../redux/actions/expenseActions";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const STATUS_COLORS = {
  planned: "primary",
  ongoing: "warning",
  completed: "success",
};

const DashboardHome = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { trips, loading } = useSelector((state) => state.trips);
  const { allExpenses } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(getTrips());
    dispatch(getAllUserExpenses());
  }, [dispatch]);

  const tripsArr = trips || [];
  const userName = user?.name?.split(" ")[0] || "Traveler";

  // Stats
  const totalTrips = tripsArr.length;
  const completedTrips = tripsArr.filter(
    (t) => t.status === "completed",
  ).length;
  const plannedTrips = tripsArr.filter((t) => t.status === "planned").length;
  const ongoingTrips = tripsArr.filter((t) => t.status === "ongoing").length;

  const totalBudget = tripsArr.reduce((acc, t) => acc + (t.budget || 0), 0);
  const totalSpent = allExpenses
    ? allExpenses.reduce((acc, e) => acc + (e.amount || 0), 0)
    : 0;

  // Upcoming trips
  const today = new Date();
  const upcomingTrips = tripsArr
    .filter((t) => new Date(t.startDate) >= today)
    .slice(0, 3);

  // Monthly trip chart data from trips
  const monthlyData = (() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const counts = Array(12).fill(0);
    tripsArr.forEach((t) => {
      const m = new Date(t.startDate).getMonth();
      counts[m]++;
    });
    return months
      .map((m, i) => ({ month: m, trips: counts[i] }))
      .filter((d) => d.trips > 0);
  })();

  const quickActions = [
    {
      icon: <ExploreIcon />,
      label: "Plan New Trip",
      path: "/dashboard/trips",
      gradient: "linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)",
      shadow: "0 8px 24px rgba(20, 184, 166, 0.3)",
    },
    {
      icon: <WalletIcon />,
      label: "Track Expenses",
      path: "/dashboard/expenses",
      gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
      shadow: "0 8px 24px rgba(16, 185, 129, 0.3)",
    },
    {
      icon: <WbSunnyIcon />,
      label: "Check Weather",
      path: "/dashboard/weather",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
      shadow: "0 8px 24px rgba(245, 158, 11, 0.3)",
    },
    {
      icon: <HotelIcon />,
      label: "Book a Hotel",
      path: "/dashboard/bookings",
      gradient: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
      shadow: "0 8px 24px rgba(59, 130, 246, 0.3)",
    },
  ];

  const statsData = [
    {
      label: "Total Trips",
      value: totalTrips,
      icon: <FlightTakeoffIcon />,
      gradient: "linear-gradient(135deg, #0D1B2A 0%, #1B3A5C 100%)",
      shadow: "0 8px 24px rgba(13, 27, 42, 0.2)",
    },
    {
      label: "Completed",
      value: completedTrips,
      icon: <CheckCircleIcon />,
      gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
      shadow: "0 8px 24px rgba(16, 185, 129, 0.25)",
    },
    {
      label: "Total Budget",
      value: `${totalBudget > 0 ? (totalBudget / 1000).toFixed(0) + "K" : "0"}`,
      prefix: "Rs.",
      icon: <TrendingUpIcon />,
      gradient: "linear-gradient(135deg, #FF6B5A 0%, #FF8A7D 100%)",
      shadow: "0 8px 24px rgba(255, 107, 90, 0.25)",
    },
    {
      label: "Total Spent",
      value: `${totalSpent > 0 ? (totalSpent / 1000).toFixed(0) + "K" : "0"}`,
      prefix: "Rs.",
      icon: <WalletIcon />,
      gradient: "linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)",
      shadow: "0 8px 24px rgba(20, 184, 166, 0.25)",
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Greeting */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: { xs: "1.75rem", sm: "2rem" },
            fontWeight: 800,
            color: "#0D1B2A",
            mb: 0.75,
            letterSpacing: "-0.02em",
          }}
        >
          Welcome back, {userName}!
        </Typography>
        <Typography sx={{ color: "#64748B", fontSize: "1rem" }}>
          {totalTrips === 0
            ? "Start planning your first adventure!"
            : `You have ${plannedTrips} upcoming and ${ongoingTrips} ongoing trips.`}
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {statsData.map((stat, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "18px",
                background: stat.gradient,
                color: "white",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: stat.shadow,
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: stat.shadow.replace("24px", "32px"),
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      opacity: 0.85,
                      mb: 0.5,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: { xs: "1.5rem", sm: "1.875rem" },
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat.prefix && (
                      <Box component="span" sx={{ fontSize: "0.875rem", fontWeight: 600, mr: 0.5 }}>
                        {stat.prefix}
                      </Box>
                    )}
                    {stat.value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    opacity: 0.6,
                    "& svg": { fontSize: { xs: 28, sm: 32 } },
                  }}
                >
                  {stat.icon}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              border: "1px solid rgba(13, 27, 42, 0.06)",
              background: "white",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                color: "#0D1B2A",
                mb: 2.5,
                fontSize: "1.125rem",
              }}
            >
              Quick Actions
            </Typography>
            <Grid container spacing={1.5}>
              {quickActions.map((action, i) => (
                <Grid item xs={6} key={i}>
                  <Paper
                    elevation={0}
                    component={Link}
                    to={action.path}
                    sx={{
                      p: 2.25,
                      borderRadius: "16px",
                      textDecoration: "none",
                      display: "block",
                      border: "1px solid rgba(13, 27, 42, 0.06)",
                      background: "white",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        boxShadow: "0 12px 32px rgba(13, 27, 42, 0.1)",
                        transform: "translateY(-4px)",
                        borderColor: "transparent",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "14px",
                        background: action.gradient,
                        boxShadow: action.shadow,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1.5,
                        color: "white",
                        "& svg": { fontSize: 24 },
                      }}
                    >
                      {action.icon}
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#0D1B2A",
                        fontSize: "0.875rem",
                      }}
                    >
                      {action.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Trip Chart */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              border: "1px solid rgba(13, 27, 42, 0.06)",
              background: "white",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                color: "#0D1B2A",
                mb: 2.5,
                fontSize: "1.125rem",
              }}
            >
              Trips by Month
            </Typography>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyData}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#14B8A6" />
                      <stop offset="100%" stopColor="#2DD4BF" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(13, 27, 42, 0.06)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748B", fontWeight: 500 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: "#64748B", fontWeight: 500 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid rgba(13, 27, 42, 0.08)",
                      boxShadow: "0 8px 24px rgba(13, 27, 42, 0.12)",
                      fontWeight: 600,
                    }}
                    formatter={(v) => [v, "Trips"]}
                  />
                  <Bar
                    dataKey="trips"
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 220,
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "16px",
                    background: "rgba(20, 184, 166, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ExploreIcon sx={{ fontSize: 32, color: "#14B8A6" }} />
                </Box>
                <Typography sx={{ color: "#64748B", fontWeight: 500 }}>
                  Create trips to see analytics
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Upcoming Trips */}
      <Box sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              color: "#0D1B2A",
              fontSize: "1.25rem",
            }}
          >
            {upcomingTrips.length > 0 ? "Upcoming Trips" : "Recent Trips"}
          </Typography>
          <Button
            component={Link}
            to="/dashboard/trips"
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: "#14B8A6",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                background: "rgba(20, 184, 166, 0.06)",
              },
            }}
          >
            View All
          </Button>
        </Box>

        {loading ? (
          <LinearProgress
            sx={{
              borderRadius: "8px",
              background: "rgba(20, 184, 166, 0.1)",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(90deg, #14B8A6, #2DD4BF)",
              },
            }}
          />
        ) : tripsArr.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: "20px",
              border: "2px dashed rgba(13, 27, 42, 0.12)",
              background: "white",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(20, 184, 166, 0.05) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2.5,
              }}
            >
              <FlightTakeoffIcon sx={{ fontSize: 40, color: "#14B8A6" }} />
            </Box>
            <Typography
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                color: "#0D1B2A",
                mb: 1,
                fontSize: "1.125rem",
              }}
            >
              No trips yet
            </Typography>
            <Typography sx={{ color: "#64748B", mb: 3 }}>
              Start planning your first adventure!
            </Typography>
            <Button
              component={Link}
              to="/dashboard/trips"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                background: "linear-gradient(135deg, #FF6B5A 0%, #FF8A7D 100%)",
                boxShadow: "0 4px 14px rgba(255, 107, 90, 0.3)",
                borderRadius: "12px",
                fontWeight: 600,
                textTransform: "none",
                px: 3,
                py: 1.25,
                "&:hover": {
                  background: "linear-gradient(135deg, #E8533D 0%, #FF6B5A 100%)",
                  boxShadow: "0 8px 25px rgba(255, 107, 90, 0.4)",
                },
              }}
            >
              Plan Your First Trip
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {(upcomingTrips.length > 0
              ? upcomingTrips
              : tripsArr.slice(0, 3)
            ).map((trip) => (
              <Grid item xs={12} md={6} lg={4} key={trip._id}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: "20px",
                    border: "1px solid rgba(13, 27, 42, 0.06)",
                    background: "white",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 20px 48px rgba(13, 27, 42, 0.12)",
                      borderColor: "transparent",
                    },
                  }}
                >
                  <CardActionArea
                    component={Link}
                    to={`/dashboard/trips/${trip._id}`}
                  >
                    <Box sx={{ position: "relative", pt: "56%" }}>
                      <Box
                        component="img"
                        src={
                          trip.images?.[0] ||
                          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?fit=crop&w=600"
                        }
                        alt={trip.destination}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.6s ease",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(180deg, transparent 40%, rgba(13, 27, 42, 0.6) 100%)",
                        }}
                      />
                      <Box sx={{ position: "absolute", top: 12, right: 12 }}>
                        <Chip
                          label={
                            trip.status?.charAt(0).toUpperCase() +
                            trip.status?.slice(1)
                          }
                          color={STATUS_COLORS[trip.status] || "default"}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            borderRadius: "8px",
                            backdropFilter: "blur(10px)",
                          }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography
                        sx={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 700,
                          color: "#0D1B2A",
                          fontSize: "1.125rem",
                          mb: 0.75,
                        }}
                      >
                        {trip.destination}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                        }}
                      >
                        <DateRangeIcon
                          sx={{ fontSize: 16, color: "#64748B" }}
                        />
                        <Typography
                          sx={{ color: "#64748B", fontSize: "0.8125rem" }}
                        >
                          {new Date(trip.startDate).toLocaleDateString(
                            "en-IN",
                            { day: "2-digit", month: "short" },
                          )}{" "}
                          -{" "}
                          {new Date(trip.endDate).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default DashboardHome;
