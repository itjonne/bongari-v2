const models = require('../models');
const FindableObject = require('../models/FindableObject');
const User = require('../models/User');
const data = require('../util/data_new.json');

// const generateHash = (password) => bcrypt.hashSync(password, 10);

const clearDB = async () => {
  models.forEach(async model => {
    console.log('deleting', model);
    await model.deleteMany({});
  });
  // for (const model of models) await model.deleteMany({});
};

const getUsers = async () => {
  const users = await User.find({});
  return users;
};

const getUser = (role) => {
  const users = [
    {
      email: 'user@email.com',
      username: 'user',
      password: 'userpassword',
      role: 0,
    },
    {
      email: 'admin@email.com',
      username: 'admin',
      password: 'adminpassword',
      role: 1,
    },
    {
      email: 'sysadmin@email.com',
      username: 'sysadmin',
      password: 'sysadminpassword',
      role: 2,
    },
    {
      email: 'owner@email.com',
      username: 'owner',
      password: 'ownerpassword',
      role: 3,
    },
  ];

  const correctUser = users.find(user => user.role === role);
  console.log(correctUser);
  return correctUser[0] ? correctUser[0] : correctUser;
};

const registerUser = async (api, user) => {
  const { email, password } = user;
  console.log('registering', email, password);
  const response = await api.post('/api/auth/register')
    .send({ email, password });
    // .expect(201);
  console.log(response.body);
};

const registerTestUsers = async (api) => {
  await registerUser(api, getUser(0));
  await registerUser(api, getUser(1));
  await registerUser(api, getUser(2));
  await registerUser(api, getUser(3));
};

const loginUser = async (api, user) => {
  const { email, password } = user;
  const loginResponse = await api.post('/api/auth/login')
    .send({ email, password })
    .expect(200);

  return loginResponse.body;
};

const addObjects = async () => {
  const objects = data.slice(0, 5);

  objects.forEach(async (object) => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    const newObject = { ...object, points: getRandomInt(21) };
    console.log('Changing points from into', object, newObject);
    const createdObject = new FindableObject(newObject);
    await createdObject.save();
  });
};

module.exports = {
  clearDB,
  getUsers,
  getUser,
  loginUser,
  registerTestUsers,
  addObjects,
};
