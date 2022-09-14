const postContainer = document.getElementById("post");
const submitPost = document.getElementById("submitPost");
const updatePost = document.getElementById("updatePost");
const postsSection = document.getElementById("posts");

let postId;

updatePost.style.display = "none";

const createPost = (data) => {
  const postContent = postContainer.value;

  if (postContent.trim() === "") return alert("You must write sth!");

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postContent,
      userId: data.userId,
      username: data.username,
    }),
  };

  fetch("/post", options)
    .then((data) => {
      if (data.status === 200) {
        window.location = "/hello";
        return data.json();
      } else {
        window.location = "/"
      }
    })
    .catch((err) => console.log(err));

  post.value = "";
};

// ---------------------------------- userInfo for Dom
submitPost.addEventListener("click", (e) => {
  fetch("/userInfo")
    .then((data) => data.json())
    .then((data) => {
      console.log(data)
      createPost(data);
    })
    .catch((err) => console.log(err));
});

const createPostDom = ({ contents, username }) => {
  contents.forEach((content) => {
    const post = document.createElement("div");
    post.setAttribute("class", "post");
    post.setAttribute("id", content.id);
    const vote = document.createElement("div");
    vote.setAttribute("class", "vote");
    const angleUp = document.createElement("i");
    angleUp.setAttribute("class", "fa-solid fa-angle-up");
    // -------------------------------------------- voting
    angleUp.addEventListener("click", (e) => {
      const postId = e.target.closest(".post").id;
      let voteCounter = e.target.nextSibling;
      
      fetch(`/voteFor/${postId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          votingNumber: Number(voteCounter.textContent)
        })
      })
        .then(data => {
          if(data.status === 200) {
            voteCounter.textContent = Number(voteCounter.textContent) + 1;
          } else {
            console.log('You can not vote!')
          }
        })
        .catch((err) => console.log(err));

    });

    const votersNumber = document.createElement("p");
    votersNumber.setAttribute("class", "votersNumber");
    votersNumber.textContent = `${content.votingnumber}`;
    const angleDown = document.createElement("i");
    angleDown.setAttribute("class", "fa-solid fa-angle-down");
    // -------------------------------------------- voting
    angleDown.addEventListener("click", (e) => {
      const postId = e.target.closest(".post").id;
      let voteCounter = e.target.previousSibling;

      fetch(`/voteAgainst/${postId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          votingNumber: Number(voteCounter.textContent)
        })
      })
        .then(data => {
          if(data.status === 200) {
            voteCounter.textContent = Number(voteCounter.textContent) - 1;
          } else {
            console.log('You can not vote!')
          }
        })
        .catch((err) => console.log(err));

    })
    const postBody = document.createElement("div");
    postBody.setAttribute("class", "post-body");
    const postInfo = document.createElement("div");
    postInfo.setAttribute("class", "post-info");
    const userNameH3 = document.createElement("h3");
    userNameH3.setAttribute("class", "post-info");
    userNameH3.textContent = `${username}`;
    const xmark = document.createElement("i");
    xmark.setAttribute("class", "fa-solid fa-xmark");
    // -------------------------------------------- DeletePost
    xmark.addEventListener("click", (e) => {
      const postId = e.target.closest(".post").id;
      fetch(`/post/${postId}`, { method: "DELETE" })
        .then((data) => {
          if (data.status === 200) {
            document.getElementById(`${postId}`).remove();
          }
        })
        .catch((err) => console.log(err));
    });
    const edit = document.createElement("i");
    edit.setAttribute("class", "fa-solid fa-pen-to-square");
    // -------------------------------------------- editPost
    edit.addEventListener("click", (e) => {
      postId = e.target.closest(".post").id;

      updatePost.style.display = "block";
      submitPost.style.display = "none";

      postContainer.value = postContent.textContent;
    });
    const postContentContainer = document.createElement("div");
    postContentContainer.setAttribute("class", "post-content");
    const postContent = document.createElement("p");
    postContent.textContent = `${content.content}`;
    const comments = document.createElement("div");
    comments.setAttribute("class", "comments");
    const commentIcon = document.createElement("i");
    commentIcon.setAttribute("class", "fa-regular fa-comment");
    const commentsSpan = document.createElement("span");

    comments.append(commentIcon);
    comments.append(commentsSpan);
    postContentContainer.append(postContent);
    postInfo.append(userNameH3);
    postInfo.append(xmark);
    postInfo.append(edit);
    postBody.append(postInfo);
    postBody.append(postContent);
    postBody.append(comments);
    vote.append(angleUp);
    vote.append(votersNumber);
    vote.append(angleDown);
    post.appendChild(vote);
    post.appendChild(postBody);
    postsSection.append(post);
  });
};

fetch("/post")
  .then(data => {
    console.log(data.status);
    if(data.status === 200) {
      return data.json()
    } else {
      window.location = '/'
    }
  })
  .then((data) => createPostDom(data))
  .catch((err) => console.log(err));

// ------------------------------------------------------------------
updatePost.addEventListener("click", (e) => {
  const updatedContent = postContainer.value;

  fetch(`/post/${postId}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ updatedContent }),
  })
    .then((data) => {
      if (data.status === 200) {
        return data.json();
      }
    })
    .then((data) => {
      const paragraph = document.getElementById(`${postId}`).children[1]
        .children[1];
      paragraph.textContent = data.content;
    });

  updatePost.style.display = "none";
  submitPost.style.display = "block";
  postContainer.value = "";
});
