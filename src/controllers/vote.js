const {
  voteForQuery,
  voteAgainstQuery,
  getVotes,
  votesNumberFor,
  votesNumberAgainst,
  getSpecificPost,
} = require("../database/queries");

const voteFor = (req, res) => {
  const {
    user: { userId },
    params: { postId },
    body: { votingNumber },
  } = req;

  // getSpecificPost(userId, postId)
  //   .then(data => {
  //     console.log(data.rows[0]);
  //     if(data.rows[0].id === +postId) {
  //       voteForQuery(userId, postId)
  //       .then(data => {
  //           votesNumberFor(votingNumber, postId)
  //             .then(data => res.status(200).send({status: 200, msg: 'voted successfully!'}))
  //             .catch(err => console.log(err))
  //         })
  //         .catch(err => console.log(err))
  //     } else {
  //       res.status(304).json({status: 304, msg: 'You can vote just one time'})
  //     }
  //   })
  //   .catch(err => console.log(err))

  getVotes(userId, req.params.postId).then((data) => {
    if (
      !(data.rows[0]?.post_id === req.params.postId) && (data.rowCount === 0 || data.rows[0].is_voting === false) ) {
      voteForQuery(userId, req.params.postId)
        .then((data) => {
          votesNumberFor(votingNumber, req.params.postId)
            .then((data) =>
              res.status(200).send({ status: 200, msg: "voted successfully!" })
            )
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      res.status(304).json({ status: 304, msg: "You can vote just one time" });
    }
  });
};

const voteAgainst = (req, res) => {
  const {
    user: { userId },
    params: { postId },
    body: { votingNumber },
  } = req;

  getVotes(userId, postId).then((data) => {
    console.log('from down', userId);
    console.log(data.rows[0]);
    if (data.rows[0]?.is_voting === true) {
      console.log(data.rows);
      voteAgainstQuery(userId, postId)
        .then((data) => {
          votesNumberAgainst(votingNumber, userId, postId)
            .then((data) =>
              res.status(200).send({ status: 200, msg: "voted successfully!" })
            )
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      console.log(data.rows);
      res.status(304).json({ status: 304, msg: "You can vote just one time" });
    }
  });
};

module.exports = { voteFor, voteAgainst };
