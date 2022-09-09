(function(){
  const userInput = document.getElementById('userInput')
  const innerHTML = document.getElementById('innerHTML')
  const setHTML = document.getElementById('setHTML')
  const result = document.getElementById('result')


  const sanitizer = new Sanitizer()

  userInput.value = `abc<script>alert(1)</script>def`


  innerHTML.addEventListener('click', () => {
    const value = userInput.value
    result.innerHTML = value
  })
  
  setHTML.addEventListener('click', () => {
    const value = userInput.value
    result.setHTML(value, sanitizer)

    
  })

})()