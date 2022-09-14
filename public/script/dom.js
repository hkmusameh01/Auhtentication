const postsSection = document.getElementById("posts");

const createPostDom = ({ posts, isLogin }) => {
  posts.forEach((post_) => {
    const post = document.createElement("div");
    post.setAttribute("class", "post");
    post.setAttribute("id", post_.id);

    const vote = document.createElement("div");
    vote.setAttribute("class", "vote");

    const angleUp = document.createElement("i");
    angleUp.setAttribute("class", "fa-solid fa-angle-up");
    const angleDown = document.createElement("i");
    angleDown.setAttribute("class", "fa-solid fa-angle-down");
    const votesNumber = document.createElement("p");
    votesNumber.setAttribute("class", "votesNumber");
    votesNumber.textContent = post_.votingnumber;

    angleUp.addEventListener("click", (e) => {
      const postId = +e.target.closest(".post").id;
      let voteCounter = e.target.nextSibling;

      fetch(`/voteFor/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          votingNumber: Number(voteCounter.textContent),
          type: "up",
        }),
      })
        .then((data) => {
          if (data.status === 200) {
            voteCounter.textContent = Number(voteCounter.textContent) + 1;
          } else {
            console.log("You can vote once!");
          }
        })
        .catch((err) => console.log(err));
    });

    angleDown.addEventListener("click", (e) => {
      const postId = e.target.closest(".post").id;
      let voteCounter = e.target.previousSibling;
      console.log(postId);

      fetch(`/voteAgainst/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          votingNumber: Number(voteCounter.textContent),
          type: "down",
        }),
      })
        .then((data) => {
          if (data.status === 200) {
            voteCounter.textContent = Number(voteCounter.textContent) - 1;
          } else {
            console.log("You can vote once!");
          }
        })
        .catch((err) => console.log(err));
    });

    // -----------------

    const postBody = document.createElement("div");
    postBody.setAttribute("class", "post-body");

    // -------------------

    const postInfo = document.createElement("div");
    postInfo.setAttribute("class", "post-info");
    const userNameH3 = document.createElement("h3");
    userNameH3.textContent = post_.username;
    const dotsIcon = document.createElement("i");
    dotsIcon.setAttribute("class", "fa-solid fa-ellipsis");

    // --------------------

    const postContent = document.createElement("div");
    postContent.setAttribute("class", "post-content");
    const content = document.createElement("p");
    postContent.textContent = post_.content;

    // ------------------------

    const postComments = document.createElement("div");
    postComments.setAttribute("class", "post-comments");
    const commentIcon = document.createElement("i");
    commentIcon.setAttribute("class", "fa-regular fa-comment");
    const commentSpan = document.createElement("span");
    commentSpan.textContent = "Comments";

    // --------------------------

    const comments = document.createElement("div");
    comments.setAttribute("class", "comments hidden");
    const commentInput = document.createElement("input");
    commentInput.setAttribute("type", "text");
    commentInput.setAttribute("name", "comment");
    commentInput.setAttribute("id", "comment");
    commentInput.setAttribute("placeholder", "Your Comment");

    commentSpan.addEventListener("click", (e) => {
      comments.classList.toggle("hidden");
    });

    commentInput.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const postId = e.target.closest(".post").id;

      fetch(`/comment/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: commentInput.value,
        }),
      })
        .then((data) => data.json())
        .then((data) => alert(data.msg))
        .catch((err) => console.log("errrrr"));

      commentInput.value = "";
    });

    console.log(post_.id);
    fetch(`/comments/${post_.id}`)
      .then((data) => data.json())
      .then((data) => createCommentDomS(data))
      // .then(data => console.log(data))
      .catch((err) => console.log(err));

    const createCommentDomS = (data) => {
      data.forEach((commentData) => {
        const comment = document.createElement("div");
        comment.setAttribute("class", "comment");
        const commentOwner = document.createElement("span");
        commentOwner.setAttribute("class", "username");
        commentOwner.textContent = commentData.username;
        const commentContent = document.createElement("p");
        commentContent.textContent = commentData.content;

        comments.append(comment);
        comment.append(commentOwner);
        comment.append(commentContent);
      });
    };

    // -------------------------
    postsSection.append(post);
    post.appendChild(vote);
    vote.append(angleUp);
    vote.append(votesNumber);
    vote.append(angleDown);

    post.appendChild(postBody);

    postBody.append(postInfo);
    postInfo.append(userNameH3);
    postInfo.append(dotsIcon);

    postBody.append(postContent);
    postContent.append(content);

    postBody.append(postComments);
    postComments.append(commentIcon);
    postComments.append(commentSpan);

    postBody.append(comments);
    comments.append(commentInput);
  });
};
