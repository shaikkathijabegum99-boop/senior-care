/*==================================================
 NETHRA SENIOR CARE
 SERVICE DETAIL JS
==================================================*/document.addEventListener("DOMContentLoaded",()=>{/*==================================================
 FAQ ACCORDION
==================================================*/const faqCards=document.querySelectorAll(".faq-card");faqCards.forEach(card=>{const title=card.querySelector("h3");if(title){title.addEventListener("click",()=>{faqCards.forEach(item=>{

if(item!==card){

item.classList.remove("active");

}

});card.classList.toggle("active");});}});/*==================================================
 SCROLL REVEAL
==================================================*/const revealElements=document.querySelectorAll(
".detail-hero-content,\
.detail-hero-image,\
.detail-intro,\
.overview-image,\
.overview-content,\
.highlight-card,\
.included-card,\
.process-card,\
.benefit-item,\
.family-content,\
.family-image,\
.team-card,\
.pricing-card,\
.faq-card,\
.cta-box"
);revealElements.forEach(element=>{

element.classList.add("reveal");

});const observer=new IntersectionObserver(
(entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("show");observer.unobserve(entry.target);}});},
{
threshold:0.15
}
);revealElements.forEach(element=>{

observer.observe(element);

});/*==================================================
 SMOOTH SCROLL
==================================================*/document.querySelectorAll('a[href^="#"]').forEach(link=>{link.addEventListener("click",(e)=>{const target=document.querySelector(
link.getAttribute("href")
);if(target){e.preventDefault();target.scrollIntoView({

behavior:"smooth",

block:"start"

});}});});/*==================================================
 IMAGE LOADING EFFECT
==================================================*/const images=document.querySelectorAll("img");images.forEach(img=>{img.addEventListener("load",()=>{img.classList.add("loaded");});});/*==================================================
 BUTTON RIPPLE EFFECT
==================================================*/const buttons=document.querySelectorAll(".btn");buttons.forEach(button=>{button.addEventListener("click",(e)=>{const ripple=document.createElement("span");ripple.classList.add("ripple");const rect=button.getBoundingClientRect();ripple.style.left=
`${e.clientX-rect.left}px`;ripple.style.top=
`${e.clientY-rect.top}px`;button.appendChild(ripple);setTimeout(()=>{ripple.remove();},600);});});/*==================================================
 CARD HOVER EFFECT
==================================================*/const cards=document.querySelectorAll(
".highlight-card,\
.included-card,\
.process-card,\
.team-card,\
.pricing-card"
);cards.forEach(card=>{card.addEventListener(
"mouseenter",
()=>{card.classList.add("hover");}
);card.addEventListener(
"mouseleave",
()=>{card.classList.remove("hover");}
);});});