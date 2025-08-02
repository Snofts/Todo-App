"use strict";

const body = document.body;
const iconMoon = document.querySelector(".icon-moon");
const iconSun = document.querySelector(".icon-sun");
const iconDelete = document.querySelector(".icon-bin");
const appBgImageLight = document.querySelector(".imglight");
const appBgImageDark = document.querySelector(".imgdark");
const appBgPlain = document.querySelector(".app__background--plain");
const appTextarea = document.querySelector(".input__textarea");
const appList = document.querySelector(".app__display--list");
const allAppList = document.querySelectorAll(".app__display--listitem");
const menuDisplay = document.querySelector(".display__menu");
const todoTxt = document.querySelector(".todo p");
const iconCircle = document.querySelectorAll(".icon-circle");
const iconCheck = document.querySelectorAll(".icon-checkcircle");
const iconAddTodo = document.querySelector(".icon-check");
const coverpage = document.querySelector(".coverpage");
const coverpageBtn = document.querySelector(".coverpage__btn");
const noTodo = document.querySelector(".nodisplay");
const itemleft = document.querySelector(".display__menu--itemleft");
const displayAll = document.querySelector(".display__all");
const displayActive = document.querySelector(".display__active");
const displayCompleted = document.querySelector(".display__completed");
const clearCompleted = document.querySelector(".display__menu--clear");
const deletePrompt = document.querySelector(".delete__prompt");
const deleteAll = document.querySelector(".delete__prompt--2");
const doNotDelete = document.querySelector(".delete__prompt--3");

////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

// SLide out coverpage to reveal app
class CoverPage {
  constructor(coverpage, coverpageBtn, body) {
    this.coverpage = coverpage;
    this.coverpageBtn = coverpageBtn;
    this.body = body;
  }

  contolScroll(){
    if(!coverpage.classList.contains("displayOff")){
      body.style.overflowY = "hidden";
    } else if (coverpage.classList.contains("displayOff")){
      body.style.overflowY = "scroll";
    };
  }

  slideOut() {
    this.coverpage.classList.add("animation_slideOutLeft");
    setTimeout(() => {
      this.coverpage.classList.add("displayOff");
      this.coverpage.classList.remove("animation_slideOutLeft");
    }, 1000);
    body.style.overflowY = "scroll";
  }

  startEvent() {
    this.coverpageBtn.addEventListener("click", () => {
      this.slideOut();
    });

    window.addEventListener("DOMContentLoaded", () => {
      this.contolScroll();
    });
  }
}

const cover = new CoverPage(coverpage, coverpageBtn, body);
cover.startEvent();

/////////////////////////////////////////////////////////////////////
class ThemeControl {
  constructor(
    appBgImageDark,
    appBgImageLight,
    appTextarea,
    appList,
    menuDisplay,
    iconSun,
    iconMoon,
    body
  ) {
    this.appBgImageDark = appBgImageDark;
    this.appBgImageLight = appBgImageLight;
    this.appTextarea = appTextarea;
    this.appList = appList;
    this.menuDisplay = menuDisplay;
    this.iconSun = iconSun;
    this.iconMoon = iconMoon;
    this.body = body;
  }

  darkMode() {
    this.iconSun.classList.remove("hidden");
    this.iconMoon.classList.add("hidden");
    this.body.style.backgroundColor = "black";
    this.appBgImageLight.classList.add("hidden");
    this.appBgImageDark.classList.remove("hidden");
    this.appList.style.boxShadow = "none";
    this.appList.classList.add("lightdarkbg");
    this.appTextarea.classList.add("darkmode");
    this.menuDisplay.classList.add("lightdarkbg");
  }

  lightMode() {
    this.iconSun.classList.add("hidden");
    this.iconMoon.classList.remove("hidden");
    this.body.style.backgroundColor = "white";
    this.appBgImageLight.classList.remove("hidden");
    this.appBgImageDark.classList.add("hidden");
    this.appList.classList.remove("lightdarkbg");
    this.appList.style.boxShadow = "1rem 1rem 5rem #c8c7c7";
    this.appTextarea.classList.remove("darkmode");
    this.menuDisplay.classList.remove("lightdarkbg");
  }

