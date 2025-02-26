import AOS from "aos";
import "aos/dist/aos.css";
import anime from "animejs/lib/anime.es.js";
import Swiper from "swiper";
import {Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import IMask from "imask";

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
    });
  }, 500);

  document.querySelectorAll("input.phone").forEach((element) => {
    IMask(element, {
      mask: "+{7} (000) 000-00-00",
      placeholderChar: "_",
    });
  });
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      if (input.value.length > 0) {
        input.classList.add("filled");
      } else {
        input.classList.remove("filled");
      }
    });
  });
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
const swiper = new Swiper(".swiper", {
  modules: [Navigation],
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 3,
  spaceBetween: 30,

  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1.3,
      spaceBetween: 8,
    },
    768: {
      slidesPerView: 2,
    },
    1076: {
      slidesPerView: 3,
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".cases-tabs .tabs");
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const swiperSlides = document.querySelectorAll(".swiper-slide");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      swiperSlides.forEach((slide) => {
        slide.style.display = "none";
      });

      const filteredSlides = Array.from(swiperSlides).filter(
        (slide) => slide.getAttribute("data-filter") === filter
      );
      filteredSlides.forEach((slide) => {
        slide.style.display = "block";
      });

      swiper.update();
    });
  });

  const activeTab = document.querySelector(".cases-tabs .tabs.active");
  if (activeTab) {
    const filter = activeTab.getAttribute("data-filter");
    swiperSlides.forEach((slide) => {
      if (slide.getAttribute("data-filter") === filter) {
        slide.style.display = "block";
      } else {
        slide.style.display = "none";
      }
    });
    swiper.update();
  }
});


const selectFilter = () => {
  const selectContainer = document.querySelector(".cases-tabs-mobile");
  const header = selectContainer.querySelector(".header-tabs");
  const headerButton = header.querySelector("button");
  const headerIcon = header.querySelector(".icon");
  const bodySelect = selectContainer.querySelector(".body-tabs");
  const filterButtons = bodySelect.querySelectorAll("button");
  const slides = document.querySelectorAll(".swiper-slide");

  header.addEventListener("click", () => {
    bodySelect.classList.toggle("active");
    headerIcon.classList.toggle("active");
  });

  const setActiveFilter = (filter) => {
    const activeButton = Array.from(filterButtons).find(btn => btn.getAttribute("data-filter") === filter);

    if (activeButton) {
      headerButton.innerHTML = activeButton.innerHTML;

      filterButtons.forEach((button) => button.classList.remove("active"));
      activeButton.classList.add("active");
    }

    slides.forEach((slide) => {
      if (slide.getAttribute("data-filter") === filter || filter === "all") {
        slide.style.display = "block";
      } else {
        slide.style.display = "none";
      }
    });

    swiper.update();
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const selectedFilter = event.currentTarget.getAttribute("data-filter");
      setActiveFilter(selectedFilter);

      bodySelect.classList.remove("active");
      headerIcon.classList.remove("active");
    });
  });

  const defaultFilter = filterButtons.length > 0 ? filterButtons[0].getAttribute("data-filter") : "all";
  setActiveFilter(defaultFilter);
};

document.addEventListener("DOMContentLoaded", selectFilter);


const mobileMenu = () => {
  const btn = document.querySelector(".header-btn");
  const menu = document.querySelector(".mobile-menu-container");
  const html = document.querySelector("html");
  const rline = document.querySelector(".rigth-line-big");
  const lline = document.querySelector(".left-line-big");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("active");
    html.classList.toggle("hidden");
    rline.classList.toggle("hidden");
    lline.classList.toggle("hidden");
    btn.classList.toggle("active");
  });
};
mobileMenu();