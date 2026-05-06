import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.config.js";
console.log("JWT_SECRET:", process.env.JWT_SECRET); 
const PORT = process.env.PORT || 5000;

console.log("DB URI:", process.env.MONGODB_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`\n Server is running on port ${PORT}`);
      console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(` URL: http://localhost:${PORT}\n`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
