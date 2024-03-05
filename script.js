document.querySelectorAll(".dropdown-container").forEach((el) => {
  const menu = el.querySelector(".dropdown-menu");
  const toggle = el.querySelector(".dropdown-toggle");

  el.addEventListener("mouseenter", () => {
    menu.classList.add("visible");

    const viewportWidth = window.visualViewport.width;
    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;

    const {
      width: toggleWidth,
      x: toggleX,
      y: toggleY,
    } = el.getBoundingClientRect();

    let left;

    if (toggleY > menuHeight) {
      menu.style.top = `${-menuHeight}px`;
      menu.style.maxHeight = `${toggleY}px`;
      toggle.classList.add("upward");
    } else {
      menu.style.maxHeight = "";
      toggle.classList.remove("upward");
    }

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
