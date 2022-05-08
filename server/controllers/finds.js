const findsRouter = require('express').Router();
const middleware = require('../util/middleware');
const Find = require('../models/Find');
const User = require('../models/User');
const FindableObject = require('../models/FindableObject');
const helpers = require('./helpers');

/*

ROUTES:

GET : / (Sysadmin)
GET : /self
GET : /self/:categoryName
GET : /self/:FindableObjectId
POST: /self/:FindableObjectId
DELETE : /self/:findId
PUT : /self/:findId (location, date, info, image)
*/

// TODO create update-function ( userId: FindableObjectId, findbleFindableObject: FindableObject,
// hasImage: boolean)
/* eslint-disable */
const updateUserPoints = (findableFindableObject, hasImage, foundBefore) => {
  const factor = hasImage ? 2 : 1;
  return foundBefore ? findableFindableObject.points : findableFindableObject.points * factor;
};
/* eslint-enable */

findsRouter.get('/', middleware.requireAuth('SYSADMIN'), async (req, res) => {
  const finds = await Find.find({});
  return finds ? res.status(200).json(finds) : res.status(404).json({ error: 'no finds found' });
});

findsRouter.get('/self', middleware.requireExactUser, async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) return res.status(400).json({ message: `user by id: ${req.user} not found` });

  const userFinds = await Find.find({ userId: req.user });
  return res.status(200).json(userFinds);
});

findsRouter.get('/self/:categoryName', middleware.requireExactUser, async (req, res) => {
  const userFinds = await Find.find({
    userId: req.user,
    category: req.params.categoryName,
  });
  return res.status(200).json(userFinds);
});

// ADD FIND
findsRouter.post('/self/:objectId', middleware.requireExactUser, async (req, res) => {
  console.log('adding find', req.params.objectId);
  const findableObject = await FindableObject.findById(req.params.objectId);
  if (!findableObject) return res.status(404).json({ error: 'FindableObject not found' });

  console.log('trying to find object', findableObject);
  console.log('location', req.body.location);

  const newFind = new Find({
    userId: req.user,
    objectId: req.params.objectId,
    category: findableObject.category,
    subcategory: findableObject.subcategory,
    location: req.body.location
      ? { type: 'Point', coordinates: req.body.location }
      : { type: 'Point', coordinates: [] },
    date: req.body.date ? req.body.date : new Date(),
    info: req.body.info ? req.body.info : '',
    points: findableObject.points,
    image: req.body.image ? req.body.image : '',
    thumbnail: findableObject.thumbnail,
  });
  console.log('creating find', newFind);
  let savedFind = null;
  try {
    savedFind = await newFind.save();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'problems creating new find' });
  }

  if (!savedFind) {
    return res.status(400).json({ message: 'problems creating new find' });
  }
  const userFinds = await Find.find({ userId: req.user });

  const points = helpers.calculatePointsToAdd(userFinds, newFind);

  const user = await User.findById(req.user);
  console.log('adding points to', user);
  console.log('points', points);
  const newPoints = user.points + points;
  console.log(newPoints);
  // JOstain syystä user.save() valitti Unique-idstä. TODO: !
  await User.updateOne({ _id: req.user }, { points: newPoints });
  // await updateUserAchievements(req.params.userId,
  // findableFindableObject, categoryId, req.body.image
  // ? req.body.image : null);
  /*
  const updatedPoints = updateUserPoints(findableFindableObject, req.body.image
    ? req.body.image : null, req.body.foundBefore ? req.body.foundBefore : null);

  const user = await User.findById(req.user);
  user.points += updatedPoints;
  await user.save();
  */
  return res.status(201).json(savedFind.toJSON());
});

// Delete
findsRouter.delete('/self/:findId', middleware.requireExactUser, async (req, res) => {
  const findToDelete = await Find.findById(req.params.findId);

  if (findToDelete.userId.toString() !== req.user.toString()) {
    return res.status(401).json({ message: 'no access' });
  }

  const deletedFind = await Find.findByIdAndDelete(req.params.findId);
  if (!deletedFind) return res.status(400).json({ message: 'problems deleting find' });

  const user = await User.findById(req.user);
  const userFinds = await Find.find({ userId: user._id });

  const points = helpers.calculatePointsToRemove(userFinds, findToDelete);
  const newPoints = user.points - points;
  await User.updateOne({ _id: req.user }, { points: newPoints });

  return res.status(200).json(deletedFind);
});

// Update
findsRouter.put('/self/:findId', middleware.requireExactUser, async (req, res) => {
  const findToUpdate = await Find.findById(req.params.findId);
  const finds = await Find.find({ userId: req.user });
  if (findToUpdate.userId.toString() !== req.user.toString()) {
    return res.status(401).json({ message: 'no access' });
  }

  const { location, date, info, image } = req.body;
  helpers.updateDocumentValues(findToUpdate, { location, date, info, image });

  const points = helpers.calculatePointsUpdate(finds, findToUpdate);

  const updatedFind = await findToUpdate.save();
  if (!updatedFind) {
    return res.status(400).json({ message: `problems updating ${req.params.findId}` });
  }

  // Jos pisteitä täyty päivittää
  if (points) {
    const user = await User.findById(req.user);
    const newPoints = user.points + points;
    await User.updateOne({ _id: req.user }, { points: newPoints });
  }

  return res.status(200).json(updatedFind);
});

// TODO: Tää varmaan pois
findsRouter.delete('/clear', middleware.requireAuth('SYSADMIN'), async (req, res) => {
  const response = await Find.deleteMany({});
  return res.status(200).json(response);
});

findsRouter.get('/latest', async (req, res) => {
  const response = await Find.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('userId')
    .populate('objectId');

  return res.status(200).json(response);
});

module.exports = findsRouter;