  startEvent() {
    this.iconSun.addEventListener("click", () => {
      this.lightMode();
    });
    this.iconMoon.addEventListener("click", () => {
      this.darkMode();
    });
  }
}

const theme = new ThemeControl(
  appBgImageDark,
  appBgImageLight,
  appTextarea,
  appList,
  menuDisplay,
  iconSun,
  iconMoon,
  body
);
theme.startEvent();

///////////////////////////////////////////////////////////////////////////////
class initialAppState {
  todoArray = JSON.parse(localStorage.getItem("todos")) || [];

  constructor(noTodo, appList) {
    this.noTodo = noTodo;
    this.appList = appList;
  }

  renderNoTodo() {
    if (this.todoArray.length === 0) {
      this.noTodo.classList.remove("hidden");
      console.log("No todo items found, displaying noTodo message.");
    } else return;
  }

  renderPrevTodo() {
    const appList = this.appList;
    this.todoArray.forEach((el) => {
      if (el.completed) {
        const html = `
          <div class="app__display--listitem todo" id="${el.id}">
            <svg class="icon icon-circle hidden">
              <use xlink:href="images/symbol-defs.svg#icon-circle"></use>
            </svg>
            <svg class="icon icon-checkcircle">
              <use xlink:href="images/symbol-defs.svg#icon-check-circle"></use>
            </svg>
            <p>${el.todo}</p>
          </div>
          `;

        this.appList.insertAdjacentHTML("beforeend", html);
        this.appList.scrollTop = this.appList.scrollHeight;
      } else {
        const html = `
          <div class="app__display--listitem todo" id="${el.id}">
            <svg class="icon icon-circle">
              <use xlink:href="images/symbol-defs.svg#icon-circle"></use>
            </svg>
            <svg class="icon icon-checkcircle hidden">
              <use xlink:href="images/symbol-defs.svg#icon-check-circle"></use>
            </svg>
            <p>${el.todo}</p>
          </div>
          `;

        this.appList.insertAdjacentHTML("beforeend", html);
        this.appList.scrollTop = this.appList.scrollHeight;
      }
      this.appList.scrollTop = 0;
    });
  }

  startEvent() {
    document.addEventListener("DOMContentLoaded", () => {
      this.renderNoTodo();
      this.renderPrevTodo();
    });
  }
}

const initialState = new initialAppState(noTodo, appList);
initialState.startEvent();

///////////////////////////////////////////////////////////////////////////////
class CreateTodo {
  constructor(appList, appTextarea, iconAddTodo, initialState, noTodo) {
    this.appList = appList;
    this.appTextarea = appTextarea;
    this.iconAddTodo = iconAddTodo;
    this.initialState = initialState;
    this.noTodo = noTodo;
  }

  createId() {
    const uniqueId = `todo-${crypto.randomUUID()}`;
    return uniqueId;
  }

  addTodo() {
    const todoInput = this.appTextarea.value;
    const todoSturc = {
      todo: `${todoInput}`,
      completed: false,
      id: this.createId(),
    };

    if (todoInput !== "") {
      const html = `
          <div class="app__display--listitem todo" id="${todoSturc.id}">
            <svg class="icon icon-circle">
              <use xlink:href="images/symbol-defs.svg#icon-circle"></use>
            </svg>
            <svg class="icon icon-checkcircle hidden">
              <use xlink:href="images/symbol-defs.svg#icon-check-circle"></use>
            </svg>
            <p>${todoInput}</p>
          </div>
          `;

      this.noTodo.classList.add("hidden");
      this.appList.insertAdjacentHTML("beforeend", html);
      this.appList.scrollTop = this.appList.scrollHeight;
      this.appTextarea.value = "";
      // console.log(todoSturc);
      const incomingTodoArray = this.initialState.todoArray;
      incomingTodoArray.push(todoSturc);
      localStorage.setItem(
        "todos",
        JSON.stringify(this.initialState.todoArray)
      );
    } else {
      alert("Input a task");
    }
  }

  startEvent() {
    this.iconAddTodo.addEventListener("click", () => {
      this.addTodo();
    });
  }
}

const newTodo = new CreateTodo(
  appList,
  appTextarea,
  iconAddTodo,
  initialState,
  noTodo
);
newTodo.startEvent();

