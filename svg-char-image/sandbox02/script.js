(function () {

  const imageTextElement = document.getElementById('image-text')
  const backgroundColorElement = document.getElementById('background-color')
  const charColorElement = document.getElementById('char-color')
  const addButtonElement = document.getElementById('add')
  const charImageContainerElement = document.getElementById('char-image-container')

  addButtonElement.addEventListener('click', () => {
    //絵文字を1文字にしたいので [...text] ってしてる
    const imageText = [...imageTextElement.value][0]
    if (imageText === undefined) {
      return;
    }

    const backgroundColor = backgroundColorElement.value
    const charColor = charColorElement.value

    const div = document.createElement('div')
    div.classList.add('charImage')
    div.innerHTML = 
`
<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="${backgroundColor}" />
  <text x="50" y="50" fill="${charColor}" font-size="60" text-anchor="middle" dominant-baseline="central"> 
    ${imageText}
  </text>
</svg>
`
    charImageContainerElement.append(div)
  })

})()