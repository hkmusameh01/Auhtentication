const connection = require("../config/connection");

const getVotes = (userId, postId) => {
  return connection.query(
    "SELECT is_voting, post_id FROM user_vote_comment WHERE user_id = $1 AND post_id = $2",
    [userId, postId]
  );
};

const getSpecificPost = (postId) => {
  return connection.query(
    "SELECT * FROM posts WHERE id = $1",
    [postId]
  );
};

const voteForQuery = (userId, postId) => {

  return connection.query(
    'INSERT INTO user_vote_comment(user_id, post_id, is_voting) VALUES ($1, $2, true) ON CONFLICT  (user_id, post_id) DO UPDATE  SET  is_voting = true RETURNING *', [userId, postId]
  );
  // return connection.query(
    // "INSERT INTO user_vote_comment(user_id, post_id, is_voting) VALUES ($1, $2, true) RETURNING *",
    // [userId, postId]
  // );
};

const votesNumberFor = (votingNumber, postId) => {
  votingNumber += 1;

  return connection.query("UPDATE posts SET votingnumber = $1 WHERE id = $2", [
    votingNumber,
    postId,
  ]);
};

const voteAgainstQuery = (userId, postId) => {
  return connection.query(
    'INSERT INTO user_vote_comment(user_id, post_id, is_voting) VALUES ($1, $2, false) ON CONFLICT (user_id, post_id) DO UPDATE SET is_voting = false RETURNING *', [userId, postId]
  );
  // return connection.query(
  //   "INSERT INTO user_vote_comment(user_id, post_id, is_voting) VALUES ($1, $2, false)",
  //   [userId, postId]
  // );
};

const votesNumberAgainst = (votingNumber, postId) => {
  votingNumber -= 1;

  return connection.query("UPDATE posts SET votingnumber = $1 WHERE id = $2", [
    votingNumber,
    postId,
  ]);
};

module.exports = {
  voteForQuery,
  voteAgainstQuery,
  getVotes,
  votesNumberFor,
  votesNumberAgainst,
  getSpecificPost
};
