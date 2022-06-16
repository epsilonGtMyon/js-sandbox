(function () {
  const mouseDownElem = document.getElementById("mouseDown");
  const mouseMoveElem = document.getElementById("mouseMove");
  const mouseUpElem = document.getElementById("mouseUp");

  const touchStartElem = document.getElementById("touchStart");
  const touchMoveElem = document.getElementById("touchDown");
  const touchEndElem = document.getElementById("touchEnd");

  const pointerDownElem = document.getElementById("pointerDown");
  const pointerMoveElem = document.getElementById("pointerMove");
  const pointerUpElem = document.getElementById("pointerUp");

  window.addEventListener("mousedown", (ev) => {
    const { pageX, pageY } = ev;
    mouseDownElem.textContent = `${pageX}, ${pageY}`;
  });
  window.addEventListener("mousemove", (ev) => {
    const { pageX, pageY } = ev;
    mouseMoveElem.textContent = `${pageX}, ${pageY}`;
  });
  window.addEventListener("mouseup", (ev) => {
    const { pageX, pageY } = ev;
    mouseUpElem.textContent = `${pageX}, ${pageY}`;
  });
  
  window.addEventListener("touchstart", (ev) => {
    const { pageX, pageY } = ev.changedTouches[0];
    touchStartElem.textContent = `${pageX}, ${pageY}`;
  });
  window.addEventListener("touchmove", (ev) => {
    const { pageX, pageY } = ev.changedTouches[0];
    touchMoveElem.textContent = `${pageX}, ${pageY}`;
  });
  window.addEventListener("touchend", (ev) => {
    const { pageX, pageY } = ev.changedTouches[0];
    touchEndElem.textContent = `${pageX}, ${pageY}`;
  });

  window.addEventListener("pointerdown", (ev) => {
    const { pageX, pageY } = ev;
    pointerDownElem.textContent = `${pageX}, ${pageY}`;
  });
  window.addEventListener("pointermove", (ev) => {
    const { pageX, pageY } = ev;
    pointerMoveElem.textContent = `${pageX}, ${pageY}`;
  });
  window.addEventListener("pointerup", (ev) => {
    const { pageX, pageY } = ev;
    pointerUpElem.textContent = `${pageX}, ${pageY}`;
  });

})();
