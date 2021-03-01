(function () {
  function toDraggable(element) {
    const mousemoveOption = {
      capture: false,
      passive: true,
    };
    const draggableAreaElement = element.closest(".js-draggable-area");
    let offsetX = -1;
    let offsetY = -1;

    element.addEventListener("mousedown", (ev) => {
      offsetX = ev.offsetX;
      offsetY = ev.offsetY;

      document.documentElement.addEventListener("mousemove", onMousemove, mousemoveOption);
      document.documentElement.addEventListener("mouseup", onMouseup);
    });

    const onMousemove = (ev) => {
      draggableAreaElement.style.position = "absolute";
      draggableAreaElement.style.left = ev.pageX - offsetX + "px";
      draggableAreaElement.style.top = ev.pageY - offsetY + "px";
    };

    const onMouseup = () => {
      document.documentElement.removeEventListener("mousemove", onMousemove, mousemoveOption);
      document.documentElement.removeEventListener("mouseup", onMouseup);
    };
  }
  const contentHeaders = document.querySelectorAll(".js-draggable-handle");
  contentHeaders.forEach((nd) => toDraggable(nd));
})();
