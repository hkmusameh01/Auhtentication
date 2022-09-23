const {updatePostQuery} = require('../../database/queries');

const updatePost = (req, res) => {
  const {params: {postId}, body: {updatedContent}} = req;

  updatePostQuery(updatedContent, postId)
    .then(data => res.status(200).send({content: data.rows[0].content}))
    .catch(err => console.log(err))
}

module.exports = updatePost;

