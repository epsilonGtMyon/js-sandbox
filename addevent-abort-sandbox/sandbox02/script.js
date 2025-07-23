const box1Elem = document.getElementById("box1");
const box2Elem = document.getElementById("box2");

const abort = new AbortController();
box1Elem.addEventListener(
  "mouseenter",
  (event) => {
    event.target.textContent = `mouseenter: ${new Date().toLocaleString()}`;
    abort.abort()
  },
  {
    signal: abort.signal,
  }
);

box2Elem.addEventListener("mouseenter", (event) => {
  event.target.textContent = `mouseenter: ${new Date().toLocaleString()}`;
});
