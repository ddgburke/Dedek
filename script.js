/* =========================
   SCROLL REVEAL
========================= */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if(entry.isIntersecting){

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold:0.12
    }
);

reveals.forEach((element) => {
    observer.observe(element);
});


/* =========================
   SCROLL PROGRESS
========================= */

const progress = document.createElement("div");

progress.style.position = "fixed";
progress.style.top = "0";
progress.style.left = "0";
progress.style.height = "2px";
progress.style.width = "0%";
progress.style.background = "#8a7458";
progress.style.zIndex = "2000";
progress.style.transition = "width .1s linear";

document.body.appendChild(progress);


window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        pageHeight > 0
        ? (scrollTop / pageHeight) * 100
        : 0;

    progress.style.width = percentage + "%";

});


/* =========================
   HERO IMAGE MOVEMENT
========================= */

const heroImage = document.querySelector(".hero-image");

window.addEventListener("scroll", () => {

    if(!heroImage) return;

    const scroll = window.scrollY;

    if(scroll < window.innerHeight){

        heroImage.style.transform =
            `translateY(${scroll * 0.045}px)`;

    }

});


/* =========================
   IMAGE LOAD FADE
========================= */

const images = document.querySelectorAll("img");

images.forEach((img) => {

    img.style.transition =
        "opacity .7s ease";

    if(img.complete){

        img.style.opacity = "1";

    }else{

        img.style.opacity = "0";

        img.addEventListener("load", () => {
            img.style.opacity = "1";
        });

    }

});


/* =========================
   DESKTOP CURSOR
========================= */

const cursor = document.createElement("div");
const cursorRing = document.createElement("div");

cursor.className = "cursor-dot";
cursorRing.className = "cursor-ring";

document.body.appendChild(cursor);
document.body.appendChild(cursorRing);


const cursorStyle = document.createElement("style");

cursorStyle.textContent = `

.cursor-dot{
    position:fixed;
    width:6px;
    height:6px;
    background:#8a7458;
    border-radius:50%;
    pointer-events:none;
    z-index:3000;
    transform:translate(-50%,-50%);
}

.cursor-ring{
    position:fixed;
    width:30px;
    height:30px;
    border:1px solid rgba(138,116,88,.5);
    border-radius:50%;
    pointer-events:none;
    z-index:2999;
    transform:translate(-50%,-50%);
    transition:
        width .25s ease,
        height .25s ease,
        background .25s ease;
}

@media(max-width:850px){
    .cursor-dot,
    .cursor-ring{
        display:none;
    }
}

`;

document.head.appendChild(cursorStyle);


let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";

});


function animateCursor(){

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";

    requestAnimationFrame(animateCursor);

}

animateCursor();


/* =========================
   HOVER CURSOR
========================= */

const interactiveElements =
    document.querySelectorAll(
        "a, button, .art-image, .video-card, .business-card"
    );

interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        cursorRing.style.width = "48px";
        cursorRing.style.height = "48px";
        cursorRing.style.background =
            "rgba(138,116,88,.06)";

    });

    element.addEventListener("mouseleave", () => {

        cursorRing.style.width = "30px";
        cursorRing.style.height = "30px";
        cursorRing.style.background =
            "transparent";

    });

});
