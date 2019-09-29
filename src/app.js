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

// Listen for Cancel Button
document.querySelector(".card-form").addEventListener("click", cancelEdit);

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
  const id = document.querySelector("#id").value;

  const data = {
    title,
    body
  };

  // Validate Input Fields
  if (title === "" || body === "") {
    ui.showAlert("Please fill all the fields", "alert alert-danger");
  } else {
    // Check for the ID
    if (id === "") {
      // Create Posts
      http
        .post("http://localhost:3000/posts", data)
        .then(data => {
          ui.showAlert("Post Added", "alert alert-success");
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      // Update Posts
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert("Post Updated", "alert alert-success");
          ui.changeFormState("add");
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }

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

    const data = {
      id,
      title,
      body
    };

    // Fill the form with the current post
    ui.fillForm(data);
  }
}

// Cancel Edit State
function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }

  e.preventDefault();
}
