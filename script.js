let todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const savedList = JSON.parse(localStorage.getItem("saved-items"));

const createTodo = function (savedList) {
  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");
    savedItemsFn();
  });

  newLi.addEventListener("dbclick", () => {
    newLi.remove();
  });
  if (savedList) {
    newSpan.textContent = savedList.contents;
    if (savedList.complete) {
      newLi.classList.toggle("complete");
    }
  } else {
    newSpan.textContent = todoInput.value;
  }

  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  todoInput.value = "";
  console.log(savedList.complete);
};

const keyCodeCheck = function (e) {
  if (e.key === "Enter" && todoInput.value) {
    createTodo();
    savedItemsFn();
  }
};

const deleteAll = function () {
  const liList = document.querySelectorAll("li");
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
};

const savedItemsFn = function () {
  const savedItems = [];
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].innerText,
      complete: todoList.children[i].classList.contains("complete"),
    };
    savedItems.push(todoObj);
  }
  localStorage.setItem("saved-items", JSON.stringify(savedItems));
};

if (savedList) {
  for (let i = 0; i < savedList.length; i++) {
    createTodo(savedList[i]);
  }
}
