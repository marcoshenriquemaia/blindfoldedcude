const $startButton = document.querySelector('.start-button')
const $delay = document.querySelector('#delay') 
const $all = document.querySelector('#all')

let start = false

const getSelectedLetters = () => {
  const $selectedLetters = document.querySelectorAll('.letter-list li input')
  const selectedLetters = Array.from($selectedLetters).map($letter => {
    if ($letter.checked) {
      return $letter.name
    }

    return false
  })

  return selectedLetters.filter(Boolean)
}

const handleStart = () => {
  start = !start

  $startButton.textContent = start ? 'Stop' : 'Start'
}

const handleCheckAll = () => {
  if ($all.checked) {
    Array.from(document.querySelectorAll('.letter-list li input')).forEach($letter => {
      $letter.checked = true
    })
  } else {
    Array.from(document.querySelectorAll('.letter-list li input')).forEach($letter => {
      $letter.checked = false
    })
  }
}

const playAudio = (fileName) => {
  const audio = new Audio(fileName);
  audio.play();
}

const loop = () => {
  if (!start) return setTimeout(loop, 100)
  const selectedLetters = getSelectedLetters()
  const randomIndex = Math.floor(Math.random() * selectedLetters.length)
  const randomLetter = selectedLetters[randomIndex]
  const audioFileName = `./audios/${randomLetter}.mp3`
  const delay = $delay.value ? Number($delay.value) : 3000

  playAudio(audioFileName)

  setTimeout(loop, delay)
}

$startButton.addEventListener('click', handleStart) 
$all.addEventListener('click', handleCheckAll)

loop()