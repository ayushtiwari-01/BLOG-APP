import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Fade,
  Divider,
} from "@mui/material";
import {
  School as SchoolIcon,
  Email as EmailIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Lightbulb as LightbulbIcon,
  Rocket as RocketIcon,
} from "@mui/icons-material";

const About = () => {
  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        {/* Header Section with Animation */}
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(135deg, #4285F4 0%, #3367D6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
                fontSize: { xs: "2.5rem", sm: "3rem", md: "3.75rem" },
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              About BlogSpace
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#6c757d",
                fontWeight: "400",
                maxWidth: "700px",
                mx: "auto",
                lineHeight: 1.6,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              A modern platform for sharing thoughts, ideas, and stories with the world
            </Typography>
          </Box>
        </Fade>

        {/* Main Content Grid - Fixed width matching */}
        <Fade in={true} timeout={1200}>
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {/* Mission Section */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  border: "1px solid #e9ecef",
                  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, height: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Box
                      sx={{
                        background: "linear-gradient(135deg, #4285F4 0%, #3367D6 100%)",
                        borderRadius: "12px",
                        p: 1.5,
                        mr: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LightbulbIcon sx={{ color: "white", fontSize: 28 }} />
                    </Box>
                    <Typography 
                      variant="h4" 
                      fontWeight="700" 
                      color="#212529"
                      sx={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                    >
                      Our Mission
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    color="#5f6368" 
                    sx={{ 
                      lineHeight: 1.7, 
                      mb: 2,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontSize: "1.1rem"
                    }}
                  >
                    BlogSpace empowers writers, thinkers, and creators to share their unique 
                    perspectives with a global audience. We believe that everyone has a story 
                    worth telling and ideas worth sharing.
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="#5f6368" 
                    sx={{ 
                      lineHeight: 1.7,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontSize: "1.1rem"
                    }}
                  >
                    Our platform provides a clean, intuitive interface that lets you focus 
                    on what matters most - your content. Built with modern web technologies 
                    for a seamless writing and reading experience.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Features Section */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  border: "1px solid #e9ecef",
                  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, height: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Box
                      sx={{
                        background: "linear-gradient(135deg, #4285F4 0%, #3367D6 100%)",
                        borderRadius: "12px",
                        p: 1.5,
                        mr: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <RocketIcon sx={{ color: "white", fontSize: 28 }} />
                    </Box>
                    <Typography 
                      variant="h4" 
                      fontWeight="700" 
                      color="#212529"
                      sx={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                    >
                      Platform Features
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 3 }}>
                    {[
                      "User Authentication",
                      "Rich Blog Editor", 
                      "Image Support",
                      "Responsive Design",
                      "Personal Blogs",
                      "Modern UI/UX",
                      "Real-time Updates",
                      "User Profiles"
                    ].map((feature) => (
                      <Chip
                        key={feature}
                        label={feature}
                        sx={{
                          background: "linear-gradient(135deg, #e3f2fd 0%, #e8f4fd 100%)",
                          color: "#1976d2",
                          fontWeight: "600",
                          fontSize: "0.875rem",
                          border: "1px solid rgba(25, 118, 210, 0.2)",
                          "&:hover": {
                            background: "linear-gradient(135deg, #bbdefb 0%, #e3f2fd 100%)",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      />
                    ))}
                  </Box>
                  <Typography 
                    variant="body1" 
                    color="#5f6368" 
                    sx={{ 
                      lineHeight: 1.7,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontSize: "1.1rem"
                    }}
                  >
                    Built with modern web technologies including React, Node.js, MongoDB, 
                    and Material-UI for a seamless user experience.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Fade>

        {/* Developer Section */}
        <Fade in={true} timeout={1400}>
          <Box sx={{ mb: 6 }}>
            <Card
              sx={{
                borderRadius: "20px",
                boxShadow: "0 12px 48px rgba(0,0,0,0.08)",
                border: "1px solid #e9ecef",
                overflow: "hidden",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(135deg, #4285F4 0%, #3367D6 100%)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography 
                    variant="h4" 
                    fontWeight="700" 
                    color="#212529" 
                    sx={{ 
                      mb: 4,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontSize: { xs: "1.75rem", md: "2.125rem" }
                    }}
                  >
                    Meet the Developer
                  </Typography>
                  
                  <Avatar
                    sx={{
                      width: { xs: 100, md: 140 },
                      height: { xs: 100, md: 140 },
                      mx: "auto",
                      mb: 3,
                      background: "linear-gradient(135deg, #4285F4 0%, #3367D6 100%)",
                      fontSize: { xs: "2.5rem", md: "3.5rem" },
                      fontWeight: "bold",
                      boxShadow: "0 8px 32px rgba(66, 133, 244, 0.3)",
                      border: "4px solid #ffffff",
                    }}
                  >
                    AT
                  </Avatar>
                  
                  <Typography 
                    variant="h4" 
                    fontWeight="700" 
                    color="#212529" 
                    sx={{ 
                      mb: 2,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontSize: { xs: "1.5rem", md: "2rem" }
                    }}
                  >
                    Ayush Tiwari
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="#5f6368" 
                    sx={{ 
                      mb: 4, 
                      maxWidth: "600px", 
                      mx: "auto",
                      lineHeight: 1.7,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontSize: "1.1rem"
                    }}
                  >
                    Full Stack Developer passionate about creating meaningful digital experiences.
                    <br />
                    Building modern web applications with React, Node.js, and MongoDB.
                  </Typography>
                  
                  {/* Social Links */}
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                    <Button
                      variant="outlined"
                      startIcon={<EmailIcon />}
                      component="a"
                      href="mailto:tiwariayush2507@gmail.com?subject=Hello Ayush - Regarding BlogSpace&body=Hi Ayush,%0D%0A%0D%0AI found your BlogSpace project and wanted to reach out.%0D%0A%0D%0ABest regards"
                      sx={{
                        borderColor: "#e9ecef",
                        color: "#5f6368",
                        px: 3,
                        py: 1.5,
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: "600",
                        fontSize: "1rem",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        "&:hover": { 
                          borderColor: "#4285F4", 
                          color: "#4285F4",
                          backgroundColor: "rgba(66, 133, 244, 0.04)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Email Me
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      component="a"
                      href="https://github.com/ayushtiwari-01"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        borderColor: "#e9ecef",
                        color: "#5f6368",
                        px: 3,
                        py: 1.5,
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: "600",
                        fontSize: "1rem",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        "&:hover": { 
                          borderColor: "#4285F4", 
                          color: "#4285F4",
                          backgroundColor: "rgba(66, 133, 244, 0.04)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      GitHub
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<LinkedInIcon />}
                      component="a"
                      href="https://www.linkedin.com/in/ayush-tiwariii/"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        borderColor: "#e9ecef",
                        color: "#5f6368",
                        px: 3,
                        py: 1.5,
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: "600",
                        fontSize: "1rem",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        "&:hover": { 
                          borderColor: "#4285F4", 
                          color: "#4285F4",
                          backgroundColor: "rgba(66, 133, 244, 0.04)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      LinkedIn
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Fade>

        {/* Technology Stack - Fixed grid widths */}
        <Fade in={true} timeout={1600}>
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Typography 
              variant="h4" 
              fontWeight="700" 
              color="#212529" 
              sx={{ 
                mb: 5,
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: { xs: "1.75rem", md: "2.125rem" }
              }}
            >
              Built With
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {[
                { name: "React.js", desc: "Frontend Framework" },
                { name: "Node.js", desc: "Backend Runtime" },
                { name: "MongoDB", desc: "Database" },
                { name: "Material-UI", desc: "UI Components" },
                { name: "Express.js", desc: "Web Framework" },
                { name: "Mongoose", desc: "ODM Library" },
              ].map((tech, index) => (
                <Grid item xs={6} sm={4} md={2} key={tech.name}>
                  <Fade in={true} timeout={1600 + index * 100}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: "16px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e9ecef",
                        textAlign: "center",
                        height: "140px", // ✅ Fixed height for consistent boxes
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                          backgroundColor: "#f8f9fa",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          background: "linear-gradient(135deg, #4285F4 0%, #3367D6 100%)",
                          borderRadius: "12px",
                          p: 1.5,
                          mb: 1.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <SchoolIcon sx={{ color: "white", fontSize: 24 }} />
                      </Box>
                      <Typography 
                        variant="h6" 
                        fontWeight="600" 
                        color="#212529"
                        sx={{ 
                          fontSize: "1rem",
                          fontFamily: "system-ui, -apple-system, sans-serif",
                          mb: 0.5
                        }}
                      >
                        {tech.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="#6c757d"
                        sx={{ 
                          fontSize: "0.875rem",
                          fontFamily: "system-ui, -apple-system, sans-serif"
                        }}
                      >
                        {tech.desc}
                      </Typography>
                    </Box>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Project Info */}
        <Fade in={true} timeout={1800}>
          <Box sx={{ textAlign: "center" }}>
            <Card
              sx={{
                borderRadius: "20px",
                boxShadow: "0 12px 48px rgba(0,0,0,0.08)",
                border: "1px solid #e9ecef",
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(135deg, #4285F4 0%, #3367D6 100%)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                <Typography 
                  variant="h4" 
                  fontWeight="700" 
                  color="#212529" 
                  sx={{ 
                    mb: 3,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: { xs: "1.5rem", md: "2rem" }
                  }}
                >
                  About This Project
                </Typography>
                <Divider sx={{ mb: 3, mx: "auto", maxWidth: "200px" }} />
                <Typography 
                  variant="body1" 
                  color="#5f6368" 
                  sx={{ 
                    lineHeight: 1.8,
                    maxWidth: "800px",
                    mx: "auto",
                    fontSize: "1.1rem",
                    fontFamily: "system-ui, -apple-system, sans-serif"
                  }}
                >
                  BlogSpace is a full-stack MERN application that demonstrates modern web development 
                  practices. It features user authentication, CRUD operations, responsive design, 
                  and a clean user interface. This project showcases skills in both frontend and 
                  backend development, database design, and API integration.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default About;
