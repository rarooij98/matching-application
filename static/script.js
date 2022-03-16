// web share api
let shareData = {
  title: 'StudyBuddy',
  text: 'Studeer samen met StudyBuddy!',
  url: 'https://github.com/rarooij98/matching-application',
}

const btn = document.querySelector('.share')
const resultPara = document.querySelector('.result')

btn.addEventListener('click', () => {
  navigator
    .share(shareData)
    .then(() => (resultPara.textContent = 'Succesvol gedeeld!'))
    .catch((e) => (resultPara.textContent = 'Error: ' + e))
})
