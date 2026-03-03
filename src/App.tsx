import { useEffect, useMemo, useState } from 'react'

type Player = 'X' | 'O'
type Cell = Player | null

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const

function checkWinner(board: Cell[]) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }

  return null
}

function getAvailableMoves(board: Cell[]) {
  return board
    .map((value, index) => ({ value, index }))
    .filter(({ value }) => value === null)
    .map(({ index }) => index)
}

function minimax(board: Cell[], isMaximizing: boolean): number {
  const winner = checkWinner(board)

  if (winner === 'O') {
    return 10
  }

  if (winner === 'X') {
    return -10
  }

  if (board.every(Boolean)) {
    return 0
  }

  if (isMaximizing) {
    let bestScore = -Infinity

    for (const move of getAvailableMoves(board)) {
      board[move] = 'O'
      const score = minimax(board, false)
      board[move] = null
      bestScore = Math.max(bestScore, score)
    }

    return bestScore
  }

  let bestScore = Infinity

  for (const move of getAvailableMoves(board)) {
    board[move] = 'X'
    const score = minimax(board, true)
    board[move] = null
    bestScore = Math.min(bestScore, score)
  }

  return bestScore
}

function getBestComputerMove(board: Cell[]) {
  let bestScore = -Infinity
  let bestMove: number | null = null

  for (const move of getAvailableMoves(board)) {
    board[move] = 'O'
    const score = minimax(board, false)
    board[move] = null

    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }

  return bestMove
}

function App() {
  const [playerName, setPlayerName] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [isXTurn, setIsXTurn] = useState(true)

  const winner = useMemo(() => checkWinner(board), [board])
  const isDraw = useMemo(() => !winner && board.every(Boolean), [board, winner])
  const isComputerTurn = !isXTurn && !winner && !isDraw

  const displayName = playerName || 'Player 1'
  const statusText = winner === 'X'
    ? `🎉 ${displayName} wins!`
    : winner === 'O'
      ? '🤖 Computer wins!'
      : isDraw
        ? "It's a draw!"
        : isComputerTurn
          ? 'Computer is thinking...'
          : `Your turn, ${displayName}!`

  useEffect(() => {
    if (!isComputerTurn) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setBoard((prevBoard) => {
        const nextBoard = [...prevBoard]
        const move = getBestComputerMove(nextBoard)

        if (move !== null) {
          nextBoard[move] = 'O'
        }

        return nextBoard
      })
      setIsXTurn(true)
    }, 350)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isComputerTurn])

  const handleTileClick = (index: number) => {
    if (board[index] || winner || isDraw || !isXTurn) {
      return
    }

    setBoard((prevBoard) => {
      const nextBoard = [...prevBoard]
      nextBoard[index] = 'X'
      return nextBoard
    })
    setIsXTurn(false)
  }

  const handleReset = () => {
    setBoard(Array(9).fill(null))
    setIsXTurn(true)
  }

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = nameInput.trim()
    if (!trimmed) return
    setPlayerName(trimmed)
    setGameStarted(true)
  }

  if (!gameStarted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
        <section className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
          <h1 className="text-center text-3xl font-bold text-white">Tic-Tac-Toe</h1>
          <p className="mt-2 text-center text-sm text-slate-300">
            Modern React + Tailwind game board
          </p>
          <form onSubmit={handleStartGame} className="mt-8 flex flex-col gap-4">
            <label className="text-center text-lg font-semibold text-white" htmlFor="player-name">
              What's your name, Player 1?
            </label>
            <input
              id="player-name"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your name"
              maxLength={20}
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-center text-white placeholder-slate-500 outline-none focus:border-cyan-500"
              autoFocus
            />
            <button
              type="submit"
              disabled={!nameInput.trim()}
              className="rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Start Game
            </button>
          </form>
        </section>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
        <h1 className="text-center text-3xl font-bold text-white">Tic-Tac-Toe</h1>
        <p className="mt-2 text-center text-sm text-slate-300">
          Modern React + Tailwind game board
        </p>

        <div className="mt-6 rounded-2xl bg-slate-800/70 p-4 text-center text-lg font-semibold text-white">
          {statusText}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {board.map((value, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleTileClick(index)}
              className="aspect-square rounded-2xl border border-slate-700 bg-slate-900 text-4xl font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={Boolean(value) || Boolean(winner) || isDraw || isComputerTurn}
              aria-label={`Tile ${index + 1}`}
            >
              <span className={value === 'X' ? 'text-cyan-400' : 'text-rose-400'}>{value}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-6 w-full rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Restart Game
        </button>
      </section>
    </main>
  )
}

export default App
