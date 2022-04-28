require('dotenv').config();

const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;
const CATEGORIES = ['Kaikki', 'Nisäkkäät', 'Linnut', 'Kalat', 'Sienet', 'Puut & Pensaat', 'Kukkakasvit', 'Perhoset'];
const ROLES = {
  USER: 0,
  ADMIN: 1,
  SYSADMIN: 2,
  OWNER: 3,
};

module.exports = {
  MONGODB_URI,
  PORT,
  CATEGORIES,
  ROLES,
};
