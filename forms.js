//  form input validation
const form = document.getElementById('form')
const studies = document.getElementsByName('studie')
const methodes = document.getElementsByName('methode')

form.addEventListener('submit', (event) => {
  let formValid = false
  let i = 0

  while (!formValid && i < studies.length) {
    if (studies[i].checked) {
      formValid = studies[i].value
    }
    i++
  }

  while (!formValid && i < methodes.length) {
    if (methodes[i].checked) {
      formValid = methodes[i].value
    }
    i++
  }

  if (!formValid) {
    event.preventDefault()
    form.classList.add('empty')
    alert('Je moet een keuze maken om door te gaan!')
  }

  return true
})
