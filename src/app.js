import { http } from "./http";
import { ui } from "./ui";

// Get posts on DOM Load
document.addEventListener("DOMContentLoaded", getPosts);

// Listen for Add Post
document.querySelector(".post-submit").addEventListener("click", submitPost);

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
      ui.showAlert("Post Added","alert alert-success");
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err));

  e.preventDefault();
}
