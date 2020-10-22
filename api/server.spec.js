const request = require('supertest');
const server = require('./server.js');
const db = require('../database/dbConfig.js');
const testUser = {name:'testname', username: 'testusername', password: 'password', role: 'instructor'};
const registeredUser = {username: "Remy", password: "remy2020"}

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

        it('should return a status code of 500 if a bad user is passed in', async () => {
            await db('users').truncate();
            const res = await request(server).post('/api/users/register')
                .send({name: "Franx", username: "frnx", password: "secret"})
                expect(res.status).toBe(500)
        });

    });

    describe('POST /api/users/login', () => {
        it('should return a status code of 200 when logging a user', async () => {
            await request(server).post('/api/users/register')
                .send(testUser)
            const res = await request(server).post('/api/users/login')
                .send({username: "testusername", password: "password"})
                expect(res.status).toBe(200)
        });

        it('should return a status code of 500 if a bad user is passed in', async () => {
            const res = await request(server).post('/api/users/login')
                .send({name: "Franx", username: "frnx", password: "secret"})
                expect(res.status).toBe(500)
        });

    });

    // describe('GET /api/classes', () => {
    //     it('should return a status code of 200 when successfully retrieving classes', async () => {
    //         // const loggedIn = await request(server).post('/api/users/login')
    //         //     .send({username: "testusername", password: "password"})
    //         //     // console.log("loggedIn user", loggedIn.body.token)
    //         //     const initialToken = loggedIn.body.token
    //         var auth = {};
    //         before(loginUser(auth));
            
    //     const res = await request(server)
    //             .get('/api/classes')
    //             .set('Authorization', 'bearer ' + auth.token)
    //             let token = `Bearer ${auth.token}`
    //             console.log("newTokn", token)
    //             // .auth('username', 'password')
    //             expect(res.status).toBe(200)

    //     });
    // });

//     function loginUser(auth) {
//     return function(done) {
//         request
//             .post('/api/users/login')
//             .send({
//                 username: 'testusername',
//                 password: 'password'
//             })
//             .expect(200)
//             .end(onResponse);

//         function onResponse(err, res) {
//             auth.token = res.body.token;
//             return done();
//         }
//     };
// }

});

