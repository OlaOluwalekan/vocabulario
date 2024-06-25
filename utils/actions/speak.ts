export const handleSpeak = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'es-Es'
    console.log('UT: ', utterance)

    window.speechSynthesis.speak(utterance)
  } else {
    alert('Tu navegador no soporta la API SpeechSynthesis')
  }
  //   console.log(text)
}
