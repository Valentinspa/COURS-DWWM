document.addEventListener("DOMContentLoaded", animation);
function animation() {
  const animation1 = document.querySelector(".animate1");
  const animation2 = document.querySelector(".animate2");
  const animateTexts = function (container) {
    container
      .querySelector(".div1")
      .animate(
        [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
        { duration: 4000, easing: "linear", fill: "forwards" }
      ).onfinish = function () {
      if (container === animation1) {
        animation1.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 1000,
          fill: "forwards",
        }).onfinish = function () {
          animation1.style.display = "none";
          animation2.style.display = "flex";
          animation2.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 1000,
            fill: "forwards",
          });
          animateTexts(animation2);
        };
      } else {
        animation2.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 1000,
          fill: "forwards",
        }).onfinish = function () {
          animation2.style.display = "none";
          animation1.style.display = "flex";
          animation1.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 1000,
            fill: "forwards",
          });
          animateTexts(animation1);
        };
      }
    };
    container
      .querySelector(".div2")
      .animate(
        [{ transform: "translateX(-100%)" }, { transform: "translateX(0)" }],
        { duration: 4000, easing: "linear", fill: "forwards" }
      );
  };
  animateTexts(animation1);
}
