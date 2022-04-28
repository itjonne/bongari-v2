const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helpers = require('./helpers');

const api = supertest(app);
const endpoint = '/api/auth';

describe('User First Time Experience (Register/Login)', () => {
  beforeEach(async () => {
    await helpers.clearDB();
  });

  test('User First Time', async () => {
    const beforeUsers = await helpers.getUsers();
    expect(beforeUsers.length).toBe(0);

    const user = {
      email: 'test@email.com',
      password: 'password',
    };

    // User registers to site
    const response = await api.post(`${endpoint}/register`)
      .send(user)
      .expect(201);

    console.log('Register response body', response.body);
    expect(response.body).toHaveProperty('id');

    const afterUsers = await helpers.getUsers();
    expect(afterUsers.length).toBe(1);

    // User logins to site
    const loginResponse = await api.post(`${endpoint}/login`)
      .send(user)
      .expect(200);

    console.log('Login response body', loginResponse.body);
    expect(loginResponse.body).toHaveProperty('token');

    /*
    const usersResponse = await api.get('/api/users')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(401)
    */
  });

  test('User Failed Email-Address', async () => {
    const beforeUsers = await helpers.getUsers();
    expect(beforeUsers.length).toBe(0);

    const user = {
      email: 'test@email',
      password: 'password',
    };

    // User registers to site
    const response = await api.post(`${endpoint}/register`)
      .send(user)
      .expect(400);

    console.log('Register response body', response.body);
    expect(response.body).toHaveProperty('error');

    const afterUsers = await helpers.getUsers();
    expect(afterUsers.length).toBe(0);

    // User logins to site
    const loginResponse = await api.post(`${endpoint}/login`)
      .send(user)
      .expect(401);

    console.log('Login response body', loginResponse.body);
    expect(loginResponse.body).not.toHaveProperty('token');
  });

  test('User Already Exists', async () => {
    const beforeUsers = await helpers.getUsers();
    expect(beforeUsers.length).toBe(0);

    const user = {
      email: 'test@email.com',
      password: 'password',
    };

    // User registers to site
    const response = await api.post(`${endpoint}/register`)
      .send(user)
      .expect(201);

    console.log('Register response body', response.body);
    expect(response.body).toHaveProperty('id');

    const afterUsers = await helpers.getUsers();
    expect(afterUsers.length).toBe(1);

    // User logins to site
    const duplicateResponse = await api.post(`${endpoint}/register`)
      .send(user)
      .expect(400);

    console.log('Duplicate response body', duplicateResponse.body);
    expect(duplicateResponse.body).not.toHaveProperty('token');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
