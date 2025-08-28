import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  CircularProgress,
  InputAdornment,
  Fade,
  Divider,
  Card,
  CardMedia,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Title as TitleIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
  Preview as PreviewIcon,
} from "@mui/icons-material";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [errors, setErrors] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  // ✅ FIXED: Prevent infinite loops with proper dependency array
  const getBlogDetail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title || "",
          description: data?.blog.description || "",
          image: data?.blog.image || "",
        });
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
      toast.error("Failed to load blog details");
      navigate("/my-blogs");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Proper useEffect with dependency array
  useEffect(() => {
    if (id) {
      getBlogDetail();
    }
  }, [id]); // Only re-run when id changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!inputs.title.trim()) {
      newErrors.title = "Title is required";
    } else if (inputs.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!inputs.description.trim()) {
      newErrors.description = "Description is required";
    } else if (inputs.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (!inputs.image.trim()) {
      newErrors.image = "Image URL is required";
    } else {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
      if (!urlPattern.test(inputs.image)) {
        newErrors.image = "Please enter a valid URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setUpdating(true);
    try {
      // ✅ FIXED: Get actual user ID from localStorage
      const userId = localStorage.getItem("userId");
      
      if (!userId) {
        toast.error("User not authenticated. Please login again.");
        navigate("/login");
        return;
      }

      console.log("Sending update request:", {
        url: `/api/v1/blog/update-blog/${id}`,
        data: {
          title: inputs.title.trim(),
          description: inputs.description.trim(),
          image: inputs.image.trim(),
          user: userId
        }
      });

      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title.trim(),
        description: inputs.description.trim(),
        image: inputs.image.trim(),
        user: userId, // ✅ FIXED: Use actual user ID
      });
      
      console.log("Update response:", data);
      
      if (data?.success) {
        toast.success("Blog updated successfully!");
        navigate("/my-blogs");
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      console.error("Error response:", error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to update blog. Please try again.";
      toast.error(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    navigate("/my-blogs");
  };

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
          Loading blog details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa", py: 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #4285F4 0%, #3367D6 100%)",
          color: "white",
          py: { xs: 4, md: 6 },
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: "center" }}>
              <EditIcon sx={{ fontSize: { xs: 48, sm: 64 }, mb: 2, opacity: 0.9 }} />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  mb: 1,
                }}
              >
                Edit Your Story
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  opacity: 0.9,
                }}
              >
                Update your blog post and share your thoughts
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
        <Fade in={true} timeout={800}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              border: "1px solid #e9ecef",
              backgroundColor: "#ffffff",
            }}
          >
            <Box sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#202124",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  mb: 3,
                  textAlign: "center",
                }}
              >
                Update Your Article
              </Typography>

              <Divider sx={{ mb: 4 }} />

              <Box component="form" onSubmit={handleSubmit} noValidate>
                {/* Title Field */}
                <TextField
                  fullWidth
                  name="title"
                  label="Article Title"
                  placeholder="Enter an engaging title for your blog post"
                  value={inputs.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon sx={{ color: "#9aa0a6", fontSize: 20 }} />
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

                {/* Description Field */}
                <TextField
                  fullWidth
                  name="description"
                  label="Article Content"
                  placeholder="Write your blog content here..."
                  value={inputs.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  margin="normal"
                  multiline
                  rows={8}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                        <DescriptionIcon sx={{ color: "#9aa0a6", fontSize: 20 }} />
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

                {/* Image URL Field */}
                <TextField
                  fullWidth
                  name="image"
                  label="Featured Image URL"
                  placeholder="https://example.com/image.jpg"
                  value={inputs.image}
                  onChange={handleChange}
                  error={!!errors.image}
                  helperText={errors.image}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageIcon sx={{ color: "#9aa0a6", fontSize: 20 }} />
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

                {/* Image Preview */}
                {inputs.image && !errors.image && (
                  <Card sx={{ mb: 3, borderRadius: "8px" }}>
                    <Box sx={{ p: 2, backgroundColor: "#f8f9fa" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <PreviewIcon sx={{ color: "#4285F4", fontSize: 18 }} />
                        <Typography
                          variant="subtitle2"
                          sx={{ 
                            color: "#4285F4",
                            fontWeight: 600,
                            fontFamily: "system-ui, -apple-system, sans-serif",
                          }}
                        >
                          Image Preview
                        </Typography>
                      </Box>
                    </Box>
                    <CardMedia
                      component="img"
                      image={inputs.image}
                      alt="Blog preview"
                      sx={{
                        height: 200,
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        setErrors(prev => ({
                          ...prev,
                          image: "Invalid image URL"
                        }));
                      }}
                    />
                  </Card>
                )}

                {/* Action Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "flex-end",
                    flexWrap: "wrap",
                    mt: 4,
                  }}
                >
                  <Button
                    onClick={handleCancel}
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    disabled={updating}
                    sx={{
                      borderColor: "#9aa0a6",
                      color: "#5f6368",
                      px: 3,
                      py: 1.5,
                      borderRadius: "8px",
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 500,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      "&:hover": {
                        borderColor: "#5f6368",
                        backgroundColor: "#f8f9fa",
                      },
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={updating ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    disabled={updating}
                    sx={{
                      backgroundColor: "#4285F4",
                      color: "white",
                      px: 4,
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
                      "&:disabled": {
                        backgroundColor: "#9aa0a6",
                      },
                    }}
                  >
                    {updating ? "Updating..." : "Update Article"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default BlogDetails;
