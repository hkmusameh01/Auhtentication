const request = require("supertest");

const app = require("../src/app");
const connection = require("../src/database/config/connection");
const dbBuild = require('../src/database/config/build')

beforeAll(() => {
  return dbBuild();
})

test("GET /register", (done) => {
  request(app)
    .get("/register")
    .expect(200)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      if (err) return done(err);

      done();
    });
});

test("GET /login", (done) => {
  request(app)
    .get("/login")
    .expect(200)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      if (err) return done(err);

      done();
    });
});

test("POST /register", (done) => {
  request(app)
    .post("/register")
    .send({username: 'hakim', password: 'hakim', email: 'hk1@gmail.com'})
    .expect(201)
    .expect("Content-Type", /json/)
    .end((err, res) => {
      if (err) return done(err);

      done();
    });
});

test("POST /login", done => {
  request(app)
    .post('/login')
    .send({email: 'hk1@gmail.com', password: 'hakim'})
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);

      done();
    })
})

afterAll(() => {
  connection.end()
})
// REFERENCE
// If I didn't close the connection damn error will apper like this: 

//( A worker process has failed to exit gracefully and has 
// been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause 
// this, ensure that .unref() was called on them. )

// ------------------->

// ===> But if you didn't close the connection in db.test.js another error will apper it sth like:

// ( Did you forget to wait for something async in your test? )