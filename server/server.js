import "dotenv/config";
import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {

    console.log("Firebase connected successfully");

    app.listen(PORT, () => {
      console.log(`\nServer is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`URL: http://localhost:${PORT}\n`);
    });

  } catch (error) {

    console.error("Server startup error:", error);

    process.exit(1);

  }
};

startServer();