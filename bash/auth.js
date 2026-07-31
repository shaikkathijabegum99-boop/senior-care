/*==================================================
NETHRA AUTH JS
Senior Care Authentication
==================================================*/
document.addEventListener("DOMContentLoaded",()=>{
/*==================================================
THEME TOGGLE
==================================================*/
const themeBtn =
document.getElementById("themeToggle");
const themeIcon =
themeBtn?.querySelector("i");
let savedTheme =
localStorage.getItem("theme");
if(savedTheme){
document.documentElement.setAttribute(
"data-theme",
savedTheme
);
updateThemeIcon(savedTheme);
}
themeBtn?.addEventListener(
"click",
()=>{
let currentTheme =
document.documentElement.getAttribute(
"data-theme"
);
let newTheme =
currentTheme==="light"
?
"dark"
:
"light";
document.documentElement.setAttribute(
"data-theme",
newTheme
);
localStorage.setItem(
"theme",
newTheme
);
updateThemeIcon(newTheme);
});
function updateThemeIcon(theme){
if(!themeIcon)
return;
if(theme==="dark"){
themeIcon.className=
"fa-solid fa-sun";
}
else{
themeIcon.className=
"fa-solid fa-moon";
}
}
/*==================================================
RTL TOGGLE
==================================================*/
const rtlBtn =
document.getElementById("rtlToggle");
rtlBtn?.addEventListener(
"click",
()=>{
let html =
document.documentElement;
let current =
html.getAttribute("dir");
if(current==="ltr"){
html.setAttribute(
"dir",
"rtl"
);
localStorage.setItem(
"direction",
"rtl"
);
}
else{
html.setAttribute(
"dir",
"ltr"
);
localStorage.setItem(
"direction",
"ltr"
);
}
});
let savedDirection =
localStorage.getItem(
"direction"
);
if(savedDirection){
document.documentElement.setAttribute(
"dir",
savedDirection
);
}
/*==================================================
PASSWORD SHOW / HIDE
==================================================*/
const passwordInput =
document.getElementById(
"password"
);
const passwordToggle =
document.querySelector(
".toggle-password"
);
passwordToggle?.addEventListener(
"click",
()=>{
if(passwordInput.type==="password"){
passwordInput.type="text";
passwordToggle.classList.remove(
"fa-eye"
);
passwordToggle.classList.add(
"fa-eye-slash"
);
}
else{
passwordInput.type="password";
passwordToggle.classList.remove(
"fa-eye-slash"
);
passwordToggle.classList.add(
"fa-eye"
);
}
});
/*==================================================
LOGIN FORM
==================================================*/
const authForm =
document.querySelector(
".auth-form"
);
const authButton =
document.querySelector(
".auth-btn"
);
authForm?.addEventListener(
"submit",
(e)=>{
e.preventDefault();
const email =
authForm.querySelector(
'input[type="email"]'
);
const password =
authForm.querySelector(
'input[type="password"]'
);
if(
!email.value.trim()
||
!password.value.trim()
){
showMessage(
"Please fill all required fields",
"error"
);
return;
}
authButton.innerHTML=
`
<i class="fa-solid fa-spinner fa-spin"></i>
Signing In...
`;
authButton.disabled=true;
setTimeout(()=>{
authButton.innerHTML=
`
<i class="fa-solid fa-check"></i>
Success
`;
showMessage(
"Login successful",
"success"
);
},1500);
});
/*==================================================
SOCIAL BUTTONS
==================================================*/
const socialButtons =
document.querySelectorAll(
".social-btn"
);
socialButtons.forEach(
button=>{
button.addEventListener(
"click",
()=>{
let name =
button.querySelector("span")
.textContent;
showMessage(
`${name} login selected`,
"success"
);
});
});
/*==================================================
MESSAGE ALERT
==================================================*/
function showMessage(
message,
type
){
let alert =
document.createElement(
"div"
);
alert.className=
`auth-alert ${type}`;
alert.innerHTML=
`
<i class="fa-solid ${
type==="success"
?
"fa-circle-check"
:
"fa-circle-exclamation"
}">
</i>
${message}
`;
document.body.appendChild(
alert
);
setTimeout(()=>{
alert.remove();
},3000);
}
});