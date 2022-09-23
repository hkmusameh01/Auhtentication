const connection = require("../config/connection");

const getPostVotesForSpesificUserById = (userId, postId) => {
  return connection.query(
    "SELECT is_voting, post_id FROM user_vote WHERE user_id = $1 AND post_id = $2",
    [userId, postId]
  );
};

const addingUserVotingValue = (userId, postId, votingValue) => {
  return connection.query(
    "INSERT INTO user_vote(user_id, post_id, is_voting) VALUES ($1, $2, true) ON CONFLICT  (user_id, post_id) DO UPDATE  SET  is_voting = $3 RETURNING *",
    [userId, postId, votingValue]
  );
};

const increasingVotesNumberByOne = (votingNumber, postId) => {
  votingNumber += 1;

  return connection.query("UPDATE posts SET votes_number = $1 WHERE id = $2", [
    votingNumber,
    postId,
  ]);
};

const decreasingVotesNumberByOne = (votingNumber, postId) => {
  votingNumber -= 1;

  return connection.query("UPDATE posts SET votes_number = $1 WHERE id = $2", [
    votingNumber,
    postId,
  ]);
};

module.exports = {
  addingUserVotingValue,
  getPostVotesForSpesificUserById,
  increasingVotesNumberByOne,
  decreasingVotesNumberByOne,
};
