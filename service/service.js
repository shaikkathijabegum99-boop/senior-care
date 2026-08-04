
document.addEventListener("DOMContentLoaded",()=>{
const faqItems=document.querySelectorAll(".faq-item");
faqItems.forEach(item=>{
const question=item.querySelector("h3");
const answer=item.querySelector("p");
const icon=item.querySelector("i");
answer.style.maxHeight="0px";
answer.style.overflow="hidden";
answer.style.transition="0.4s ease";
question.addEventListener("click",()=>{
faqItems.forEach(other=>{
if(other!==item){
other.classList.remove("active");
const p=other.querySelector("p");
const i=other.querySelector("i");
p.style.maxHeight="0px";
i.classList.remove("fa-minus");
i.classList.add("fa-plus");
}
});
item.classList.toggle("active");
if(item.classList.contains("active")){
answer.style.maxHeight=answer.scrollHeight+"px";
icon.classList.remove("fa-plus");
icon.classList.add("fa-minus");
}else{
answer.style.maxHeight="0px";
icon.classList.remove("fa-minus");
icon.classList.add("fa-plus");
}
});
});
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
anchor.addEventListener("click",function(e){
const target=document.querySelector(this.getAttribute("href"));
if(target){
e.preventDefault();
target.scrollIntoView({
behavior:"smooth",
block:"start"
});
}
});
});
const revealItems=document.querySelectorAll(
".service-card,.pricing-card,.faq-item,.cta-box,.hero-content,.hero-image"
);
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
},{
threshold:0.15
});
revealItems.forEach(item=>{
item.classList.add("hidden");
observer.observe(item);
});
const floating=document.querySelector(".floating-card");
if(floating){
let direction=1;
setInterval(()=>{
floating.style.transform=
`translateY(${direction*10}px)`;
direction*=-1;
},2000);
}
document.querySelectorAll(".service-card").forEach(card=>{
card.addEventListener("mouseenter",()=>{
card.style.transform="translateY(-10px)";
});
card.addEventListener("mouseleave",()=>{
card.style.transform="translateY(0)";
});
});
document.querySelectorAll(".pricing-card").forEach(card=>{
card.addEventListener("mouseenter",()=>{
card.style.transform="translateY(-8px) scale(1.02)";
});
card.addEventListener("mouseleave",()=>{
card.style.transform="translateY(0) scale(1)";
});
});
document.querySelectorAll(".btn").forEach(btn=>{
btn.addEventListener("click",function(e){
const ripple=document.createElement("span");
const rect=this.getBoundingClientRect();
const size=Math.max(rect.width,rect.height);
ripple.style.width=size+"px";
ripple.style.height=size+"px";
ripple.style.left=e.clientX-rect.left-size/2+"px";
ripple.style.top=e.clientY-rect.top-size/2+"px";
ripple.className="ripple";
this.appendChild(ripple);
setTimeout(()=>{
ripple.remove();
},600);
});
});
const topBtn=document.createElement("button");
topBtn.innerHTML='<i class="fa-solid fa-arrow-up"></i>';
topBtn.className="back-to-top";
document.body.appendChild(topBtn);
window.addEventListener("scroll",()=>{
if(window.scrollY>500){
topBtn.classList.add("show");
}else{
topBtn.classList.remove("show");
}
});
topBtn.addEventListener("click",()=>{
window.scrollTo({
top:0,
behavior:"smooth"
});
});
const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll("nav a");
window.addEventListener("scroll",()=>{
let current="";
sections.forEach(section=>{
const top=section.offsetTop-150;
if(pageYOffset>=top){
current=section.getAttribute("id");
}
});
navLinks.forEach(link=>{
link.classList.remove("active");
if(link.getAttribute("href")==="#"+current){
link.classList.add("active");
}
});
});
document.querySelectorAll("[data-count]").forEach(counter=>{
const update=()=>{
const target=+counter.dataset.count;
const count=+counter.innerText;
const increment=target/100;
if(count<target){
counter.innerText=Math.ceil(count+increment);
requestAnimationFrame(update);
}else{
counter.innerText=target;
}
};
update();
});
});