////////////////////////////////////////////////////////////////////////
class MarkTodo {
  constructor(
    iconCircle,
    iconCheck,
    todoTxt,
    appList,
    newTodo,
    allAppList,
    initialState
  ) {
    this.iconCircle = iconCircle;
    this.iconCheck = iconCheck;
    this.todoTxt = todoTxt;
    this.appList = appList;
    this.allAppList = allAppList;
    this.initialState = initialState;
  }

  todoCompleted(todo) {
    const circle = todo.querySelector(".icon-circle");
    const check = todo.querySelector(".icon-checkcircle");
    const array = this.initialState.todoArray;
    const allAppListArray = Array.from(
      this.appList.querySelectorAll(".app__display--listitem")
    );
    const index = allAppListArray.indexOf(todo);

    circle.classList.toggle("hidden");
    check.classList.toggle("hidden");

    if (check.classList.contains("hidden")) {
      todo.style.textDecoration = "none";
      array[index].completed = false;
      localStorage.setItem("todos", JSON.stringify(array));
    } else {
      todo.style.textDecoration = "line-through";
      array[index].completed = true;
      localStorage.setItem("todos", JSON.stringify(array));
    }
  }

  startEvent() {
    this.appList.addEventListener("click", (e) => {
      const todo = e.target.closest(".app__display--listitem");
      if (
        e.target.matches("svg.icon-circle") ||
        e.target.matches("svg.icon-checkcircle")
      )
        this.todoCompleted(todo);
      else return;
    });
  }
}

const taskStatus = new MarkTodo(
  iconCircle,
  iconCheck,
  todoTxt,
  appList,
  newTodo,
  allAppList,
  initialState
);
taskStatus.startEvent();

////////////////////////////////////////////////////////////////////////

class useMenu {
  constructor(
    itemleft,
    displayAll,
    displayActive,
    displayCompleted,
    clearCompleted,
    iconAddTodo,
    appTextarea,
    iconCheck,
    iconCircle,
    appList
  ) {
    this.itemleft = itemleft;
    this.displayActive = displayActive;
    this.displayAll = displayAll;
    this.displayCompleted = displayCompleted;
    this.clearCompleted = clearCompleted;
    this.iconAddTodo = iconAddTodo;
    this.appTextarea = appTextarea; 
    this.iconCheck = iconCheck;
    this.iconCircle = iconCircle;
    this.appList = appList;                                 
  }

  calcUncompleted() {
    const allAppListArray = Array.from(
      appList.querySelectorAll(".app__display--listitem")
    );
    const uncompleted = allAppListArray.filter((el) =>
      el.querySelector(".icon-checkcircle").classList.contains("hidden")
    ).length;

    this.itemleft.textContent = `${uncompleted} items left`;
  }

  renderAll(){
    // const todoArray = JSON.parse(localStorage.getItem("todos")) || [];
    const array = Array.from(JSON.parse(localStorage.getItem("todos")))
    if(array.length !== 0) {
      this.appList.innerHTML = ""; // Clear the list before rendering
      array.forEach((el) => {
        if(!el.completed) {
          const html = `
          <div class="app__display--listitem todo" id="${el.id}">
            <svg class="icon icon-circle">
              <use xlink:href="images/symbol-defs.svg#icon-circle"></use>
            </svg>
            <svg class="icon icon-checkcircle hidden">
              <use xlink:href="images/symbol-defs.svg#icon-check-circle"></use>
            </svg>
            <p>${el.todo}</p>
          </div>
          `;

          this.appList.insertAdjacentHTML("beforeend", html);
        } else {
          const html = `
          <div class="app__display--listitem todo" id="${el.id}">
            <svg class="icon icon-circle hidden">
              <use xlink:href="images/symbol-defs.svg#icon-circle"></use>
            </svg>
            <svg class="icon icon-checkcircle">
              <use xlink:href="images/symbol-defs.svg#icon-check-circle"></use>
            </svg>
            <p>${el.todo}</p>
          </div>
          `;

          this.appList.insertAdjacentHTML("beforeend", html);
        }
      })
    } else return;
  }

