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
      createPost(data);
    })
    .catch((err) => console.log(err));
});

const createPostDom = ({ contents, username }) => {
  contents.forEach((post_) => {
    const post = document.createElement("div");
    post.setAttribute("class", "post");
    post.setAttribute("id", post_.id);

    const vote = document.createElement("div");
    vote.setAttribute("class", "vote");

    const angleUp = document.createElement("i");
    angleUp.setAttribute("class", "fa-solid fa-angle-up");
    const angleDown = document.createElement("i");
    angleDown.setAttribute("class", "fa-solid fa-angle-down");

    const votersNumber = document.createElement("p");
    votersNumber.setAttribute("class", "votersNumber");
    votersNumber.textContent = post_.votes_number;

    angleUp.addEventListener("click", (e) => {
      const postId = +e.target.closest(".post").id;
      let voteCounter = e.target.nextSibling;

      fetch(`/vote/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          votingNumber: Number(voteCounter.textContent),
          type: "up",
        }),
      })
        .then((data) => {
          if (data.status === 201) {
            voteCounter.textContent = Number(voteCounter.textContent) + 1;
          } else if (data.status === 200) {
            voteCounter.textContent = Number(voteCounter.textContent) - 1;
          } else {
            window.location = "/register";
          }
        })
        .catch((err) => console.log(err));
    });

    angleDown.addEventListener("click", (e) => {
      const postId = e.target.closest(".post").id;
      let voteCounter = e.target.previousSibling;

      fetch(`/vote/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          votingNumber: Number(voteCounter.textContent),
          type: "down",
        }),
      })
        .then((data) => {
          if (data.status === 201) {
            voteCounter.textContent = Number(voteCounter.textContent) - 1;
          } else if (data.status === 200) {
            voteCounter.textContent = Number(voteCounter.textContent) + 1;
          } else {
            window.location = "/register";
          }
        })
        .catch((err) => console.log(err));
    });

    // -------------------

    const postBody = document.createElement("div");
    postBody.setAttribute("class", "post-body");

    // ------------------

    const postInfo = document.createElement("div");
    postInfo.setAttribute("class", "post-info");
    const userNameH3 = document.createElement("h3");
    userNameH3.textContent = username;
    const xmark = document.createElement("i");
    xmark.setAttribute("class", "fa-solid fa-xmark");

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

    // -----------------------

    const edit = document.createElement("i");
    edit.setAttribute("class", "fa-solid fa-pen-to-square");
    edit.addEventListener("click", (e) => {
      postId = e.target.closest(".post").id;

      updatePost.style.display = "block";
      submitPost.style.display = "none";

      postContainer.value = postContent.textContent;
    });

    // ------------------
    const postContent = document.createElement("div");
    postContent.setAttribute("class", "post-content");
    const content = document.createElement("p");
    content.textContent = post_.content;

    // --------------------

    postContent.append(content);
    postInfo.append(userNameH3);
    postInfo.append(xmark);
    postInfo.append(edit);
    postBody.append(postInfo);
    postBody.append(content);
    vote.append(angleUp);
    vote.append(votersNumber);
    vote.append(angleDown);
    post.appendChild(vote);
    post.appendChild(postBody);
    postsSection.append(post);
  });
};

fetch("/post")
  .then((data) => {
    if (data.status === 200) {
      return data.json();
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
