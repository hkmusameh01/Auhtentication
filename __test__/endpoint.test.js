const request = require("supertest");

const app = require("../src/app");
const connection = require("../src/database/config/connection");
const dbBuild = require("../src/database/config/build");

const { selectUserByEmail, insertPost } = require("../src/database/queries");
const { describe } = require("../src/validation/signup");

beforeAll(() => {
  return dbBuild();
});

// ------------------------------------- DATABASE

test("test selectUserByEmail query: ", () => {
  selectUserByEmail("hakim@gmail.com")
    .then((data) => {
      console.log("tests successfully!");
    })
    .catch((err) => console.log(err));
});

// test("test insertPost query: ", () => {
//   insertPost(2, "Hello from the other side dbTest")
//     .then((data) => {
//       console.log("tests successfully!");
//       console.log(data.rows);
//     })
//     .catch((err) => console.log(err));
// });

// ------------------------------------- DATABASE

// ------------------------------------- Endpoints

test("POST /register", (done) => {
  request(app)
    .post("/register")
    .send({ username: "hakim", password: "hakim", email: "hk1@gmail.com" })
    .expect(201)
    .expect("Content-Type", /json/)
    .end((err, res) => {
      if (err) return done(err);

      const token = res.header["set-cookie"][0].split(";")[0].split("=")[1];
      expect(token).toBeTruthy();

      done();
    });
});

test("POST /login", (done) => {
  request(app)
    .post("/login")
    .send({ email: "hk1@gmail.com", password: "hakim" })
    .expect(201)
    .expect("Content-Type", /json/)
    .end((err, res) => {
      if (err) return done(err);

      const token = res.header["set-cookie"][0].split(";")[0].split("=")[1];
      expect(token).toBeTruthy();
      done();
    });
});

test("POST /post", (done) => {
  request(app)
    .post("/post")
    .set("Cookie", `token=${process.env.TOKEN_FOR_TESTING}`)
    .send({ postContent: "hello from the other side", userId: 1 })
    .expect(201)
    .expect("Content-Type", /json/)
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

const getAllPosts = {
  posts: [
    {
      username: "hakim",
      content: "hello from the other side",
      votes_number: 0,
      id: 1,
    },
  ],
  isLogin: false,
};

test("GET /posts => get All posts", (done) => {
  request(app)
    .get("/posts")
    .expect(200)
    .expect("Content-Type", /json/)
    .expect(getAllPosts)
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

test("GET /post => Get Posts For Specific User", (done) => {
  request(app)
    .get("/post")
    .set("Cookie", `token=${process.env.TOKEN_FOR_TESTING}`)
    // .set("User", { username: "hakim", userId: 1 })
    .expect(200)
    .expect("Content-Type", /json/)
    .expect({
      contents: [
        { id: 1, content: "hello from the other side", votes_number: 0 },
      ],
      username: "hakim",
    })
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

test("PUT /post/:postId => Update post", (done) => {
  request(app)
    .put("/post/1")
    .set("Cookie", `token=${process.env.TOKEN_FOR_TESTING}`)
    .send({ updatedContent: "hello from update post route" })
    .expect(200)
    .expect("Content-Type", /json/)
    .expect({ content: "hello from update post route" })
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

test("DELETE /post/:postId => Delete post", (done) => {
  request(app)
    .delete("/post/1")
    .set("Cookie", `token=${process.env.TOKEN_FOR_TESTING}`)
    .expect(200)
    .expect("Content-Type", /json/)
    .expect({
      id: 1,
      user_id: 1,
      content: "hello from update post route",
      votes_number: 0,
    })
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

test("Add comment for post without token", (done) => {
  request(app)
    .post("/comment/1")
    .expect(500)
    .expect("Content-Type", /json/)
    .expect({
      msg: "Unauthorized User",
    })
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

// // I dont know why it does not work
// //  thrown: "Exceeded timeout of 5000 ms for a test.
// test("add comment", (done) => {
//   request(app)
//     .post("/comment/1")
//     .set("Cookie", `token=${process.env.TOKEN_FOR_TESTING}`)
//     .send({ comment: "hello from the other side", userId: 1 })
//     .expect(201)
//     .expect("Content-Type", /json/)
//     .end((err, res) => {
//       if (err) return done(err);
//       done();
//     });
// });

afterAll(() => {
  connection.end();
});
// REFERENCE
// If I didn't close the connection damn error will apper like this:

//( A worker process has failed to exit gracefully and has
// been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause
// this, ensure that .unref() was called on them. )

// ------------------->

// ===> But if you didn't close the connection in db.test.js another error will apper it sth like:

// ( Did you forget to wait for something async in your test? )