  renderActive() {
    const array = Array.from(JSON.parse(localStorage.getItem("todos")))

    if(array.length !== 0) {
      this.appList.innerHTML = ""; // Clear the list before rendering
      array.forEach((el) => {
        if(!el.completed) {
          const html = `
          <div class="app__display--listitem todo" id="${el.id}">
            <svg class="icon icon-circle">
              <use xlink:href="images/symbol-defs.svg#icon-circle"></use>
            </svg>
            <svg class="icon icon-checkcircle hidden">
              <use xlink:href="images/symbol-defs.svg#icon-check-circle"></use>
            </svg>
            <p>${el.todo}</p>
          </div>
          `;

          this.appList.insertAdjacentHTML("beforeend", html);
        } else return
      })
    } else return;
  }

  renderCompleted() {
    const array = Array.from(JSON.parse(localStorage.getItem("todos")))

    if(array.length !== 0) {
      this.appList.innerHTML = ""; // Clear the list before rendering
      array.forEach((el) => {
        if(el.completed) {
          const html = `
          <div class="app__display--listitem todo" id="${el.id}">
            <svg class="icon icon-circle hidden">
              <use xlink:href="images/symbol-defs.svg#icon-circle"></use>
            </svg>
            <svg class="icon icon-checkcircle">
              <use xlink:href="images/symbol-defs.svg#icon-check-circle"></use>
            </svg>
            <p>${el.todo}</p>
          </div>
          `;

          this.appList.insertAdjacentHTML("beforeend", html);
        } else return
      })
    } else return;
  }

  removeCompleted() {
    const array = Array.from(JSON.parse(localStorage.getItem("todos")))

    if(array.length !== 0) {
      const filteredArray = array.filter(el => !el.completed);
      localStorage.setItem("todos", JSON.stringify(filteredArray));
      this.appList.innerHTML = ""; // Clear the list before rendering
      this.renderAll();
      this.calcUncompleted();
    } else return;
  }

  startEvent() {
    document.addEventListener("DOMContentLoaded", () => {
      this.calcUncompleted();
    });

    this.appList.addEventListener("click", (e) => {
      if(e.target.classList.contains("icon-circle") || e.target.classList.contains("icon-checkcircle")){
        this.calcUncompleted();
        console.log("Todo completed, item left updated");
      } else return;
    });

    this.iconAddTodo.addEventListener("click", () => {
      this.calcUncompleted();
    });

    this.displayAll.addEventListener("click", () => {
      this.renderAll();
    });

    this.displayActive.addEventListener("click", () => {
      this.renderActive();
    });

    this.displayCompleted.addEventListener("click", () => {
      this.renderCompleted();
    });
    
    this.clearCompleted.addEventListener("click", () => {
      this.removeCompleted();
    });
  }
}

const menu = new useMenu(
  itemleft,
  displayAll,
  displayActive,
  displayCompleted,
  clearCompleted,
  iconAddTodo,
  appTextarea,
  iconCheck,
  iconCircle,
  appList
);
menu.startEvent();

////////////////////////////////////////////////////////////////////////

class DeleteTodos {
  constructor(iconDelete, deleteAll, doNotDelete, appList, initialState, deletePrompt, noTodo) {
    this.iconDelete = iconDelete;
    this.deleteAll = deleteAll;
    this.doNotDelete = doNotDelete;
    this.appList = appList;
    this.initialState = initialState;
    this.deletePrompt = deletePrompt;
    this.noTodo = noTodo;
  }

  removeAllTodos() {
    localStorage.removeItem("todos");
    this.appList.innerHTML = ""; // Clear the list
    this.initialState.todoArray = [];
    this.noTodo.classList.remove("hidden");
    this.deletePrompt.classList.add("hidden");
  }

  startEvent(){
    this.iconDelete.addEventListener("click", () => {
      this.deletePrompt.classList.remove("hidden");
    })

    this.deleteAll.addEventListener("click", () => {
      this.removeAllTodos();
    })

    this.doNotDelete.addEventListener("click", () => {
      this.deletePrompt.classList.add("hidden");
    })
  }
}

const deleteAllTodos = new DeleteTodos(iconDelete, deleteAll, doNotDelete, appList, initialState, deletePrompt, noTodo);
deleteAllTodos.startEvent();
