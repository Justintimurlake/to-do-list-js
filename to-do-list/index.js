class ToDoList {
  constructor() {
    this.formEl = document.querySelector(".form");
    this.inputEl = document.querySelector(".input");
    this.ulEl = document.querySelector(".list");

    this.list = JSON.parse(localStorage.getItem("list"));
    if (this.list) {
      this.list.forEach((task) => {
        this.createToDoListItem(task);
      });
    }

    this.formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      this.createToDoListItem();
    });
  }

  createToDoListItem(task) {
    let newTask = this.inputEl.value;
    if (task) {
      newTask = task.name;
    }

    const liEl = document.createElement("li");
    if (task && task.checked) {
      liEl.classList.add("checked");
    }
    liEl.innerText = newTask;
    this.ulEl.appendChild(liEl);
    this.inputEl.value = "";

    const checkBtnEl = document.createElement("div");
    checkBtnEl.innerHTML = `<i class="fas fa-check-square"></i>`;
    liEl.appendChild(checkBtnEl);

    const trashBtnEl = document.createElement("div");
    trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;
    liEl.appendChild(trashBtnEl);

    checkBtnEl.addEventListener("click", () => {
      liEl.classList.toggle("checked");
      this.updateLocalStorage();
    });

    trashBtnEl.addEventListener("click", () => {
      liEl.remove();
      this.updateLocalStorage();
    });

    this.updateLocalStorage();
  }

  updateLocalStorage() {
    const liEls = document.querySelectorAll("li");
    this.list = [];
    liEls.forEach((liEl) => {
      this.list.push({
        name: liEl.innerText,
        checked: liEl.classList.contains("checked"),
      });
    });
    localStorage.setItem("list", JSON.stringify(this.list));
  }
}

const toDoList = new ToDoList();
