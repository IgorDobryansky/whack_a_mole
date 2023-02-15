import createElement from "../functions/create_element.js";
import User from "./User.js";

export default class Card {
  constructor({ body, title, id, userId }) {
    this._body = body;
    this._title = title;
    this._id = id;
    this._userId = userId;
  }

  get userId() {
    return this._userId;
  }

  get id() {
    return this._id;
  }

  get body() {
    return this._body;
  }

  set body(value) {
    this._body = value;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  createPost(parentElement, place) {
    const userPost = createElement("div", "post");
    const postTitle = createElement("span", "post-title");
    postTitle.innerText = this._title;
    const postBody = createElement("p", "post-body");
    postBody.innerText = this._body;
    const userInfo = createElement("span", "user-info");
    const buttonDeletePost = createElement("button", "delete-post");
    buttonDeletePost.innerText = "Delete post";
    const buttonEditPost = createElement("button", "edit-post");
    buttonEditPost.innerText = "Edit post";
    const buttonSavePostChanges = createElement("button", "change-post");
    buttonSavePostChanges.innerText = "Save changes";

    buttonDeletePost.addEventListener("click", () => {
      buttonDeletePost.disabled = true;
      fetch(`https://ajax.test-danit.com/api/json/posts/${this.id}`, {
        method: "DELETE",
      }).then((response) => {
        userPost.remove();
      });
    });

    buttonEditPost.addEventListener("click", editPostContent);

    buttonSavePostChanges.addEventListener("click", () => {
      buttonSavePostChanges.disabled = true;
      fetch(`https://ajax.test-danit.com/api/json/posts/${this.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: `${postTitle.innerText}`,
          body: `${postBody.innerText}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        editPostContentDiscard();
        buttonSavePostChanges.disabled = false;
      });
    });

    function editPostContentDiscard() {
      postTitle.contentEditable = "false";
      postTitle.classList.remove("edit");
      postBody.contentEditable = "false";
      postBody.classList.remove("edit");
      buttonSavePostChanges.style.display = "none";
      buttonEditPost.innerText = "Edit post";
      buttonEditPost.addEventListener("click", editPostContent);
    }

    function editPostContent() {
      postTitle.contentEditable = "true";
      postTitle.classList.add("edit");
      postBody.contentEditable = "true";
      postBody.classList.add("edit");
      buttonSavePostChanges.style.display = "block";
      buttonEditPost.innerText = "Discard";
      buttonEditPost.removeEventListener("click", editPostContent);
      buttonEditPost.addEventListener("click", editPostContentDiscard);
    }

    userPost.append(
      postTitle,
      postBody,
      userInfo,
      buttonDeletePost,
      buttonEditPost,
      buttonSavePostChanges
    );

    fetch("https://ajax.test-danit.com/api/json/users", {
      method: "GET",
    })
      .then((answer) => answer.json())
      .then((usersArray) => {
        usersArray.map((user) => {
          const newUser = new User(user);
          if (this.userId === newUser.getUserId) {
            userInfo.innerText = `Користувач ${newUser.getUserName}. Емейл ${newUser.getUserEmail}`;
          }
        });
      });

    parentElement.insertAdjacentElement(place, userPost);
  }
}
