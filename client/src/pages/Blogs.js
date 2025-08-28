import React, { useState, useEffect, useCallback } from "react";

import API_BASE_URL from "../config/api.js";
import axios from "axios";

// Configure axios defaults - THIS IS CRUCIAL
axios.defaults.baseURL = API_BASE_URL;


import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Button,
  Paper,
  Fade,
  Grow,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search as SearchIcon,
  AutoStories as BlogIcon,
  TrendingUp,
  People,
  Article,
  Create as CreateIcon,
} from "@mui/icons-material";
import BlogCard from "../components/BlogCard";
import API_BASE_URL from "../config/api.js";



const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCards, setShowCards] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Check if user is logged in
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");

  const getAllBlogs = useCallback(async () => {
    setLoading(true);
    setError("");
    setShowCards(false);
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      } else {
        setError("Failed to load blogs");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Error loading blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const searchBlogs = useCallback(async (query) => {
    setLoading(true);
    setError("");
    setShowCards(false);
    try {
      const timestamp = Date.now();
      const url = `/api/v1/blog/search?query=${encodeURIComponent(query)}&_=${timestamp}`;
      
      const config = {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        }
      };

      const { data } = await axios.get(url, config);
      
      if (data?.success) {
        setBlogs(data?.blogs || []);
      } else {
        setError(data?.message || "Search failed");
        setBlogs([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      
      if (error.response?.status === 404) {
        setError("Search endpoint not found - check backend routes");
      } else if (error.response?.status === 500) {
        setError("Server error during search");
      } else {
        setError("Network error - is backend running?");
      }
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get("search");
    
    if (searchQuery && searchQuery.trim()) {
      searchBlogs(searchQuery.trim());
    } else {
      getAllBlogs();
    }
  }, [location.search, searchBlogs, getAllBlogs]);

  useEffect(() => {
    if (!loading && blogs.length > 0) {
      const timer = setTimeout(() => {
        setShowCards(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading, blogs]);

  const handleStartReading = () => {
    document.getElementById('blogs-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleWriteStory = () => {
    if (isLogin) {
      navigate('/create-blog');
    } else {
      navigate('/login');
    }
  };

  const urlParams = new URLSearchParams(location.search);
  const searchQuery = urlParams.get("search");

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <CircularProgress size={48} sx={{ color: "#4285F4", mb: 2 }} />
        <Typography
          variant="h6"
          sx={{
            color: "#5f6368",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Loading amazing blogs...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Hero Section */}
      {!searchQuery && (
        <Box
          sx={{
            background: `linear-gradient(135deg, rgba(66, 133, 244, 0.9) 0%, rgba(51, 103, 214, 0.8) 100%), 
                        url('/banner.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
            color: "white",
            py: { xs: 8, md: 12 },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Fade in={true} timeout={1000}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    mb: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  Welcome to{" "}
                  <Box
                    component="span"
                    sx={{
                      background: "linear-gradient(45deg, #FF6B35, #F7931E)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    BlogSpace
                  </Box>
                </Typography>
                
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: "1.1rem", sm: "1.25rem" },
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    opacity: 0.95,
                    maxWidth: 700,
                    mx: "auto",
                    mb: 4,
                    lineHeight: 1.6,
                  }}
                >
                  Discover insightful articles, tutorials, and stories from
                  passionate writers around the world. Join our community of
                  readers and creators.
                </Typography>

                {/* Action Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 6,
                  }}
                >
                  <Button
                    onClick={handleStartReading}
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "white",
                      color: "#4285F4",
                      px: 4,
                      py: 1.5,
                      borderRadius: "8px",
                      textTransform: "none",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      "&:hover": {
                        backgroundColor: "#f1f3f4",
                        transform: "translateY(-2px)",
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    Start Reading
                  </Button>

                  <Button
                    onClick={handleWriteStory}
                    variant="outlined"
                    size="large"
                    startIcon={<CreateIcon />}
                    sx={{
                      borderColor: "white",
                      color: "white",
                      px: 4,
                      py: 1.5,
                      borderRadius: "8px",
                      textTransform: "none",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        borderColor: "white",
                        color: "white",
                        transform: "translateY(-2px)",
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    {isLogin ? "Write Your Story" : "Write Your Story"}
                  </Button>
                </Box>

                {/* Stats */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: { xs: 4, md: 8 },
                    mt: 6,
                  }}
                >
                  <Fade in={true} timeout={1200}>
                    <Box sx={{ textAlign: "center" }}>
                      <Article sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "system-ui, -apple-system, sans-serif",
                          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                        }}
                      >
                        {blogs.length}+
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "system-ui, -apple-system, sans-serif",
                          opacity: 0.9,
                        }}
                      >
                        Articles Published
                      </Typography>
                    </Box>
                  </Fade>

                  <Fade in={true} timeout={1400}>
                    <Box sx={{ textAlign: "center" }}>
                      <TrendingUp sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "system-ui, -apple-system, sans-serif",
                          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                        }}
                      >
                        10K+
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "system-ui, -apple-system, sans-serif",
                          opacity: 0.9,
                        }}
                      >
                        Monthly Readers
                      </Typography>
                    </Box>
                  </Fade>

                  <Fade in={true} timeout={1600}>
                    <Box sx={{ textAlign: "center" }}>
                      <People sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "system-ui, -apple-system, sans-serif",
                          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                        }}
                      >
                        50+
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "system-ui, -apple-system, sans-serif",
                          opacity: 0.9,
                        }}
                      >
                        Contributing Writers
                      </Typography>
                    </Box>
                  </Fade>
                </Box>
              </Box>
            </Fade>
          </Container>
        </Box>
      )}

      {/* Search Results Header */}
      {searchQuery && (
        <Box
          sx={{
            background: "linear-gradient(135deg, #4285F4 0%, #3367D6 100%)",
            color: "white",
            py: { xs: 4, sm: 6 },
          }}
        >
          <Container maxWidth="lg">
            <Fade in={true} timeout={1000}>
              <Box sx={{ textAlign: "center" }}>
                <SearchIcon sx={{ fontSize: { xs: 48, sm: 64 }, mb: 2, opacity: 0.9 }} />
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    mb: 1,
                  }}
                >
                  Search Results
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    opacity: 0.9,
                  }}
                >
                  {blogs.length > 0 
                    ? `Found ${blogs.length} result${blogs.length !== 1 ? 's' : ''} for "${searchQuery}"`
                    : `No results found for "${searchQuery}"`
                  }
                </Typography>
              </Box>
            </Fade>
          </Container>
        </Box>
      )}

      {/* Blogs Section */}
      <Container maxWidth="lg" sx={{ py: 6 }} id="blogs-section">
        {blogs.length > 0 ? (
          <Box>
            <Fade in={true} timeout={800}>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  mb: 4,
                  fontWeight: "bold",
                  color: "#202124",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {searchQuery ? "Search Results" : "Latest Stories"}
              </Typography>
            </Fade>

            {/* Equal Height Blog Cards Grid */}
            <Box
              sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(auto-fit, minmax(400px, 1fr))",
                },
                gridAutoRows: "1fr",
                alignItems: "stretch",
              }}
            >
              {blogs.map((blog, index) => (
                <Grow
                  key={blog._id}
                  in={showCards}
                  timeout={(index + 1) * 200}
                  style={{ transformOrigin: '0 0 0' }}
                >
                  <Box sx={{ height: "100%" }}>
                    <BlogCard
                      id={blog._id}
                      isUser={localStorage.getItem("userId") === blog?.user?._id}
                      title={blog?.title}
                      description={blog?.description}
                      image={blog?.image}
                      username={blog?.user?.username}
                      time={blog.createdAt}
                    />
                  </Box>
                </Grow>
              ))}
            </Box>
          </Box>
        ) : (
          <Fade in={true} timeout={800}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, sm: 6 },
                borderRadius: "16px",
                textAlign: "center",
                backgroundColor: "white",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                border: "1px solid #e9ecef",
              }}
            >
              <BlogIcon
                sx={{
                  fontSize: { xs: 64, sm: 80 },
                  color: "#dadce0",
                  mb: 2,
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  color: "#5f6368",
                  mb: 2,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: { xs: "1.5rem", sm: "2rem" },
                }}
              >
                {searchQuery 
                  ? "No blogs found matching your search"
                  : "No blogs available yet"
                }
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#9aa0a6",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                {searchQuery 
                  ? "Try different keywords or browse all blogs"
                  : "Be the first to share your story!"
                }
              </Typography>
            </Paper>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default Blogs;
