'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
// $('.btn-start').click(onStartGuessing)
// $('.btn-yes').click({ ans: 'yes' }, onUserResponse)
// $('.btn-no').click({ ans: 'no' }, onUserResponse)
// $('.btn-add-guess').click(onAddGuess)

function init() {
  console.log('Started...')
  createQuestsTree()


  $('.btn-start').click(onStartGuessing)
  $('.btn-yes').click({ ans: 'yes' }, onUserResponse)
  $('.btn-no').click({ ans: 'no' }, onUserResponse)
  $('.btn-add-guess').click(onAddGuess)
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide()

  renderQuest()

  //show the quest section
  $('.quest').show()
}

function renderQuest() {
  
  const currQuest = getCurrQuest()

  //select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(currQuest.txt)
}

function onUserResponse(ev) {
  // console.log('ev', ev)
  var res = ev.data.ans
  
  // If this node has no children
  // console.log(isChildless(getCurrQuest()))
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!')
      onRestartGame()
      // TODO: improve UX
    } else {
      alert('I dont know...teach me!')
      //hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
      $('#newQuest').val('')
      $('#newGuess').val('')
    }
  } else {
    // console.log('there is child')
    //update the lastRes global var
    gLastRes = res
    // console.log('res', res)
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  //Get the inputs' values
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()

  
  //Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)
 
  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.quest').hide()
  $('.game-start').show()
  gLastRes = null
  restartTree()
}
