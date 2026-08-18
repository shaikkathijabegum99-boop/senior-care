document.addEventListener("DOMContentLoaded",()=>{
const contactForm = document.querySelector(".contact-form");
if(contactForm){
contactForm.addEventListener("submit",(e)=>{
e.preventDefault();
const name =
contactForm.querySelector(
'input[type="text"]'
);
const phone =
contactForm.querySelector(
'input[type="tel"]'
);
const email =
contactForm.querySelector(
'input[type="email"]'
);
const service =
contactForm.querySelector(
"select"
);
const message =
contactForm.querySelector(
"textarea"
);
let valid=true;
[
name,
phone,
email,
service,
message
].forEach(field=>{
if(
!field.value.trim() ||
(
field.tagName==="SELECT" &&
field.selectedIndex===0
)
){
field.classList.add("error");
valid=false;
}
else{
field.classList.remove("error");
}
});
if(!valid){
showFormMessage(
"Please complete all required fields.",
"error"
);
return;
}
const button =
contactForm.querySelector("button");
const oldText =
button.innerHTML;
button.disabled=true;
button.innerHTML=`
<i class="fa-solid fa-spinner fa-spin"></i>
Sending...
`;
setTimeout(()=>{
showFormMessage(
"Thank you! Our care team will contact you shortly.",
"success"
);
contactForm.reset();
button.disabled=false;
button.innerHTML=oldText;
},1500);
});
}
function showFormMessage(text,type){
let messageBox =
document.querySelector(".form-message");
if(!messageBox){
messageBox =
document.createElement("div");
messageBox.className =
"form-message";
contactForm.prepend(messageBox);
}
messageBox.innerHTML=text;
messageBox.className =
"form-message "+type;
setTimeout(()=>{
messageBox.remove();
},4000);
}
const fields =
document.querySelectorAll(
".contact-form input, .contact-form select, .contact-form textarea"
);
fields.forEach(field=>{
field.addEventListener(
"focus",
()=>{
field.parentElement.classList.add(
"focused"
);
});
field.addEventListener(
"blur",
()=>{
field.parentElement.classList.remove(
"focused"
);
});
});
const faqItems =
document.querySelectorAll(".faq-item");
faqItems.forEach(item=>{
const button =
item.querySelector(".faq-question");
button.addEventListener(
"click",
()=>{
faqItems.forEach(other=>{
if(other!==item){
other.classList.remove(
"active"
);
}
});
item.classList.toggle(
"active"
);
});
});
const newsletter =
document.querySelector(
".newsletter-form"
);
if(newsletter){
newsletter.addEventListener(
"submit",
(e)=>{
e.preventDefault();
const email =
newsletter.querySelector(
"input"
);
if(
!email.value ||
!email.value.includes("@")
){
alert(
"Please enter a valid email address."
);
return;
}
alert(
"Thank you for subscribing!"
);
newsletter.reset();
});
}
document.querySelectorAll(
'a[href^="#"]'
)
.forEach(link=>{
link.addEventListener(
"click",
(e)=>{
const target =
document.querySelector(
link.getAttribute("href")
);
if(target){
e.preventDefault();
target.scrollIntoView({
behavior:"smooth"
});
}
});
});
});