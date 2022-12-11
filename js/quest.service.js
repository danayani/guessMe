'use strict'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  gQuestsTree = createQuest('Male?')
  gQuestsTree.yes = createQuest('Gandhi')
  gQuestsTree.no = createQuest('Rita')
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function restartTree(){
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  //update the gPrevQuest, gCurrQuest global vars
  // console.log('moveToNextQuest')
  gPrevQuest = gCurrQuest
  // console.log('gPrevQuest', gCurrQuest)
  gCurrQuest = gCurrQuest[res]
  // console.log('gCurrQuest', gCurrQuest)
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  //Create and Connect the 2 Quests to the quetsions tree
  const saveNode = gCurrQuest
  const newQuestNode = createQuest(newQuestTxt)
  const newGuessNode = createQuest(newGuessTxt)

  newQuestNode.yes = newGuessNode
  newQuestNode.no = saveNode
  gPrevQuest[lastRes] = newQuestNode

  console.log('gQuestsTree', gQuestsTree)
  
}

function getCurrQuest() {
  return gCurrQuest
}
