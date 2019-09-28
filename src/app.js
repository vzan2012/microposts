import { http } from "./http";
import { ui } from "./ui";

// Get posts on DOM Load
document.addEventListener("DOMContentLoaded", getPosts);

// Listen for Add Post
document.querySelector(".post-submit").addEventListener("click", submitPost);

// Listen for Delete Post
document.querySelector("#posts").addEventListener("click", deletePost);

// Listen for Edit Post
document.querySelector("#posts").addEventListener("click", enableEdit);

// Get Posts
function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Submit Post
function submitPost(e) {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;

  const data = {
    title,
    body
  };

  http
    .post("http://localhost:3000/posts", data)
    .then(data => {
      ui.showAlert("Post Added", "alert alert-success");
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err));

  e.preventDefault();
}

// Delete Post
function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;

    http
      .delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert("Post Removed", "alert alert-success");
        getPosts();
      })
      .catch(err => console.log(err));
  }
}

// Edit Post
function enableEdit(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    console.log(title);
    console.log(body);

    const data = {
      id,
      title,
      body
    };

    // Fill the form with the current post 
    ui.fillForm(data);

    // http
    //   .put(`http://localhost:3000/posts/${id}`)
    //   .then(data => {
    //     ui.showAlert("Post Removed", "alert alert-success");
    //     getPosts();
    //   })
    //   .catch(err => console.log(err));
  }
}
