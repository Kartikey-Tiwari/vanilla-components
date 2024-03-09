document.querySelectorAll(".dropdown-container").forEach((el) => {
  const menu = el.querySelector(".dropdown-menu");
  const toggle = el.querySelector(".dropdown-toggle");

  el.addEventListener("mouseenter", () => {
    const viewportWidth = window.visualViewport.width;
    const viewportHeight = window.visualViewport.height;

    menu.classList.add("visible");

    const {
      width: toggleWidth,
      x: toggleX,
      y: toggleY,
    } = el.getBoundingClientRect();

    let left;

    if (toggleY > viewportHeight / 2) {
      menu.style.maxHeight = `${toggleY}px`;
      menu.style.top = `${-menu.offsetHeight}px`;
      toggle.classList.add("upward");
    } else {
      menu.style.maxHeight = `${viewportHeight - toggleY - el.offsetHeight - 1}px`;
      menu.style.top = "";
      toggle.classList.remove("upward");
    }

    if (toggleWidth / 2 + toggleX + menu.offsetWidth / 2 > viewportWidth) {
      left =
        (menu.offsetWidth - el.offsetWidth) / 2 +
        toggleX +
        (toggleWidth + menu.offsetWidth) / 2 -
        viewportWidth;
    } else if (toggleX - (menu.offsetWidth - toggleWidth) / 2 < 0) {
      left = toggleX;
    } else {
      left = (menu.offsetWidth - toggleWidth) / 2;
    }
    menu.style.left = `${-left}px`;
  });
  el.addEventListener("mouseleave", () => {
    menu.classList.remove("visible");
    menu.style.left = "";
  });
});
