jest.mock('../src/config/database', () => jest.fn());

const request = require('supertest');
const app = require('../src/app');

describe('App Integration', () => {
    it('GET /health should return status OK', async() => {
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ status: 'OK', message: 'SurveySG Backend is running' });
    });

    it('GET unknown route should return 404', async() => {
        const res = await request(app).get('/unknown-path');
        expect(res.status).toBe(404);
    });
});