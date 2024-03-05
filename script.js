document.querySelectorAll(".dropdown-container").forEach((el) => {
  const menu = el.querySelector(".dropdown-menu");
  el.addEventListener("mouseenter", () => {
    menu.classList.add("visible");
    const viewportWidth = window.visualViewport.width;
    const menuWidth = menu.offsetWidth;
    const { width: toggleWidth, x: toggleX } = el.getBoundingClientRect();
    let left;

    if (toggleWidth / 2 + toggleX + menuWidth / 2 > viewportWidth) {
      left =
        (menuWidth - el.offsetWidth) / 2 +
        toggleX +
        (toggleWidth + menuWidth) / 2 -
        viewportWidth;
    } else if (toggleX - (menuWidth - toggleWidth) / 2 < 0) {
      left = toggleX;
    } else {
      left = (menuWidth - toggleWidth) / 2;
    }
    menu.style.left = `${-left}px`;
  });
  el.addEventListener("mouseleave", () => {
    menu.classList.remove("visible");
  });
});
