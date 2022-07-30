const { RateLimiterMemory } = require("rate-limiter-flexible");

const opts = {
  points: 10,
  duration: 1, // Per second
};

const rateLimiter = new RateLimiterMemory(opts);

module.exports = (req, res, next) => {
  const ipAddress =
    req.header("x-forwarded-for") || req.connection.remoteAddress;
  rateLimiter
    .consume(ipAddress, 2) // consume 2 points
    .then((rateLimiterRes) => {
      // 2 points consumed
      next();
    })
    .catch((rateLimiterRes) => {
      // Not enough points to consume
      return res.status(400).json({
        error: "Rate Limit Reached.",
      });
    });
};
