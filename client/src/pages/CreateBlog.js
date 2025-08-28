import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import {
  Visibility as PreviewIcon,
  VisibilityOff as HidePreviewIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";




const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    navigate("/my-blogs");
  };

  const handlePreview = () => {
    if (!inputs.title.trim() || !inputs.description.trim()) {
      toast.error("Please fill in title and content to preview");
      return;
    }
    setShowPreview(!showPreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputs.title.trim() || !inputs.description.trim()) {
      toast.error("Title and content are required");
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      
      if (data?.success) {
        toast.success("Blog Created Successfully!");
        navigate("/my-blogs");
      }
    } catch (error) {
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#4285F4",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Create New Blog Post
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#6c757d",
              fontWeight: "normal",
            }}
          >
            Share your thoughts with the world
          </Typography>
        </Box>

        {/* Form Container */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: { xs: 3, md: 4 },
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            border: "1px solid #e9ecef",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "600",
              color: "#212529",
              mb: 4,
            }}
          >
            Write Your Story
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Title Field */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "600",
                  color: "#212529",
                  mb: 1,
                }}
              >
                Title *
              </Typography>
              <TextField
                fullWidth
                name="title"
                placeholder="Enter a compelling title..."
                value={inputs.title}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8f9fa",
                    "& fieldset": {
                      borderColor: "#dee2e6",
                    },
                    "&:hover fieldset": {
                      borderColor: "#4285F4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4285F4",
                    },
                  },
                }}
              />
            </Box>

            {/* Description/Content Field */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "600",
                  color: "#212529",
                  mb: 1,
                }}
              >
                Content *
              </Typography>
              <TextField
                fullWidth
                name="description"
                placeholder="Write your blog post content here..."
                value={inputs.description}
                onChange={handleChange}
                multiline
                rows={12}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8f9fa",
                    "& fieldset": {
                      borderColor: "#dee2e6",
                    },
                    "&:hover fieldset": {
                      borderColor: "#4285F4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4285F4",
                    },
                  },
                }}
              />
            </Box>

            {/* Image URL Field */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "600",
                  color: "#212529",
                  mb: 1,
                }}
              >
                Image URL
              </Typography>
              <TextField
                fullWidth
                name="image"
                placeholder="https://example.com/image.jpg"
                value={inputs.image}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8f9fa",
                    "& fieldset": {
                      borderColor: "#dee2e6",
                    },
                    "&:hover fieldset": {
                      borderColor: "#4285F4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4285F4",
                    },
                  },
                }}
              />
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  textTransform: "none",
                  fontWeight: "500",
                  borderColor: "#6c757d",
                  color: "#6c757d",
                  px: 3,
                  py: 1,
                  borderRadius: "6px",
                  "&:hover": {
                    borderColor: "#495057",
                    backgroundColor: "#f8f9fa",
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                variant="outlined"
                startIcon={showPreview ? <HidePreviewIcon /> : <PreviewIcon />}
                onClick={handlePreview}
                sx={{
                  textTransform: "none",
                  fontWeight: "500",
                  borderColor: "#6c757d",
                  color: "#6c757d",
                  px: 3,
                  py: 1,
                  borderRadius: "6px",
                  "&:hover": {
                    borderColor: "#495057",
                    backgroundColor: "#f8f9fa",
                  },
                }}
              >
                {showPreview ? "Hide Preview" : "Preview"}
              </Button>

              <Button
                type="submit"
                variant="contained"
                startIcon={<PublishIcon />}
                disabled={loading}
                sx={{
                  textTransform: "none",
                  fontWeight: "500",
                  backgroundColor: "#4285F4",
                  px: 4,
                  py: 1,
                  borderRadius: "6px",
                  "&:hover": {
                    backgroundColor: "#3367D6",
                  },
                  "&:disabled": {
                    backgroundColor: "#dee2e6",
                    color: "#6c757d",
                  },
                }}
              >
                {loading ? "Publishing..." : "Publish Post"}
              </Button>
            </Box>
          </form>

          {/* PREVIEW SECTION */}
          {showPreview && (
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 3 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  color: "#4285F4",
                  mb: 3,
                }}
              >
                📖 Preview
              </Typography>
              
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e9ecef",
                }}
              >
                {/* Preview Title */}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#212529",
                    mb: 2,
                    lineHeight: 1.3,
                  }}
                >
                  {inputs.title || "Your Title Here"}
                </Typography>

                {/* Preview Image */}
                {inputs.image && (
                  <Box sx={{ mb: 3 }}>
                    <img
                      src={inputs.image}
                      alt="Blog preview"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        border: "1px solid #dee2e6",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </Box>
                )}

                {/* Preview Content */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "#495057",
                    lineHeight: 1.7,
                    fontSize: "1.1rem",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {inputs.description || "Your blog content will appear here..."}
                </Typography>

                {/* Preview Footer */}
                <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid #dee2e6" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#6c757d",
                      fontStyle: "italic",
                    }}
                  >
                    This is how your blog post will appear to readers
                  </Typography>
                </Box>
              </Paper>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default CreateBlog;
