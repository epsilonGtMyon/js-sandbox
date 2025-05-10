const button1Elem = document.getElementById("button1");

button1Elem.addEventListener("click", () => {
  const targetWindow = window.opener;
  if (targetWindow.closed) {
    console.log("Parent window is closed");
    return;
  }

  const data = {
    type: "window",
    message: "hello",
  };
  targetWindow.postMessage(data, location.origin);
});

window.addEventListener("message", (event) => {
  if (event.origin !== location.origin) {
    console.log("Message from unknown origin:", event.origin);
    return;
  }
  console.log(event);
});

export {};
