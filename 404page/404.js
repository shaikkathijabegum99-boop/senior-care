
document.addEventListener("DOMContentLoaded",()=>{
const themeToggle = document.getElementById("themeToggle");
const darkToggle = document.getElementById("darkToggle");
const html = document.documentElement;
function enableDarkMode(){
html.setAttribute(
    "data-theme",
    "dark"
);
localStorage.setItem(
    "nethra-theme",
    "dark"
);
updateIcons();
}
function enableLightMode(){
html.setAttribute(
    "data-theme",
    "light"
);
localStorage.setItem(
    "nethra-theme",
    "light"
);
updateIcons();
}
function updateIcons(){
const themeIcon =
document.querySelector("#themeToggle i");
if(!themeIcon)
return;
if(
html.getAttribute("data-theme")
==="dark"
){
themeIcon.className =
"fa-solid fa-sun";
}
else{
themeIcon.className =
"fa-solid fa-moon";
}
}
const savedTheme =
localStorage.getItem(
"nethra-theme"
);
if(savedTheme){
html.setAttribute(
"data-theme",
savedTheme
);
}
else{
html.setAttribute(
"data-theme",
"light"
);
}
updateIcons();
if(themeToggle){
themeToggle.addEventListener(
"click",
()=>{
if(
html.getAttribute("data-theme")
==="light"
){
enableDarkMode();
}
else{
enableLightMode();
}
});
}
if(darkToggle){
darkToggle.addEventListener(
"click",
()=>{
if(
html.getAttribute("data-theme")
==="light"
){
enableDarkMode();
darkToggle.classList.add(
"active"
);
}
else{
enableLightMode();
darkToggle.classList.remove(
"active"
);
}
});
}
const backButton =
document.querySelector(
".error-actions .btn-primary"
);
if(backButton){
backButton.addEventListener(
"mouseenter",
()=>{
backButton.style.transform =
"translateY(-3px)";
}
);
backButton.addEventListener(
"mouseleave",
()=>{
backButton.style.transform =
"translateY(0)";
}
);
}
const container =
document.querySelector(
".error-container"
);
if(container){
container.style.opacity="0";
container.style.transform=
"translateY(30px)";
setTimeout(()=>{
container.style.transition=
"all .6s ease";
container.style.opacity="1";
container.style.transform=
"translateY(0)";
},100);
}
});