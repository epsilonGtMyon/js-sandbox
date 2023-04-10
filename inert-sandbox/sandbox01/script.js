(function(){

  const changeInertElem = document.getElementById("changeInert")
  const inertStateElem = document.getElementById("inertState")
  const inertAreaElem = document.getElementById("inertArea")

  changeInertElem.addEventListener("click", () => {
    const nextInert = !inertAreaElem.inert
    
    inertStateElem.textContent = nextInert
    inertAreaElem.inert = nextInert
  })

  document.querySelectorAll(".hello").forEach(elem => {
    elem.addEventListener("click", () => {
      alert("hello")
    })
  })
})()