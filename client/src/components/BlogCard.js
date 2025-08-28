import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { 
  Box, 
  IconButton, 
  Tooltip, 
  Chip, 
  Fade,
  Divider,
} from "@mui/material";
import { 
  Schedule as ScheduleIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        console.log("🗑️ Deleting blog with ID:", id);
        
        const response = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
        const data = response.data;
        
        console.log("📦 Response data:", data);
        
        if (data && data.success === true) {
          toast.success(data.message || "Blog deleted successfully!");
          navigate("/my-blogs");
        } else {
          console.log("❌ Delete failed:", data);
          toast.error(data?.message || "Delete operation failed");
        }
        
      } catch (error) {
        console.error("❌ Delete error:", error);
        
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else if (error.response) {
          toast.error(`Delete failed (${error.response.status})`);
        } else {
          toast.error("Network error occurred");
        }
      }
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInDays === 0) {
        if (diffInHours === 0) {
          const diffInMinutes = Math.floor((now - date) / (1000 * 60));
          return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes}m ago`;
        }
        return diffInHours === 1 ? "1h ago" : `${diffInHours}h ago`;
      } else if (diffInDays === 1) {
        return "Yesterday";
      } else if (diffInDays < 7) {
        return `${diffInDays}d ago`;
      } else {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
      }
    } catch (error) {
      return dateString;
    }
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  const getReadingTime = (text) => {
    if (!text) return 1;
    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  // Function to render text with line breaks
  const renderTextWithLineBreaks = (text) => {
    if (!text) return "";
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <Fade in={true} timeout={600}>
      <Card
        elevation={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          width: '100%',
          maxWidth: 550,
          margin: "0 auto",
          borderRadius: "16px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          border: "1px solid #e9ecef",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
          position: "relative",
          // ✅ FIXED: Equal height layout
          display: "flex",
          flexDirection: "column",
          height: expanded ? "auto" : 550, // ✅ Fixed height, auto when expanded
          minHeight: 550, // ✅ Minimum height for consistency
          "&:hover": {
            boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
            transform: "translateY(-8px)",
            "& .card-image": {
              transform: "scale(1.05)",
            },
            "& .card-overlay": {
              opacity: 1,
            }
          },
        }}
      >
        {/* Edit/Delete actions */}
        {isUser && (
          <Box
            className="card-overlay"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 10,
              display: "flex",
              gap: 1,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <Tooltip title="Edit Post" placement="top" arrow>
              <IconButton 
                onClick={handleEdit}
                size="small" 
                sx={{ 
                  bgcolor: "rgba(255, 255, 255, 0.95)", 
                  backdropFilter: "blur(10px)",
                  "&:hover": { 
                    bgcolor: "white",
                    transform: "scale(1.1)",
                  },
                  width: 40,
                  height: 40,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  border: "1px solid rgba(66, 133, 244, 0.2)",
                }}
              >
                <ModeEditIcon sx={{ fontSize: 18, color: "#4285F4" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Post" placement="top" arrow>
              <IconButton 
                onClick={handleDelete}
                size="small" 
                sx={{ 
                  bgcolor: "rgba(255, 255, 255, 0.95)", 
                  backdropFilter: "blur(10px)",
                  "&:hover": { 
                    bgcolor: "white",
                    transform: "scale(1.1)",
                  },
                  width: 40,
                  height: 40,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  border: "1px solid rgba(244, 67, 54, 0.2)",
                }}
              >
                <DeleteIcon sx={{ fontSize: 18, color: "#f44336" }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {/* Blog image with fixed height */}
        {image && (
          <Box sx={{ 
            position: "relative", 
            overflow: "hidden",
            height: 200, // ✅ Fixed image height
            flexShrink: 0, // ✅ Prevent shrinking
          }}>
            <CardMedia
              className="card-image"
              component="img"
              image={image}
              alt={title}
              sx={{
                height: "100%",
                objectFit: "cover",
                width: "100%",
                transition: "transform 0.4s ease",
              }}
            />
            
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "50%",
                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
              }}
            />
            
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                display: "flex",
                gap: 1,
              }}
            >
              <Chip
                icon={<ScheduleIcon />}
                label={formatDate(time)}
                size="small"
                sx={{
                  backgroundColor: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(8px)",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 500,
                  "& .MuiChip-icon": {
                    color: "white",
                    fontSize: "14px",
                  }
                }}
              />
              <Chip
                label={`${getReadingTime(description)} min read`}
                size="small"
                sx={{
                  backgroundColor: "rgba(66, 133, 244, 0.9)",
                  backdropFilter: "blur(8px)",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              />
            </Box>
          </Box>
        )}

        {/* Header with consistent height */}
        <CardHeader
          avatar={
            <Avatar 
              sx={{ 
                background: "linear-gradient(135deg, #4285F4 0%, #3367D6 100%)",
                fontWeight: "bold", 
                textTransform: "uppercase",
                width: 48,
                height: 48,
                fontSize: "18px",
                border: "2px solid #f8f9fa",
              }} 
            >
              {username ? username.charAt(0) : "U"}
            </Avatar>
          }
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon sx={{ fontSize: 18, color: "#9aa0a6" }} />
              <Typography 
                variant="subtitle1" 
                fontWeight="600" 
                color="#202124"
                sx={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {username || "Anonymous"}
              </Typography>
            </Box>
          }
          subheader={
            <Typography 
              variant="caption" 
              color="#5f6368" 
              sx={{ 
                mt: 0.5,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Published {formatDate(time)}
            </Typography>
          }
          sx={{ 
            pb: 1,
            pt: 2,
            flexShrink: 0, // ✅ Prevent header shrinking
          }}
        />

        <Divider sx={{ mx: 2, opacity: 0.6 }} />

        {/* Content area that grows to fill space */}
        <CardContent sx={{ 
          px: 3, 
          py: 3,
          flexGrow: 1, // ✅ Take up remaining space
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>
          <Typography 
            variant="h6" 
            component="h2" 
            fontWeight="700" 
            color="#202124" 
            sx={{ 
              mb: 1.5,
              lineHeight: 1.4,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "1.25rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flexShrink: 0, // ✅ Keep title consistent
            }}
          >
            {title}
          </Typography>
          
          {/* Description with proper spacing */}
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <Typography 
              variant="body2" 
              color="#5f6368" 
              sx={{ 
                lineHeight: 1.7,
                fontFamily: "system-ui, -apple-system, sans-serif",
                whiteSpace: "pre-line", // ✅ Preserve line breaks
                wordBreak: "break-word",
                overflowWrap: "break-word",
                overflow: "hidden",
                flexGrow: 1,
                display: "-webkit-box",
                WebkitLineClamp: expanded ? "none" : 6, // ✅ Limit lines
                WebkitBoxOrient: "vertical",
              }}
            >
              {expanded ? 
                renderTextWithLineBreaks(description) : 
                renderTextWithLineBreaks(truncateText(description, 200))
              }
            </Typography>

            {/* Read More button always at bottom */}
            {description && description.length > 150 && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mt: 2,
                flexShrink: 0, // ✅ Keep button area consistent
              }}>
                <Button
                  size="small"
                  onClick={handleExpandClick}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    color: "#4285F4",
                    padding: "4px 0",
                    minWidth: "auto",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#3367D6",
                    }
                  }}
                >
                  {expanded ? "Show Less" : "Read More"}
                </Button>
                
                <Typography 
                  variant="caption" 
                  color="#9aa0a6"
                  sx={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  {getReadingTime(description)} min read
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
}
