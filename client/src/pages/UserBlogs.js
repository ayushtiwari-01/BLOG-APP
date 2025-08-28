import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Paper,
  Fade,
  Grow,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Create as CreateIcon,
  AutoStories as BlogIcon,
  TrendingUp as StatsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";




const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCards, setShowCards] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Get user blogs
  const getUserBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      setError("Failed to load your blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserBlogs();
  }, [getUserBlogs]);

  // Show cards with staggered animation after content loads
  useEffect(() => {
    if (!loading && blogs.length > 0) {
      const timer = setTimeout(() => {
        setShowCards(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading, blogs]);

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
          Loading your blogs...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa", pb: 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #4285F4 0%, #3367D6 100%)",
          color: "white",
          py: { xs: 6, md: 8 },
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: "center" }}>
              <PersonIcon sx={{ fontSize: { xs: 48, sm: 64 }, mb: 2, opacity: 0.9 }} />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  mb: 1,
                }}
              >
                My Blog Stories
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  opacity: 0.9,
                  mb: 3,
                }}
              >
                Manage and view all your published articles
              </Typography>

              {/* Stats */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: { xs: 4, md: 6 },
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    {blogs.length}
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

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    {blogs.reduce((total, blog) => total + (blog.description?.split(' ').length || 0), 0)}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      opacity: 0.9,
                    }}
                  >
                    Total Words
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    {Math.ceil(blogs.reduce((total, blog) => total + (blog.description?.split(' ').length || 0), 0) / 200)}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      opacity: 0.9,
                    }}
                  >
                    Minutes Reading
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {blogs && blogs.length > 0 ? (
          <Box>
            {/* Section Header */}
            <Fade in={true} timeout={800}>
              <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#202124",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      mb: 1,
                    }}
                  >
                    Your Published Articles
                  </Typography>
                  <Chip
                    icon={<BlogIcon />}
                    label={`${blogs.length} article${blogs.length !== 1 ? 's' : ''} published`}
                    sx={{
                      backgroundColor: "#e8f0fe",
                      color: "#4285F4",
                      fontWeight: 500,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  />
                </Box>
                
                <Button
                  variant="contained"
                  startIcon={<CreateIcon />}
                  onClick={() => navigate("/create-blog")}
                  sx={{
                    backgroundColor: "#4285F4",
                    color: "white",
                    px: 3,
                    py: 1.5,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    boxShadow: "0 4px 12px rgba(66, 133, 244, 0.3)",
                    "&:hover": {
                      backgroundColor: "#3367D6",
                      transform: "translateY(-2px)",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  Write New Article
                </Button>
              </Box>
            </Fade>

            {/* Blog Cards Grid */}
            <Box
              sx={{
                display: "grid",
                gap: 4,
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(auto-fit, minmax(500px, 1fr))",
                  lg: "repeat(auto-fit, minmax(550px, 1fr))",
                },
                justifyItems: "center",
              }}
            >
              {blogs.map((blog, index) => (
                <Grow
                  key={blog._id}
                  in={showCards}
                  timeout={(index + 1) * 200}
                  style={{ transformOrigin: '0 0 0' }}
                >
                  <Box sx={{ width: "100%" }}>
                    <BlogCard
                      id={blog._id}
                      isUser={true}
                      title={blog.title}
                      description={blog.description}
                      image={blog.image}
                      username={blog.user.username}
                      time={blog.createdAt}
                    />
                  </Box>
                </Grow>
              ))}
            </Box>
          </Box>
        ) : (
          /* Empty State */
          <Fade in={true} timeout={800}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, sm: 6, md: 8 },
                borderRadius: "16px",
                textAlign: "center",
                backgroundColor: "white",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                border: "1px solid #e9ecef",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              <CreateIcon
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
                Start Your Writing Journey
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#9aa0a6",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                You haven't created any blog posts yet. Share your thoughts, experiences, and knowledge with the world by writing your first article.
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                startIcon={<CreateIcon />}
                onClick={() => navigate("/create-blog")}
                sx={{
                  backgroundColor: "#4285F4",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  boxShadow: "0 4px 12px rgba(66, 133, 244, 0.3)",
                  "&:hover": {
                    backgroundColor: "#3367D6",
                    transform: "translateY(-2px)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                Create Your First Blog
              </Button>
            </Paper>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default UserBlogs;
