const usersRouter = require('express').Router();
const middleware = require('../util/middleware');
const helpers = require('./helpers');
const User = require('../models/User');
const Find = require('../models/Find');

/*
ROUTES:

GET : /
GET : /self
PUT : /self (email, username, language)
PUT : /:userId/points (admin only)
PUT : /:userId/role (admin only)

*/

// =============== ADMINS =================

usersRouter.get('/', middleware.requireAuth('ADMIN'), async (req, res) => {
  const users = await User.find({});
  return res.status(200).json(users.map(user => user.toJSON()));
});

usersRouter.put('/:userId/role/', middleware.requireAuth('ADMIN'), async (req, res) => {
  if (!req.body.role) return res.status(400).json({ error: 'invalid role update value' });

  const updatedRole = await User.findByIdAndUpdate(
    req.params.userId,
    { role: req.body.role },
    { new: true },
  );
  return updatedRole ? res.status(200).json(updatedRole) : res.status(400).json({ error: `problems updating user ${req.params.userId}` });
});

// UPDATE POINTS
usersRouter.put('/:userId/points', middleware.requireAuth('SYSADMIN'), async (req, res) => {
  const { userId } = req.params;
  const { points } = req.body;
  if (!userId || !points) return res.status(400).json({ error: 'problems updating points' });

  const user = await User.findById(userId);
  user.points = points;
  const updatedUser = await user.save();
  return res.status(200).json(updatedUser.toJSON());
});

// ================= SELF ====================

// GET SELF
// TODO: Onko liikaa stoppereita?
usersRouter.get('/self', middleware.requireExactUser, async (req, res) => {
  const userId = req.user;
  console.log(req.user);
  if (!userId) return res.status(401).json({ error: 'invalid userId' });
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: `user ${userId} not found` });

  // https://mongoosejs.com/docs/populate.html#deep-populate
  // populate({ path: 'categoryId', populate: { path: 'achievements' } });
  // const finds = await Find.find({ userId });

  return res.status(200).json(user.toJSON());
});

// Käyttäjä ei varmaan mielellään saa itse muuttaa pisteitä?!
usersRouter.put('/self', middleware.requireExactUser, async (req, res) => {
  const userId = req.user;
  const { email, username, language } = req.body;

  const user = await User.findById(userId);

  helpers.updateDocumentValues(user, { email, username, language });

  const updatedUser = await user.save();
  return res.status(200).json(updatedUser.toJSON());
});

// LEADERBOARD
usersRouter.get('/leaderboard', async (req, res) => {
  const users = await User.find({}).sort({ points: -1 }).limit(5);
  return res.status(200).json(users.map((user) => user.toJSON()));
});


module.exports = usersRouter;
