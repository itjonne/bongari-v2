const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const helpers = require('./helpers');

const api = supertest(app);
const endpoint = '/api/users';

describe('User With no previous data', () => {
  beforeEach(async () => {
    await helpers.clearDB();
    await helpers.registerTestUsers(api);
  });

  test('User First Time Get Own Data', async () => {
    const user = helpers.getUser(0);
    const loginResponse = await helpers.loginUser(api, user);

    expect(loginResponse).toHaveProperty('token');

    // User registers to site
    const response = await api.get(`${endpoint}/self`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .set('User', loginResponse.id)
      .expect(200);

    console.log('Get Own Data Response', response.body);
    expect(response.body).toHaveProperty('finds');
  });
});

describe('User Can add a Find', () => {
  beforeEach(async () => {
    await helpers.clearDB();
    await helpers.registerTestUsers(api);
    await helpers.addObjects();
  });

  test('User First Time Add Find', async () => {
    const user = helpers.getUser(0);
    const loginResponse = await helpers.loginUser(api, user);

    expect(loginResponse).toHaveProperty('token');

    const response = await api.get(`${endpoint}/self`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .set('User', loginResponse.id)
      .expect(200);

    console.log('Get Own Data Response', response.body);
    expect(response.body).toHaveProperty('finds');

    const objects = await api.get('/api/objects')
      .expect(200);

    console.log('objects', objects.body);

    const addedFind = await api.post(`/api/finds/self/${objects.body[0].id}`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .set('User', loginResponse.id)
      .expect(201);

    console.log('added find', addedFind);

    const response2 = await api.get(`${endpoint}/self`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .set('User', loginResponse.id)
      .expect(200);

    // TODO: Tää tulee nyt stringinä ton Location-objektin takia.
    const newFinds = JSON.parse(response2.body.finds);
    console.log('response2', response2.body);
    expect(newFinds.length).toBe(1);
  });
});

describe('Users points get updated', () => {
  beforeEach(async () => {
    await helpers.clearDB();
    await helpers.registerTestUsers(api);
    await helpers.addObjects();
  });

  test('User First Time Add Find, Points get added', async () => {
    const user = helpers.getUser(0);
    const loginResponse = await helpers.loginUser(api, user);

    expect(loginResponse).toHaveProperty('token');

    const response = await api.get(`${endpoint}/self`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .set('User', loginResponse.id)
      .expect(200);

    expect(response.body).toHaveProperty('finds');
    expect(response.body.user.points).toBe(0); // ALKUPISTEET

    const objects = await api.get('/api/objects')
      .expect(200);

    const addedFind = await api.post(`/api/finds/self/${objects.body[0].id}`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .set('User', loginResponse.id)
      .expect(201);

    const addedPoints = addedFind.body.points;

    const response2 = await api.get(`${endpoint}/self`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .set('User', loginResponse.id)
      .expect(200);

    // TODO: Tää tulee nyt stringinä ton Location-objektin takia.
    const newFinds = JSON.parse(response2.body.finds);
    console.log('newFinds', newFinds);
    expect(newFinds.length).toBe(1);
    expect(response2.body.user.points).toBe(response.body.user.points + addedPoints);
  });

  test('User First Time Add Find Remove Find, Points get removed', async () => {
    const user = helpers.getUser(0);
    const loginResponse = await helpers.loginUser(api, user);

    expect(loginResponse).toHaveProperty('token');

    const response = await api.get(`${endpoint}/self`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .set('User', loginResponse.id)
      .expect(200);

    expect(response.body).toHaveProperty('finds');
    expect(response.body.user.points).toBe(0); // ALKUPISTEET

    const objects = await api.get('/api/objects')
      .expect(200);

    const addedFind = await api.post(`/api/finds/self/${objects.body[0].id}`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .set('User', loginResponse.id)
      .expect(201);

    const addedPoints = addedFind.body.points;

    const response2 = await api.get(`${endpoint}/self`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .set('User', loginResponse.id)
      .expect(200);

    // TODO: Tää tulee nyt stringinä ton Location-objektin takia.
    const newFinds = JSON.parse(response2.body.finds);
    console.log('newFinds', newFinds);
    expect(newFinds.length).toBe(1);
    expect(response2.body.user.points).toBe(response.body.user.points + addedPoints);

    // Delete the added object
    await api.delete(`/api/finds/self/${addedFind.body.id}`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .set('User', loginResponse.id)
      .expect(200);

    const response3 = await api.get(`${endpoint}/self`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .set('User', loginResponse.id)
      .expect(200);

    expect(response3.body.user.points).toBe(0);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
