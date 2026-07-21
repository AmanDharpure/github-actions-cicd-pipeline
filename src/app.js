const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    application: "GitHub Actions CI/CD Pipeline",
    status: "running",
    environment: process.env.NODE_ENV || "development"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get("/api/tasks", (req, res) => {
  res.status(200).json({
    tasks: [
      {
        id: 1,
        title: "Build CI/CD pipeline",
        completed: true
      },
      {
        id: 2,
        title: "Deploy to staging",
        completed: false
      }
    ]
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

module.exports = app;