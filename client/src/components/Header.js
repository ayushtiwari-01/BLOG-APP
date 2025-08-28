import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase,
  Container,
  Fade,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Dashboard,
  Create, 
  ExitToApp,
  Login,
  PersonAdd,
  Search,
  Home,
  Info,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // state
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() === "" && location.search.includes('search=')) {
      navigate('/');
    }
  };

  // logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
      setAnchorEl(null);
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const menuItems = [
    { label: "Home", path: "/", icon: <Home /> },
    { label: "My Blogs", path: "/my-blogs", icon: <Dashboard /> },
    { label: "Create Blog", path: "/create-blog", icon: <Create /> },
    { label: "About", path: "/about", icon: <Info /> },
  ];

  const MobileDrawer = (
    <Drawer
      anchor="left"
      open={mobileDrawerOpen}
      onClose={toggleMobileDrawer}
      PaperProps={{
        sx: {
          width: 320,
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          borderRight: "1px solid #e9ecef",
        }
      }}
    >
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid #e9ecef',
        background: "linear-gradient(135deg, #4285F4 0%, #3367D6 100%)",
        color: 'white'
      }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                B
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              BlogSpace
            </Typography>
          </Box>
          <IconButton 
            onClick={toggleMobileDrawer}
            sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Mobile Search Bar */}
        <Box sx={{ mt: 3 }}>
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              position: 'relative',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              '&:focus-within': {
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              },
              height: '44px',
            }}
          >
            <InputBase
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              sx={{
                color: 'white',
                width: '100%',
                height: '100%',
                '& .MuiInputBase-input': {
                  padding: theme.spacing(0, 5, 0, 2),
                  fontSize: '15px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    opacity: 1,
                  },
                },
              }}
            />
            <IconButton
              type="submit"
              sx={{
                position: 'absolute',
                right: 4,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255, 255, 255, 0.8)',
                '&:hover': { color: 'white' },
              }}
            >
              <Search sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <List sx={{ pt: 2 }}>
        {isLogin && menuItems.map((item, index) => (
          <Fade in={true} timeout={300 + index * 100} key={item.label}>
            <ListItem
              component={Link}
              to={item.path}
              onClick={toggleMobileDrawer}
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: '12px',
                color: '#5f6368',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                '&:hover': {
                  backgroundColor: 'rgba(66, 133, 244, 0.08)',
                  color: '#4285F4',
                  transform: 'translateX(8px)',
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '16px',
                  fontWeight: 500,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              />
            </ListItem>
          </Fade>
        ))}
        
        {!isLogin && (
          <>
            <ListItem
              component={Link}
              to="/login"
              onClick={toggleMobileDrawer}
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: '12px',
                color: '#5f6368',
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(66, 133, 244, 0.08)',
                  color: '#4285F4',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <Login />
              </ListItemIcon>
              <ListItemText 
                primary="Login"
                primaryTypographyProps={{
                  fontSize: '15px',
                  fontWeight: 500,
                }}
              />
            </ListItem>
            <ListItem
              component={Link}
              to="/register"
              onClick={toggleMobileDrawer}
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: '12px',
                color: '#5f6368',
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(66, 133, 244, 0.08)',
                  color: '#4285F4',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText 
                primary="Register"
                primaryTypographyProps={{
                  fontSize: '15px',
                  fontWeight: 500,
                }}
              />
            </ListItem>
          </>
        )}
        
        {isLogin && (
          <ListItem
            onClick={() => {
              handleLogout();
              toggleMobileDrawer();
            }}
            sx={{
              mx: 2,
              mb: 1,
              borderRadius: '12px',
              color: '#5f6368',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.08)',
                color: '#f44336',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText 
              primary="Logout"
              primaryTypographyProps={{
                fontSize: '15px',
                fontWeight: 500,
              }}
            />
          </ListItem>
        )}
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar 
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 2px 32px rgba(0, 0, 0, 0.08)',
          height: '76px',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ 
            minHeight: '76px !important',
            justifyContent: 'space-between',
            px: { xs: 1, sm: 2 },
          }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                edge="start"
                onClick={toggleMobileDrawer}
                sx={{ 
                  mr: 1,
                  color: '#5f6368',
                  backgroundColor: 'rgba(95, 99, 104, 0.08)',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: 'rgba(95, 99, 104, 0.12)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Box 
              component={Link}
              to="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  background: 'linear-gradient(135deg, #4285F4 0%, #3367D6 100%)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  boxShadow: '0 4px 20px rgba(66, 133, 244, 0.3)',
                }}
              >
                <Typography sx={{ 
                  color: 'white', 
                  fontWeight: 'bold', 
                  fontSize: '22px',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  B
                </Typography>
              </Box>
              <Typography 
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #4285F4 0%, #3367D6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '24px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  letterSpacing: '-0.5px',
                }}
              >
                BlogSpace
              </Typography>
            </Box>

            {/* ✅ CENTER NAVIGATION - NO OUTER BOX */}
            {isLogin && !isMobile && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: location.pathname === item.path ? '#4285F4' : '#5f6368',
                      backgroundColor: location.pathname === item.path ? 'rgba(66, 133, 244, 0.1)' : 'transparent',
                      textTransform: 'none',
                      fontWeight: location.pathname === item.path ? 600 : 500,
                      fontSize: '15px',
                      px: 3,
                      py: 1.5,
                      borderRadius: '16px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      '&:hover': {
                        backgroundColor: location.pathname === item.path 
                          ? 'rgba(66, 133, 244, 0.15)' 
                          : 'rgba(95, 99, 104, 0.08)',
                        color: location.pathname === item.path ? '#4285F4' : '#202124',
                        transform: 'translateY(-2px)',
                      },
                      '& .MuiButton-startIcon': {
                        marginRight: '8px',
                        fontSize: '18px',
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Right Side */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Search Bar */}
              {!isMobile && (
                <Box
                  component="form"
                  onSubmit={handleSearch}
                  sx={{
                    position: 'relative',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(241, 243, 244, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                      backgroundColor: 'rgba(232, 240, 254, 0.8)',
                      borderColor: 'rgba(66, 133, 244, 0.2)',
                    },
                    '&:focus-within': {
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      boxShadow: '0 4px 20px rgba(32,33,36,.1)',
                      borderColor: '#4285F4',
                    },
                    width: '320px',
                    height: '44px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Box
                    sx={{
                      padding: theme.spacing(0, 2),
                      height: '100%',
                      position: 'absolute',
                      pointerEvents: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Search sx={{ color: '#9aa0a6', fontSize: 18 }} />
                  </Box>
                  <InputBase
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    sx={{
                      color: '#202124',
                      width: '100%',
                      height: '100%',
                      '& .MuiInputBase-input': {
                        padding: theme.spacing(0, 2, 0, 0),
                        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                        fontSize: '15px',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        '&::placeholder': {
                          color: '#9aa0a6',
                          opacity: 1,
                        },
                      },
                    }}
                  />
                </Box>
              )}

              {/* Auth Buttons */}
              {!isLogin && !isMobile && (
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Button
                    component={Link}
                    to="/login"
                    sx={{ 
                      color: '#5f6368',
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '15px',
                      px: 3,
                      py: 1.5,
                      borderRadius: '12px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      '&:hover': {
                        backgroundColor: 'rgba(95, 99, 104, 0.08)',
                        color: '#202124',
                      }
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    sx={{ 
                      background: 'linear-gradient(135deg, #4285F4 0%, #3367D6 100%)',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '15px',
                      px: 4,
                      py: 1.5,
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(66, 133, 244, 0.3)',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #3367D6 0%, #1557b0 100%)',
                        boxShadow: '0 6px 24px rgba(66, 133, 244, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Register
                  </Button>
                </Box>
              )}

              {/* Profile Menu */}
              {isLogin && !isMobile && (
                <IconButton
                  onClick={handleProfileMenuOpen}
                  sx={{ 
                    color: '#5f6368',
                    backgroundColor: 'rgba(95, 99, 104, 0.08)',
                    borderRadius: '12px',
                    '&:hover': {
                      backgroundColor: 'rgba(95, 99, 104, 0.12)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <AccountCircle sx={{ fontSize: 24 }} />
                </IconButton>
              )}

              {/* Mobile Search Button */}
              {isMobile && (
                <IconButton
                  onClick={() => {
                    if (searchQuery.trim()) {
                      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
                    } else {
                      setMobileDrawerOpen(true);
                    }
                  }}
                  sx={{
                    color: '#5f6368',
                    backgroundColor: 'rgba(95, 99, 104, 0.08)',
                    borderRadius: '12px',
                    '&:hover': {
                      backgroundColor: 'rgba(95, 99, 104, 0.12)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Search />
                </IconButton>
              )}

              {/* Profile Menu Dropdown */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 180,
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backdropFilter: 'blur(20px)',
                  }
                }}
              >
                <MenuItem 
                  onClick={handleLogout}
                  sx={{
                    color: '#5f6368',
                    fontSize: '15px',
                    py: 2,
                    px: 3,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    '&:hover': {
                      backgroundColor: 'rgba(234, 67, 53, 0.08)',
                      color: '#ea4335',
                    }
                  }}
                >
                  <ExitToApp sx={{ mr: 2, fontSize: 18 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      {MobileDrawer}
    </>
  );
};

export default Header;
  