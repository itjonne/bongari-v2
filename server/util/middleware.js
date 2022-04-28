const jwt = require("jsonwebtoken");
const config = require("./config");

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  return next(error);
};

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  console.log("gettoken", authorization);
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request);
  if (token) {
    request.token = token;
  }
  return next();
};

const getUserFrom = (request) => {
  const user = request.get("user");
  console.log("getuser", user);
  if (user) {
    return user;
  }
  return null;
};

const userExtractor = (request, response, next) => {
  const user = getUserFrom(request);
  if (user) {
    request.user = user;
  }
  return next();
};

const tokenAuth = (request, response, next) => {
  const { token } = request;
  if (!token)
    return response.status(401).json({ error: "no access, no token found" });
  const verifiedToken = jwt.verify(token, process.env.secret);
  // TODO: Tähän vois tehdä oikean testin.
  if (!verifiedToken)
    return response.status(401).json({ error: "no access, invalid token" });
  return next();
};

// Require the role necessary as a middleware
const requireAuth = (role) => (req, res, next) => {
  console.log("authing", role);
  const { token } = req;
  console.log("token", token);
  if (!token)
    return res.status(401).json({ error: "no access, no token found" });

  console.log("auth", role, token);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const roleNumber = config.ROLES[role];
  if (!roleNumber)
    return res.status(401).json({ error: "invalid user role in auth" });

  console.log("decodedtoken", decodedToken);
  console.log("rolenumber", roleNumber);
  console.log("role", decodedToken.role);

  if (parseInt(decodedToken.role, 10) < parseInt(roleNumber, 10))
    return res.status(401).json({ error: "invalid user role" });

  return next();
};

const requireExactUser = (req, res, next) => {
  const { token, user } = req;
  console.log("exactuser", token, user);

  if (!user) return res.status(400).json({ error: "no user found" });
  if (!token)
    return res.status(401).json({ error: "no access, no token found" });

  const decodedToken = jwt.verify(token, process.env.SECRET);
  const tokenUserId = decodedToken.id;
  console.log("wanted user id", user);
  console.log("token user id", tokenUserId);

  // requireAuth('ADMIN');
  if (tokenUserId.toString() !== user.toString())
    return res.status(401).json({ error: "wrong user, can only get own data" });
  return next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  tokenAuth,
  requireAuth,
  requireExactUser,
};
