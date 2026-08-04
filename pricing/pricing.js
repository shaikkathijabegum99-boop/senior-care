
document.addEventListener(
"DOMContentLoaded",
()=>{

const faqItems =
document.querySelectorAll(".faq-item");
faqItems.forEach(item=>{
const button =
item.querySelector(".faq-question");
const answer =
item.querySelector(".faq-answer");
if(item.classList.contains("active")){
    answer.style.display="block";
}
else{
    answer.style.display="none";
}
button.addEventListener(
"click",
()=>{
faqItems.forEach(other=>{
if(other!==item){
    other.classList.remove("active");
    const otherAnswer =
    other.querySelector(".faq-answer");
    if(otherAnswer){
        otherAnswer.style.display="none";
    }
}
});
item.classList.toggle("active");
if(item.classList.contains("active")){
answer.style.display="block";
answer.style.animation=
"faqOpen .35s ease";
}
else{
answer.style.display="none";
}
});
});

const newsletterForm =
document.querySelector(".newsletter-form");
if(newsletterForm){
newsletterForm.addEventListener(
"submit",
(e)=>{
e.preventDefault();
const input =
newsletterForm.querySelector(
"input[type='email']"
);
const email =
input.value.trim();
if(email===""){
showMessage(
"Please enter your email address",
"error"
);
return;
}
if(!validateEmail(email)){
showMessage(
"Please enter a valid email address",
"error"
);
return;
}
showMessage(
"Thank you for subscribing!",
"success"
);
newsletterForm.reset();
});
}
function validateEmail(email){
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
.test(email);
}
function showMessage(
message,
type
){
let alertBox =
document.querySelector(
".pricing-alert"
);
if(!alertBox){
alertBox =
document.createElement("div");
alertBox.className =
"pricing-alert";
document.body.appendChild(
alertBox
);
}
alertBox.textContent =
message;
alertBox.className =
`pricing-alert ${type}`;
setTimeout(()=>{
alertBox.className =
"pricing-alert";
},3000);
}

const pricingCards =
document.querySelectorAll(
".pricing-card"
);
pricingCards.forEach(
(card,index)=>{
card.style.opacity="0";
card.style.transform=
"translateY(30px)";
setTimeout(()=>{
card.style.transition=
"all .5s ease";
card.style.opacity="1";
card.style.transform=
"translateY(0)";
},
index*120);
});

const buttons =
document.querySelectorAll(
".pricing-card .btn"
);
buttons.forEach(btn=>{
btn.addEventListener(
"click",
()=>{
btn.classList.add(
"clicked"
);
setTimeout(()=>{
btn.classList.remove(
"clicked"
);
},700);
});
});
});