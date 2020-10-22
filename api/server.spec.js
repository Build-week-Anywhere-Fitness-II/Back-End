const request = require('supertest');
const server = require('./server.js');
const db = require('../database/dbConfig.js');
const testUser = {name:'testname', username: 'testusername', password: 'password', role: 'instructor'}

describe('server.js', () => {



    describe('GET /api/', () => {

        it('should return a status code of 200 if the server is up', async () => {
            const res = await request(server).get('/')
            expect(res.status).toBe(200);
        })

        it('should return a json object', async () => {
            const res = await request(server).get('/')
            expect(res.type).toBe('application/json');
        })

    });

    describe('POST /api/users/register', () => {

        it('should return a status code of 201 when registering a user', async () => {
            await db('users').truncate();
            const res = await request(server).post('/api/users/register')
                .send(testUser)
                expect(res.status).toBe(201)
        });

        // it('should return a status code of 500 if a bad user is passed in', async () => {
        //     await db('users').truncate();
        //     const res = await request(server).post('/api/users/register')
        //         .send({
        //             username: 'bad format',
        //             name: 'name',
        //             role: 'instructor'
        //         })
        //         expect(res.status).toBe(500)
        // });

    });

});