import AOS from "aos";
import "aos/dist/aos.css";
import anime from "animejs/lib/anime.es.js";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
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

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".cases-tabs .tabs");
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const swiperSlides = document.querySelectorAll(".swiper-slide");
  const swiper = new Swiper(".swiper", {
    modules: [Navigation],
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Убираем активный класс у всех табов
      tabs.forEach((t) => t.classList.remove("active"));
      // Добавляем активный класс к выбранному табу
      this.classList.add("active");

      // Получаем значение фильтра
      const filter = this.getAttribute("data-filter");

      // Скрываем все слайды
      swiperSlides.forEach((slide) => {
        slide.style.display = "none";
      });

      // Показываем только те слайды, которые соответствуют фильтру
      const filteredSlides = Array.from(swiperSlides).filter(
        (slide) => slide.getAttribute("data-filter") === filter
      );
      filteredSlides.forEach((slide) => {
        slide.style.display = "block";
      });

      // Обновляем Swiper
      swiper.update();
    });
  });

  // Инициализация: показываем слайды для активного таба по умолчанию
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
