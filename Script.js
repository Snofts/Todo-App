"use strict";

const body = document.body;
const iconMoon = document.querySelector(".icon-moon");
const iconSun = document.querySelector(".icon-sun");
const appBgImageLight = document.querySelector(".imglight");
const appBgImageDark = document.querySelector(".imgdark");
const appBgPlain = document.querySelector(".app__background--plain");
const appTextarea = document.querySelector(".input__textarea");
const appList = document.querySelector(".app__display--list");
const menuDisplay = document.querySelector(".display__menu");
const todoTxt = document.querySelector(".todo p");
const iconCircle = document.querySelectorAll(".icon-circle");
const iconCheck = document.querySelectorAll(".icon-checkcircle");
const iconAddTodo = document.querySelector(".icon-check");
const coverpage = document.querySelector(".coverpage");
const coverpageBtn = document.querySelector(".coverpage__btn");

const id = crypto.randomUUID();
console.log(id);



////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

// SLide out coverpage to reveal app
class CoverPage {
  constructor(coverpage, coverpageBtn) {
    this.coverpage = coverpage;
    this.coverpageBtn = coverpageBtn;
  }

  slideOut() {
    this.coverpage.classList.add("animation_slideOutLeft");
    setTimeout(() => {
      this.coverpage.classList.add("displayOff");
      this.coverpage.classList.remove("animation_slideOutLeft");
    }, 1000);
  }

  startEvent() {
    this.coverpageBtn.addEventListener("click", () => {
      this.slideOut();
    });
  }
}

const cover = new CoverPage(coverpage, coverpageBtn);
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


////////////////////////////////////////////////////////////////////////
class MarkTodo {
  constructor(iconCircle, iconCheck, todoTxt, appList) {
    this.iconCircle = iconCircle;
    this.iconCheck = iconCheck;
    this.todoTxt = todoTxt;
    this.appList = appList;
  }

  
  todoCompleted(todo) {
    const circle = todo.querySelector(".icon-circle");
    const check = todo.querySelector(".icon-checkcircle");

    circle.classList.toggle("hidden");
    check.classList.toggle("hidden");

    if(check.classList.contains("hidden")) todo.style.textDecoration = "none";
    else todo.style.textDecoration = "line-through"
  }


  startEvent() {
    this.appList.addEventListener("click", (e) => {
      const todo = e.target.closest('.app__display--listitem1');
      if (e.target.matches('svg.icon-circle') || e.target.matches("svg.icon-checkcircle")) this.todoCompleted(todo);
      else return;
      });
  }
}

const taskStatus = new MarkTodo(iconCircle, iconCheck, todoTxt, appList);
taskStatus.startEvent();



///////////////////////////////////////////////////////////////////////////////
class CreateTodo {
   todoArray = [];
  //  uniqueId = nanoid()

  constructor(appList, appTextarea, iconAddTodo) {
    this.appList = appList;
    this.appTextarea = appTextarea;
    this.iconAddTodo = iconAddTodo;
  }

  // createId(){
  //   uniqueId = `todo-${nanoid()}`
  // }

  addTodo() {
    const todoInput = this.appTextarea.value;
    const todoSturc =  {
      todotext: todoInput,
      completed: false,
      // id: `todo-${this.uniqueId}`
    }

    if (todoInput !== "") {
      const html = `
          <div class="app__display--listitem1 todo">
            <svg class="icon icon-circle">
              <use xlink:href="images/symbol-defs.svg#icon-circle"></use>
            </svg>
            <svg class="icon icon-checkcircle hidden">
              <use xlink:href="images/symbol-defs.svg#icon-check-circle"></use>
            </svg>
            <p>${todoInput}</p>
          </div>
          `;

    this.appList.insertAdjacentHTML('beforeend', html);
    this.appTextarea.value = "";

    this.todoArray.push(todoSturc);
    console.log(this.todoArray)
    } else {
      alert ('Input a task');
    }
  }

  startEvent(){
    this.iconAddTodo.addEventListener("click", () => {
        this.addTodo();
    });
  }
}

const newTodo = new CreateTodo(appList, appTextarea, iconAddTodo);
newTodo.startEvent();
