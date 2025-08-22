const express = require("express");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const quotes = require("./quotes");

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting: 5 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  keyGenerator: (req) => req.ip,
  handler: (req, res) => {
    const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
    res.status(429).json({
      error: `Rate limit exceeded. Try again in ${retryAfter > 0 ? retryAfter : 60} seconds.`,
    });
  },
});

// Logging: IP and response status
app.use(morgan(":remote-addr :method :url :status"));

// Quote endpoint with rate limiting
app.get("/api/quote", limiter, (req, res) => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Quote API running at http://localhost:${PORT}/api/quote`);
});

// Handle EADDRINUSE error gracefully
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Please stop the other process or use a different port.`);
    process.exit(1);
  } else {
    throw err;
  }
});
