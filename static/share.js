// web share api
const studie = document.getElementById('studie').innerText
console.log(studie)

let shareData = {
  title: 'StudyBuddy',
  text: 'Ik gebruik StudyBuddy om ' + studie + ' te leren! Doe je ook mee? :D',
  url: 'matching-app-rooijra.herokuapp.com/',
}

const btn = document.querySelector('.share')
const resultPara = document.querySelector('.result')

btn.addEventListener('click', () => {
  navigator
    .share(shareData)
    .then(() => (resultPara.textContent = 'Succesvol gedeeld!'))
    .catch((e) => (resultPara.textContent = 'Error: ' + e))
})
