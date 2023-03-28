(function(){
  const input1Elem = document.getElementById("input1")
  const x1Elem = document.getElementById("x")

  input1Elem.addEventListener("input", ev => {

    console.log(ev)
    const logText = `data = ${ev.data}
inputTytpe = ${ev.inputType}
isComposing = ${ev.isComposing}

target.value = ${ev.target.value}`

    x1Elem.textContent = logText
  })

  input1Elem.addEventListener("compositionend", ev => {
    console.log(ev)
  })

   

})()