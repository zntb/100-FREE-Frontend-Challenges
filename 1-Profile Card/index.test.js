const request = require('supertest');
const {app, server} = require('./index');

afterAll(done => {
  server.close(done);
});

describe('POST /sortColors', () => {
  it('should sort the colors correctly', async () => {
    const response = await request(app)
      .post('/sortColors')
      .send({nums: [2, 0, 2, 1, 1, 0]})
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual([0, 0, 1, 1, 2, 2]);
  });

  it('should handle empty array', async () => {
    const response = await request(app).post('/sortColors').send({nums: []}).expect('Content-Type', /json/).expect(200);

    expect(response.body).toEqual([]);
  });

  it('should handle array with one element', async () => {
    const response = await request(app)
      .post('/sortColors')
      .send({nums: [1]})
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual([1]);
  });

  it('should handle array with already sorted elements', async () => {
    const response = await request(app)
      .post('/sortColors')
      .send({nums: [0, 1, 2]})
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual([0, 1, 2]);
  });

  it('should handle array with all the same elements', async () => {
    const response = await request(app)
      .post('/sortColors')
      .send({nums: [2, 2, 2]})
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual([2, 2, 2]);
  });
});
