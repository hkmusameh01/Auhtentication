const {
  addingUserVotingValue,
  getPostVotesForSpesificUserById,
  increasingVotesNumberByOne,
  decreasingVotesNumberByOne,
} = require("../database/queries");

const vote = (req, res) => {
  const {
    user: { userId },
    params: { postId },
    body: { votingNumber, type },
  } = req;

  getPostVotesForSpesificUserById(userId, postId).then((data) => {
    const isVoting = data.rows[0]?.is_voting;

    if (type === "up" && !isVoting) {
      addingUserVotingValue(userId, postId, true)
        .then(() => increasingVotesNumberByOne(votingNumber, postId))
        .then(() => res.status(201).send({ msg: "voted successfully!" }))
        .catch((err) => console.log(err));
    } else if (type === "up" && isVoting === true) {
      addingUserVotingValue(userId, postId, false)
        .then(() => decreasingVotesNumberByOne(votingNumber, postId))
        .then(() => res.status(200).send({ msg: "updated successfully!" }))
        .catch((err) => console.log(err));
    } else if (
      type === "down" &&
      (data.rowCount === 0 || isVoting) &&
      votingNumber > 0
    ) {
      addingUserVotingValue(userId, postId, false)
        .then(() => decreasingVotesNumberByOne(votingNumber, postId))
        .then(() => res.status(201).send({ msg: "voted successfully!" }));
    } else if (type === "down" && isVoting === false && votingNumber > 2) {
      console.log("heello");
      addingUserVotingValue(userId, postId, true)
        .then(() => increasingVotesNumberByOne(votingNumber, postId))
        .then(() => res.status(200).send({ msg: "updated successfully!" }))
        .catch((err) => console.log(err));
    }
  });
};

module.exports = { vote };
