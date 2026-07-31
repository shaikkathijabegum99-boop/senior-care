/*==================================================
 NETHRA SENIOR CARE
 GLOBAL.JS
 Component Loader
 Navbar Functionality
 Mobile Menu
 Dark Mode
 RTL Mode
 Sticky Header
==================================================*/
document.addEventListener("DOMContentLoaded",()=>{
/*==================================================
 COMPONENT LOADER
==================================================*/
async function loadComponent(selector,file){
const element =
document.querySelector(selector);
if(!element) return;
try{
const response =
await fetch(file);
if(!response.ok){
throw new Error(
"Component not found : "+file
);
}
element.innerHTML =
await response.text();
initNavbar();
setActiveNav();
}
catch(error){
console.error(error);
}
}
/*==================================================
LOAD NAVBAR
==================================================*/
loadComponent(
"#navbar",
"../components/navbar.html"
);
/*==================================================
LOAD FOOTER
==================================================*/
loadComponent(
"#footer",
"../components/footer.html"
);
});
/*==================================================
NAVBAR INITIALIZATION
==================================================*/
function initNavbar(){
if(document.body.dataset.navLoaded){
return;
}
document.body.dataset.navLoaded="true";
/*==================================================
ELEMENTS
==================================================*/
const ham =
document.getElementById("ham");
const mobNav =
document.getElementById("mob-nav");
const overlay =
document.getElementById("mob-overlay");
const closeBtn =
document.getElementById("mob-close");
const themeBtn =
document.getElementById("theme-btn");
const rtlBtn =
document.getElementById("rtl-btn");
const header =
document.querySelector(".site-header");
/*==================================================
LOAD SAVED SETTINGS
==================================================*/
const savedTheme =
localStorage.getItem("theme");
if(savedTheme){
document.documentElement
.setAttribute(
"data-theme",
savedTheme
);
}
const savedDirection =
localStorage.getItem("direction");
if(savedDirection){
document.documentElement
.setAttribute(
"dir",
savedDirection
);
}
/*==================================================
OPEN MOBILE MENU
==================================================*/
function openMenu(){
if(!mobNav) return;
mobNav.classList.add(
"active"
);
if(overlay){
overlay.classList.add(
"active"
);
}
if(ham){
ham.classList.add(
"active"
);
}
document.body.classList.add(
"menu-open"
);
}
/*==================================================
CLOSE MOBILE MENU
==================================================*/
function closeMenu(){
if(mobNav){
mobNav.classList.remove(
"active"
);
}
if(overlay){
overlay.classList.remove(
"active"
);
}
if(ham){
ham.classList.remove(
"active"
);
}
document.body.classList.remove(
"menu-open"
);
}
/*==================================================
HAMBURGER BUTTON
==================================================*/
if(ham){
ham.onclick = ()=>{
if(
mobNav.classList.contains(
"active"
)
){
closeMenu();
}
else{
openMenu();
}
};
}
/*==================================================
CLOSE BUTTON
==================================================*/
if(closeBtn){
closeBtn.onclick =
closeMenu;
}
/*==================================================
OVERLAY CLOSE
==================================================*/
if(overlay){
overlay.onclick =
closeMenu;
}
/*==================================================
MOBILE LINKS CLOSE
==================================================*/
document
.querySelectorAll(
".mob-nav a"
)
.forEach(link=>{
link.onclick =
closeMenu;
});
/*==================================================
MOBILE DROPDOWN
==================================================*/
const mobDrop =
document.querySelector(
".mob-dd-toggle"
);
const mobDropdown =
document.querySelector(
".mob-dropdown"
);
if(
mobDrop &&
mobDropdown
){
mobDrop.onclick = ()=>{
mobDropdown
.classList
.toggle(
"active"
);
mobDrop
.classList
.toggle(
"active"
);
};
}
/*==================================================
DARK LIGHT MODE
==================================================*/
if(themeBtn){
themeBtn.onclick = ()=>{
let current =
document.documentElement
.getAttribute(
"data-theme"
);
let theme =
current === "dark"
?
"light"
:
"dark";
document.documentElement
.setAttribute(
"data-theme",
theme
);
localStorage.setItem(
"theme",
theme
);
const icon =
themeBtn.querySelector("i");
if(icon){
icon.classList.toggle(
"fa-moon"
);
icon.classList.toggle(
"fa-sun"
);
}
};
}
/*==================================================
RTL TOGGLE
==================================================*/
if(rtlBtn){
rtlBtn.onclick = ()=>{
let current =
document.documentElement
.getAttribute(
"dir"
);
let direction =
current === "rtl"
?
"ltr"
:
"rtl";
document.documentElement
.setAttribute(
"dir",
direction
);
localStorage.setItem(
"direction",
direction
);
};
}
/*==================================================
STICKY HEADER
==================================================*/
window.addEventListener(
"scroll",
()=>{
if(!header)
return;
if(window.scrollY > 50){
header.classList.add(
"sticky"
);
}
else{
header.classList.remove(
"sticky"
);
}
});
}
/*==================================================
ACTIVE NAVIGATION
==================================================*/
function setActiveNav() {
    const current = window.location.pathname.toLowerCase();
    document.querySelectorAll(".nav-links a, .nav-dropdown a, .mob-nav a").forEach(link => {
        link.classList.remove("act");
        const href = link.getAttribute("href");
        if (!href) return;
        if (current.includes(href.replace("../","").toLowerCase())) {
            link.classList.add("act");
        }
    });
}