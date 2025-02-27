import AOS from "aos";
import "aos/dist/aos.css";
import anime from "animejs/lib/anime.es.js";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
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
    },
  },
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
    const activeButton = Array.from(filterButtons).find(
      (btn) => btn.getAttribute("data-filter") === filter
    );

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

  const defaultFilter =
    filterButtons.length > 0
      ? filterButtons[0].getAttribute("data-filter")
      : "all";
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

const orderModal = () => {
  const btn = document.querySelectorAll(".open-order-btn");
  const modal = document.querySelector(".popup-form");
  const overlay = document.querySelector(".overlay ");
  const closeBtn = document.querySelector(".popup-form-close-btn");
  const centeredContainer = document.querySelector(".center-container ");
  const html = document.querySelector("html");
  btn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });
  closeBtn.addEventListener("click", () => {
    closeModal();
  });
  overlay.addEventListener("click", () => {
    closeModal();
  });
  function openModal() {
    modal.style.display = "flex";
    overlay.style.display = "block";
    centeredContainer.style.pointerEvents = "auto";
    html.style.overflow = "hidden";
    anime({
      targets: overlay,
      opacity: [0, 1],
      duration: 300,
      easing: "easeInOutQuad",
    });

    anime({
      targets: modal,
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 400,
      easing: "easeOutQuad",
    });
  }
  function closeModal() {
    anime({
      targets: overlay,
      opacity: [1, 0],
      duration: 300,
      easing: "easeInOutQuad",
    });
    anime({
      targets: modal,
      scale: [1, 0.8],
      opacity: [1, 0],
      duration: 400,
      easing: "easeInQuad",
      complete: () => {
        modal.style.display = "none";
        overlay.style.display = "none";
        centeredContainer.style.pointerEvents = "none";
        html.style.overflow = "auto";
      },
    });
  }
};
orderModal();
const orderProjectModal = () => {
  const btn = document.querySelectorAll(".open-project-btn");
  const modal = document.querySelector(".order-project");
  const overlay = document.querySelector(".overlay ");
  const closeBtn = document.querySelector(".popup-form-close-btn");
  const centeredContainer = document.querySelector(".center-container ");
  const html = document.querySelector("html");
  btn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });
  closeBtn.addEventListener("click", () => {
    closeModal();
  });
  overlay.addEventListener("click", () => {
    closeModal();
  });
  function openModal() {
    modal.style.display = "flex";
    overlay.style.display = "block";
    centeredContainer.style.pointerEvents = "auto";
    html.style.overflow = "hidden";
    anime({
      targets: overlay,
      opacity: [0, 1],
      duration: 300,
      easing: "easeInOutQuad",
    });

    anime({
      targets: modal,
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 400,
      easing: "easeOutQuad",
    });
  }
  function closeModal() {
    anime({
      targets: overlay,
      opacity: [1, 0],
      duration: 300,
      easing: "easeInOutQuad",
    });
    anime({
      targets: modal,
      scale: [1, 0.8],
      opacity: [1, 0],
      duration: 400,
      easing: "easeInQuad",
      complete: () => {
        modal.style.display = "none";
        overlay.style.display = "none";
        centeredContainer.style.pointerEvents = "none";
        html.style.overflow = "auto";
      },
    });
  }
};
orderProjectModal();

window.addEventListener("load", () => {
  const percentLoad = document.querySelector(".percent-load");
  let count = 0;
  const html = document.querySelector("html");
  html.style.overflow = "hidden";

  const interval = setInterval(() => {
    count++;
    percentLoad.textContent = count + "%";

    if (count === 100) {
      clearInterval(interval);
      document.querySelector(".preloader").style.opacity = "0";
      document.querySelector(".preloader").style.pointerEvents = "none";
      document.querySelector(".preloader").style.scale = "1.5";
      html.style.overflow = "auto";
    }
  }, 20);
});
