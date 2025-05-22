"use strict";

const body = document.body;
const iconMoon = document.querySelector('.icon-moon');
const iconSun = document.querySelector('.icon-sun');
const appBgImageLight = document.querySelector('.imglight');
const appBgImageDark = document.querySelector('.imgdark');
const appBgPlain = document.querySelector('.app__background--plain');
const appTextarea = document.querySelector('.input__textarea');
const appList = document.querySelector('.app__display--list');
const menuDisplay = document.querySelector('.display__menu');
const todoTxt = document.querySelector('.todo p');
const iconCheck = document.querySelector('.icon-check');
const coverpage = document.querySelector('.coverpage');
const coverpageBtn = document.querySelector('.coverpage__btn');


////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// SLide out coverpage to reveal app
// coverpageBtn.addEventListener('click', function(){
//     console.log('Coverpage btn clicked');
//     coverpage.classList.add('animation_slideOutLeft');
//     setTimeout(function(){
//         coverpage.classList.add('displayOff');
//         coverpage.classList.remove('animation_slideOutLeft');
//     }, 1000);
// });



// Switch theme to dark mode
iconMoon.addEventListener('click', function(){
    iconSun.classList.remove('hidden');
    iconMoon.classList.add('hidden');
    body.style.backgroundColor = 'black';
    appBgImageLight.classList.add('hidden');
    appBgImageDark.classList.remove('hidden');
    appList.style.boxShadow = 'none';
    appList.classList.add('lightdarkbg')
    appTextarea.classList.add('darkmode');
    menuDisplay.classList.add('lightdarkbg');
})

// Switch theme back to light mode
iconSun.addEventListener('click', function(){
    iconSun.classList.add('hidden');
    iconMoon.classList.remove('hidden');
    body.style.backgroundColor = 'white';
    appBgImageLight.classList.remove('hidden');
    appBgImageDark.classList.add('hidden');
    appList.classList.remove('lightdarkbg')
    appList.style.boxShadow = '1rem 1rem 5rem #c8c7c7';
    appTextarea.classList.remove('darkmode');
    menuDisplay.classList.remove('lightdarkbg');
})