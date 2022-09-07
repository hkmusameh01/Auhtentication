const connection = require("../src/database/config/connection");
const dbBuild = require("../src/database/config/build");
const {
  insertUserInfo,
  selectUserByEmail,
} = require("../src/database/queries");

beforeAll(() => {
  return dbBuild();
});

test("test insertUserInfo query: ", () => {
  insertUserInfo({
    username: "Hakim",
    password: "12345",
    email: "hakim@gmail.com",
  })
    .then((data) => {
      // console.log(data.rows[0]); // reference 
      console.log("tests successfully!");
    })
    .catch((err) => console.log(err));
});

// You must have data in database to run this test successfully!
test("test selectUserByEmail query: ", () => {
  selectUserByEmail("hakim@gmail.com")
    .then((data) => {
      // console.log(data); // reference 
      console.log("tests successfully!");
    })
    .catch((err) => console.log(err));
});

// cut the connection client right after test finished;
afterAll(() => {
  return connection.end();
});
