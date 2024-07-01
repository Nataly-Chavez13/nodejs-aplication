const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100 });

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    return res.send(cachedResponse);
  }

  res.sendResponse = res.send;
  res.send = (body) => {
    cache.set(key, body);
    res.sendResponse(body);
  };

  next();
};

module.exports = cacheMiddleware;
