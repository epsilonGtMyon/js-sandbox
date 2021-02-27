(function () {
  function toDraggable(element) {
    const draggableAreaElement = element.closest(".js-draggable-area");
    let holding = false;
    let offsetX = -1;
    let offsetY = -1;

    element.addEventListener("mousedown", (ev) => {
      holding = true;
      offsetX = ev.offsetX;
      offsetY = ev.offsetY;
    });

    document.documentElement.addEventListener("mousemove", (ev) => {
      if (!holding) {
        return;
      }

      draggableAreaElement.style.position = "absolute";
      draggableAreaElement.style.left = ev.pageX - offsetX + "px";
      draggableAreaElement.style.top = ev.pageY - offsetY + "px";
    });
    document.addEventListener("mouseup", (ev) => {
      holding = false;
    });
  }
  const contentHeaders = document.querySelectorAll(".js-draggable-handle");
  contentHeaders.forEach((nd) => toDraggable(nd));
})();
