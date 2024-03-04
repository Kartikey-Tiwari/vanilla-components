document.querySelectorAll(".dropdown-container").forEach((el) => {
  const menu = el.querySelector(".dropdown-menu");
  el.addEventListener("mouseenter", () => {
    menu.classList.add("visible");
    const width = menu.scrollWidth;
    const left = -(width / 2 - el.offsetWidth / 2);
    menu.style.left = `${left}px`;
  });
  el.addEventListener("mouseleave", () => {
    menu.classList.remove("visible");
  });
});
