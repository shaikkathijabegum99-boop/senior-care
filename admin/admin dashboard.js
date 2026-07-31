/*==================================================
NETHRA SENIOR CARE
FAMILY DASHBOARD JS
Features:
- Dark Mode
- Sidebar Mobile Menu
- Overlay
- Settings Toggle
- Active Nav
==================================================*/
document.addEventListener("DOMContentLoaded",()=>{
/*==================================================
DARK MODE
==================================================*/
const html=document.documentElement;
const themeToggle=document.getElementById(
"themeToggle"
);
const darkToggle=document.getElementById(
"darkToggle"
);
function applyTheme(theme){
html.setAttribute(
"data-theme",
theme
);
localStorage.setItem(
"nethra-theme",
theme
);
if(themeToggle){
let icon=themeToggle.querySelector("i");
if(icon){
icon.className=
theme==="dark"
?
"fa-solid fa-sun"
:
"fa-solid fa-moon";
}
}
if(darkToggle){
if(theme==="dark"){
darkToggle.classList.add(
"active"
);
}
else{
darkToggle.classList.remove(
"active"
);
}
}
}
let savedTheme=
localStorage.getItem(
"nethra-theme"
)
||
"light";
applyTheme(savedTheme);
function toggleTheme(){
let current=
html.getAttribute(
"data-theme"
);
applyTheme(
current==="light"
?
"dark"
:
"light"
);
}
themeToggle?.addEventListener(
"click",
toggleTheme
);
darkToggle?.addEventListener(
"click",
toggleTheme
);
/*==================================================
MOBILE SIDEBAR
==================================================*/
const sidebar=
document.getElementById(
"sidebar"
);
const menuBtn=
document.querySelector(
".menu-toggle"
);
const closeBtn=
document.querySelector(
".sidebar-close"
);
let overlay=
document.querySelector(
".sidebar-overlay"
);
if(!overlay){
overlay=
document.createElement(
"div"
);
overlay.className=
"sidebar-overlay";
document.body.appendChild(
overlay
);
}
function openSidebar(){
sidebar.classList.add(
"active"
);
overlay.classList.add(
"active"
);
}
function closeSidebar(){
sidebar.classList.remove(
"active"
);
overlay.classList.remove(
"active"
);
}
menuBtn?.addEventListener(
"click",
openSidebar
);
closeBtn?.addEventListener(
"click",
closeSidebar
);
overlay?.addEventListener(
"click",
closeSidebar
);
document.querySelectorAll(
".nav-link"
)
.forEach(link=>{
link.addEventListener(
"click",
()=>{
if(window.innerWidth<=1024){
closeSidebar();
}
});
});
/*==================================================
ACTIVE NAVIGATION
==================================================*/
const navLinks=
document.querySelectorAll(
".nav-link"
);
navLinks.forEach(link=>{
link.addEventListener(
"click",
()=>{
navLinks.forEach(item=>
item.classList.remove(
"active"
)
);
link.classList.add(
"active"
);
});
});
/*==================================================
SETTINGS TOGGLE SWITCH
==================================================*/
document.querySelectorAll(
".toggle-switch"
)
.forEach(toggle=>{
toggle.addEventListener(
"click",
()=>{
toggle.classList.toggle(
"active"
);
});
});
/*==================================================
SMOOTH SCROLL
==================================================*/
document.querySelectorAll(
'a[href^="#"]'
)
.forEach(anchor=>{
anchor.addEventListener(
"click",
function(e){
let target=
document.querySelector(
this.getAttribute("href")
);
if(target){
e.preventDefault();
target.scrollIntoView({
behavior:"smooth",
block:"start"
});
}
});
});
/*==================================================
SEARCH BOX
==================================================*/
const searchInput=
document.querySelector(
".search-box input"
);
searchInput?.addEventListener(
"keyup",
()=>{
let value=
searchInput.value.toLowerCase();
document.querySelectorAll(
".dashboard-card"
)
.forEach(card=>{
let text=
card.innerText.toLowerCase();
if(text.includes(value)){
card.style.display="";
}
else{
card.style.display="none";
}
});
});
});