// const postsSection = document.getElementById('posts')

// const createPostDom = ({posts, isLogin}) => {
//   posts.forEach((content) => {
//     const post = document.createElement("div");
//     post.setAttribute("class", "post");
//     post.setAttribute("id", content.id);
//     const vote = document.createElement("div");
//     vote.setAttribute("class", "vote");
//     const angleUp = document.createElement("i");
//     angleUp.setAttribute("class", "fa-solid fa-angle-up");
//     const angleDown = document.createElement("i");
//     angleDown.setAttribute("class", "fa-solid fa-angle-down");
//     const postBody = document.createElement("div");
//     if(isLogin) {
//       // -------------------------------------------- votingFor
//       angleUp.addEventListener("click", (e) => {
//         const postId = +e.target.closest(".post").id;
//         let voteCounter = e.target.nextSibling;
  
//         fetch(`/voteFor/${postId}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             votingNumber: Number(voteCounter.textContent),
//           }),
//         })
//           .then((data) => {
//             if (data.status === 200) {
//               voteCounter.textContent = Number(voteCounter.textContent) + 1;
//             } else {
//               console.log("You can not vote!");
//             }
//           })
//           .catch((err) => {
//             console.log(err)
//             // alert('You need to login first')
//           });
//       });

//       // -------------------------------------------- voteAgainst
//       angleDown.addEventListener("click", (e) => {
//         const postId = e.target.closest(".post").id;
//         let voteCounter = e.target.previousSibling;
  
        // fetch(`/voteAgainst/${postId}`, {
        //   method: "PUT",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     votingNumber: Number(voteCounter.textContent),
        //   }),
        // })
//           .then((data) => {
            // if (data.status === 200) {
            //   voteCounter.textContent = Number(voteCounter.textContent) - 1;
            // } else {
            //   console.log("You can not vote!");
            // }
//           })
//           .catch((err) => console.log(err));
//       });
//     }

//     const votersNumber = document.createElement("p");
//     votersNumber.setAttribute("class", "votersNumber");
//     votersNumber.textContent = `${content.votingnumber}`;
//     postBody.setAttribute("class", "post-body");
//     const postInfo = document.createElement("div");
//     postInfo.setAttribute("class", "post-info");
//     const userNameH3 = document.createElement("h3");
//     userNameH3.setAttribute("class", "post-info");
//     userNameH3.textContent = `${content.username}`;
//     if(isLogin) {
//       const xmark = document.createElement("i");
//       xmark.setAttribute("class", "fa-solid fa-xmark");
      
//       // -------------------------------------------- DeletePost is done both sides
//       xmark.addEventListener("click", (e) => {
//         const postId = e.target.closest(".post").id;
//         fetch(`/post/${postId}`, { method: "DELETE" })
//         .then((data) => {
//           if (data.status === 200) {
//             document.getElementById(`${postId}`).remove();
//           }
//         })
//         .catch((err) => console.log(err));
//       });
//       postInfo.append(xmark);
//     }
//     const postContentContainer = document.createElement("div");
//     postContentContainer.setAttribute("class", "post-content");
//     const postContent = document.createElement("p");
//     postContent.textContent = `${content.content}`;
//     const comments = document.createElement("div");
//     comments.setAttribute("class", "comments");
//     const commentIcon = document.createElement("i");
//     commentIcon.setAttribute("class", "fa-regular fa-comment");
//     const commentsSpan = document.createElement("span");

//     comments.append(commentIcon);
//     comments.append(commentsSpan);
//     postContentContainer.append(postContent);
//     postInfo.append(userNameH3);
//     postBody.append(postInfo);
//     postBody.append(postContent);
//     postBody.append(comments);
//     vote.append(angleUp);
//     vote.append(votersNumber);
//     vote.append(angleDown);
//     post.appendChild(vote);
//     post.appendChild(postBody);
//     postsSection.append(post);
//   });
// };

// fetch("/posts")
//   .then((data) => data.json())
//   .then((data) => createPostDom(data))
//   .catch((err) => console.log(err));


