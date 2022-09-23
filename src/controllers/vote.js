const {
  voteForQuery,
  getVotes,
  votesNumberFor,
  votesNumberAgainst,
} = require("../database/queries");

const voteFor = (req, res) => {
  const {
    user: { userId },
    params: { postId },
    body: { votingNumber, type },
  } = req;

  getVotes(userId, postId).then((data) => {
    const isVoting = data.rows[0]?.is_voting;

    if (type === "up" && !isVoting) {
      voteForQuery(userId, postId, true)
        .then(() => votesNumberFor(votingNumber, postId))
        .then(() => res.status(201).send({ msg: "voted successfully!" }))
        .catch((err) => console.log(err));
    } else if (type === "up" && isVoting === true) {
      voteForQuery(userId, postId, false)
        .then(() => votesNumberAgainst(votingNumber, postId))
        .then(() => res.status(200).send({ msg: "updated successfully!" }))
        .catch((err) => console.log(err));
    } else if (
      type === "down" &&
      (data.rowCount === 0 || isVoting) &&
      votingNumber > 0
    ) {
      voteForQuery(userId, postId, false)
        .then(() => votesNumberAgainst(votingNumber, postId))
        .then(() => res.status(201).send({ msg: "voted successfully!" }));
    } else if (type === "down" && isVoting === false && votingNumber > 2) {
      console.log("heello");
      voteForQuery(userId, postId, true)
        .then(() => votesNumberFor(votingNumber, postId))
        .then(() => res.status(200).send({ msg: "updated successfully!" }))
        .catch((err) => console.log(err));
    }
  });
};

module.exports = { voteFor };
