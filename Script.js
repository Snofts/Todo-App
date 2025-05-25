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
const iconCircle = document.querySelector(".icon-circle");
const iconCheck = document.querySelector(".icon-checkcircle");
const iconAddTodo = document.querySelector(".icon-check");
const coverpage = document.querySelector(".coverpage");
const coverpageBtn = document.querySelector(".coverpage__btn");

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
  constructor(iconCircle, iconCheck, todoTxt) {
    this.iconCircle = iconCircle;
    this.iconCheck = iconCheck;
    this.todoTxt = todoTxt;
  }

  todoCompleted() {
    this.iconCircle.classList.add("hidden");
    this.iconCheck.classList.remove("hidden");
    this.todoTxt.style.textDecoration = "line-through";
  }

  undoCompleted() {
    this.iconCircle.classList.remove("hidden");
    this.iconCheck.classList.add("hidden");
    this.todoTxt.style.textDecoration = "none";
  }

  startEvent() {
    this.iconCircle.addEventListener("click", () => {
      this.todoCompleted();
    });
    this.iconCheck.addEventListener("click", () => {
      this.undoCompleted();
    });
  }
}

const taskStatus = new MarkTodo(iconCircle, iconCheck, todoTxt);
taskStatus.startEvent();



///////////////////////////////////////////////////////////////////////////////
class CreateTodo {
  constructor(appList, appTextarea, iconAddTodo) {
    this.appList = appList;
    this.appTextarea = appTextarea;
    this.iconAddTodo = iconAddTodo;
  }

  addTodo() {
    const todoInput = this.appTextarea.value;
    this.appList.insertAdjacentHTML = "";
  }

  startEvent(){
    this.iconAddTodo.addEventListener("click", () => {
        this.addTodo();
    });
  }
}

const newTodo = new CreateTodo(appList, appTextarea, iconAddTodo);
newTodo.startEvent();
