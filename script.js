document.querySelectorAll(".dropdown-container").forEach((el) => {
  const menu = el.querySelector(".dropdown-menu");
  el.addEventListener("mouseenter", () => {
    menu.classList.add("visible");
  });
  el.addEventListener("mouseleave", () => {
    menu.classList.remove("visible");
  });
});
