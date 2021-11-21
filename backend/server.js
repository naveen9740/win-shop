const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handling Uncaught exception
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting down the server due to uncaughtException");
  process.exit(1);
});

// config
dotenv.config({ path: `backend/config/config.env` });

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started ${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
