import AOS from "aos";
import "aos/dist/aos.css";
import anime from "animejs/lib/anime.es.js";

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
    });
  }, 500);
});

document.querySelectorAll(".faq").forEach((faq) => {
  const header = faq.querySelector(".faq-header");
  const body = faq.querySelector(".faq-body");
  const icon = faq.querySelector("svg");

  if (body) {
    body.style.height = "0px";
    body.style.overflow = "hidden";
    body.style.transition = "height 0.4s ease-in-out";
  }

  faq.addEventListener("click", () => {
    if (body.style.height === "0px" || body.style.height === "") {
      body.style.height = body.scrollHeight + 10 + "px";
      body.style.paddingTop = "10px";
      anime({
        targets: icon,
        rotate: "180deg",
        duration: 300,
        easing: "easeInOutQuad",
      });
    } else {
      body.style.height = "0px";
      anime({
        targets: icon,
        rotate: "0deg",
        duration: 300,
        easing: "easeInOutQuad",
        complete: () => {
          body.style.paddingTop = "0px";
        },
      });
    }
  });
});
