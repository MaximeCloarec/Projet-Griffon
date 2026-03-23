import request from 'supertest';
import app from '../../app';
import { describe, expect, it, beforeEach } from 'vitest';
import { prismaTest } from './setup';
describe('User Routes', () => {
    beforeEach(async () => {
        await prismaTest.user.deleteMany();
    });

    it('POST /api/users/register - Succès', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({ email: 'new@test.com', password: 'Azerty12' });

        expect(res.status).toBe(201);
    });
    it('POST /api/users/login - Succès', async () => {
        await request(app)
            .post('/api/users/register')
            .send({ email: 'login@test.com', password: 'Azerty12' });

        const res = await request(app)
            .post('/api/users/login')
            .send({ email: 'login@test.com', password: 'Azerty12' });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});