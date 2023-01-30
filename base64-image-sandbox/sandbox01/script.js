(function () {
  const loadImageElem = document.getElementById("loadImage");
  const image01 = document.getElementById("image01");

  loadImageElem.addEventListener("click", async () => {


    const response = await fetch("../image/image01.json")
    const imageResponse = await response.json()
    
    const imageDataUrl = `data:image/png;base64,${imageResponse.value}`
    image01.setAttribute("src", imageDataUrl)
  });
})();
