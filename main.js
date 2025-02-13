import AOS from "aos";
import "aos/dist/aos.css";

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
    });
  }, 500);
});
