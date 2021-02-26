// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import * as Utils from '../utils'

function Board({squares, selectSquare}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function History({steps, currentStep, setCurrentStep}) {
  const moves = steps.map(step => {
    const desc = step ? `Go to move #${step}` : 'Go to game start'
    const isCurrentStep = step === currentStep
    return (
      <li key={step}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(step)}>
          {desc} {isCurrentStep ? '(current)' : null}
        </button>
      </li>
    )
  })
  return (
    <React.Fragment>
      <ol>{moves}</ol>
    </React.Fragment>
  )
}

function Game() {
  const [history, setHistory] = Utils.useLocalStorageState('history:key', [Array(9).fill(null)])
  const [currentStep, setCurrentStep] = Utils.useLocalStorageState('history:step', 0)

  const currentSquares = history[currentStep]
  const winner = calculateWinner(currentSquares)
  const nextValue = calculateNextValue(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {

    if (winner || currentSquares[square]) {
      return;
    }

    const newSquares = [...currentSquares]
    newSquares[square] = nextValue
    const newHistory = history.slice(0, currentStep + 1)

    setHistory([...newHistory, newSquares])
    setCurrentStep(newHistory.length)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  return (
    <div className="game">
      <div className="game-board">
        <button className="restart" onClick={restart}>
          restart
        </button>
        <Board squares={currentSquares} selectSquare={selectSquare}/>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <History steps={history.map((h, i) => i)} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
