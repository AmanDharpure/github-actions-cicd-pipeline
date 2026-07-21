require("dotenv").config();

const app = require("./app");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});

const shutdown = () => {
  console.log("Shutting down application...");

  server.close(() => {
    console.log("Application stopped");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);