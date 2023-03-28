(function(){
  const input1Elem = document.getElementById("input1")
  const x1Elem = document.getElementById("x")

  input1Elem.addEventListener("keydown", ev => {

    console.log(ev)
    const logText = `altKey = ${ev.altKey}
ctrlKey = ${ev.ctrlKey}
shiftKey = ${ev.shiftKey}
metaKey = ${ev.metaKey}
code = ${ev.code}
key = ${ev.key}
repeat = ${ev.repeat}
isComposing = ${ev.isComposing}
    `
    x1Elem.textContent = logText
  })

})()