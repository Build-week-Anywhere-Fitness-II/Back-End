const request = require('supertest');
const server = require('./server.js');
const db = require('../database/dbConfig.js');
const testUser = {name:'testname', username: 'testusername', password: 'password', role: 'instructor'};
const classSeeds = [
    {class_name: 'fancy yoga class', type: 'Yoga', class_time: '10/20/2020:12:00:00', duration_minutes: 60, intensity_level: 1, location: 'New York, NY', attendees: '', max_class_size: '', instructor_id: 1},
    {class_name: 'fancy powerlifting class', type: 'strength', class_time: '10/25/2020:12:00:00', duration_minutes: 60, intensity_level: 5, location: 'New York, NY', attendees: '', max_class_size: '', instructor_id: 1},
    {class_name: "cycling",type: "endurance",class_time: "10/25/2020:16:30:00",duration_minutes: 60,intensity_level: 5,location: "1234 S Postman Ave Los Angeles, California",attendees: 7,max_class_size: 25,instructor_id: 1}
  ]

// prior to running test suite be sure to migrate the db
// knex migrate:latest --env=testing
describe('server.js', () => {
    
    beforeEach(async () => {
        await db('users').truncate();
        await db('classes').truncate();
    })

    
    let token;
    beforeAll((done) => {
        request(server)
          .post('/api/users/register')
          .send({
            name: 'test',
            username: 'testinstructor',
            password: 'password',
            role: 'instructor'
          })
          .end((err, response) => {
            token = response.body.token;
            done();
          });
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

    describe('GET /api/classes', () => {

        it('should return an array for authenticated users', async () => {
            await db('classes').insert(classSeeds)
            const res = await request(server)
                .get('/api/classes')
                .set('Authorization', 'bearer ' + token)
                expect(res.status).toBe(200)
                expect(res.body[0].class_name).toBe('fancy yoga class')
        });

        it('should return 404 for unauthenticated users', async () => {
            const res = await request(server)
                .get('/api/classes')
                expect(res.status).toBe(404)
        })
    })

    describe('PUT api/classes/edit/1', () => {
       
        it("should update the class_name to 'a new class name'", async () => {
            await db('classes').insert(classSeeds)
            const res = await request(server)
            .put('/api/classes/edit/1')
            .set('Authorization', 'bearer ' + token)
            .send({class_name: 'a new class name'})
            // console.log('res from edit', res.body)
            expect(res.body.class_name).toBe('a new class name')
        })

        it('should return 404 for unauthenticated users', async () => {
            const res = await request(server)
                .put('/api/classes/edit/1')
                expect(res.status).toBe(404)
        })
        
    })

    describe('DELETE api/classes/delete/3', () => {

        it('should return 200 after deleting a class', async () => {
            await db('classes').insert(classSeeds)
            const res = await request(server)
                .delete('/api/classes/delete/3')
                .set('Authorization', 'bearer ' + token)
                expect(res.status).toBe(200)

        }) 

        it('should return 404 if user is not authorized', async () => {
            const res = await request(server)
                .delete('/api/classes/delete/3')
                expect(res.status).toBe(404)
        })
        
    })
});

