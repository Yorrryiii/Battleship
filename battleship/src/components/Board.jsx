import React, { useState } from 'react';
import "./styles/Board.css";

function Battleship() {
  // Declare the state variables
  const [boardSize, setBoardSize] = useState(5);
  const [board, setBoard] = useState([]);
  const [ships, setShips] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Function to start the game
  const startGame = () => {
    // Generate the board with the desired size
    const newBoard = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    setBoard(newBoard);

    // Generate the ships and place them on the board
    const newShips = [];
    newShips.push(generateShip(3)); // 2x 3x1 ships
    newShips.push(generateShip(3));
    newShips.push(generateShip(4)); // 1x 4x1 ship
    newShips.push(generateShip(5)); // 1x 5x1 ship
    setShips(newShips);

    // Reset gameOver and gameWon states
    setGameOver(false);
    setGameWon(false);

    // Reset attempts
    setAttempts(0);
  }

  // Function to generate a ship with the given size
  const generateShip = (size) => {
    // Generate a random direction for the ship (horizontal or vertical)
    const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';

    // Generate a random starting position for the ship
    let x, y;
    if (direction === 'horizontal') {
      x = Math.floor(Math.random() * (boardSize - size + 1));
      y = Math.floor(Math.random() * boardSize);
    } else {
      x = Math.floor(Math.random() * boardSize);
      y = Math.floor(Math.random() * (boardSize - size + 1));
    }

    // Return the ship as an array of cells
    const ship = [];
    for (let i = 0; i < size; i++) {
      if (direction === 'horizontal') {
        ship.push({ x: x + i, y });
      } else {
        ship.push({ x, y: y + i });
      }
    }
    return ship;
  }

  // Function to handle cell clicks
  const handleCellClick = (x, y) => {
    // Do nothing if the game is over or the cell has already been clicked
    if (gameOver || board[x][y] !== null) return;

    // Check if the cell contains a ship
    let cellContainsShip = false;
    ships.forEach((ship) => {
      ship.forEach((cell) => {
        if (cell.x === x && cell.y === y) {
          cellContainsShip = true;
        }
      });
    });

    // Update the board with the result of the guess
    const newBoard = [...board];
    if (cellContainsShip) {
      newBoard[x][y] = 'hit';
    } else {
      newBoard[x][y] = 'miss';
      setAttempts(attempts + 1);
    }
    setBoard(newBoard);

    // Check if the player has won or lost
    let allShipsSunk = true;
    ships.forEach((ship) => {
      let shipSunk = true;
      ship.forEach((cell) => {
        if (board[cell.x][cell.y] !== 'hit') {
          shipSunk = false;
        }
      });
      if (!shipSunk) allShipsSunk = false;
    });
    if (allShipsSunk) {
      setGameOver(true);
      setGameWon(true);
    } else if (attempts >= boardSize / 2) {
      setGameOver(true);
      setGameWon(false);
    }
  }

  // Render the board
  const renderBoard = () => {
    return (
      <div className="board-container">
        <div className="board">
          <table>
            <tbody>
              {board.map((row, x) => {
                return (
                  <tr key={x}>
                    {row.map((cell, y) => {
                      let color;
                      if (cell === 'hit') color = 'green';
                      else if (cell === 'miss') color = 'blue';
                      return (
                        <td
                          key={y}
                          onClick={() => handleCellClick(x, y)}
                          style={{
                            backgroundColor: color,
                            cursor: gameOver || cell !== null ? 'default' : 'pointer'
                          }}
                        ></td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Render the game status message
  const renderGameStatus = () => {
    if (gameOver) {
      if (gameWon) {
        return <p>You won!</p>;
      } else {
        return <p>You lost.</p>;
      }
    }
  }

  return (
    <div>
      <h1 id='title'>Battleship</h1>
      <p>
        Board size:
        <input
          type="number"
          value={boardSize}
          onChange={(e) => setBoardSize(Number(e.target.value))}
          min={5}
        />
        <button class="btn" onClick={startGame}>Start game</button>
      </p>
      {renderBoard()}
      {renderGameStatus()}
    </div>
  );
}

export default Battleship;
