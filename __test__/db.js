const request = require("supertest");
const app = require("../src/app");

const connection = require("../src/database/config/connection");
const dbBuild = require("../src/database/config/build");
const { selectUserByEmail, insertPost } = require("../src/database/queries");

beforeAll(() => {
  return dbBuild();
});

test("test selectUserByEmail query: ", () => {
  selectUserByEmail("hakim@gmail.com")
    .then((data) => {
      console.log("tests successfully!");
    })
    .catch((err) => console.log(err));
});

test("test insertPost query: ", () => {
  insertPost(1, "Hello from the other side")
    .then((data) => {
      console.log("tests successfully!");
      console.log(data.rows);
    })
    .catch((err) => console.log(err));
});

// cut the connection client right after test finished;
// afterAll(() => {
//   return connection.end();
// });
