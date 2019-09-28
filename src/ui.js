class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }

  showPosts(posts) {
    let output = "";

    posts.forEach(post => {
      output += `<div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-body">${post.body}</p>
          <a href="" class="edit card-link" data-id="${post.id}"><i class="fa fa-pencil"></i></a>
          <a href="" class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
        </div>
      </div>`;
    });

    this.post.innerHTML = output;
  }

  // Show Alert
  showAlert(message, className) {
    // Clear the Alert
    this.clearAlert();

    // Create the div element
    const div = document.createElement("div");
    // Add the className
    div.className = className;
    // Append the message
    div.appendChild(document.createTextNode(message));
    // Get the parent
    const container = document.querySelector(".postsContainer");
    // Get the posts
    const posts = document.querySelector("#posts");
    // Insert alert div
    container.insertBefore(div, posts);

    // Set Timeout 
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear the Alerts
  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) currentAlert.remove();
  }

  // Clear the Fields
  clearFields() {
    this.titleInput.value = "";
    this.titleBody.value = "";
  }
}

export const ui = new UI();
