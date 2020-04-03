/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button
        className="square" 
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
    <Square
      value={this.props.board[i]}
      onClick={() => this.props.onClick(i)}
    />
    );
  }

  render() {
    const winner = calculateWinner(this.props.board);
    let status;
    if(isFilled(this.props.board)){
      status = 'Draw' ;
    } else if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        board: Array(9).fill(null),
        xIsNext: true,
      }],
    };
  }

  handleClick(i) {
    const history = this.state.history ;
    const cur = history[history.length - 1] ;
    const cur_board = cur.board.slice() ;
    if(cur_board[i] || calculateWinner(cur_board))
      return;
    cur_board[i] = cur.xIsNext ? 'X' : 'O' ;
    this.setState({
      history: history.concat([{
        board: cur_board,
        xIsNext: !cur.xIsNext,
      }]),
    })
  }

  jumpTo(index) {
    const history = this.state.history;
    this.setState({
      history: history.slice(0, index+1),
    })
  }

  render() {
    const history = this.state.history ;
    const cur = history[history.length - 1] ;

    const moves = history.map((element, index) => {
      const msg = index ? 'Move to Turn ' + index : 'Start New Game' ;
      return(<button class="turn" onClick={() => this.jumpTo(index)}>
        {msg}
      </button>)
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            board={cur.board}
            xIsNext={cur.xIsNext}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-turns">
          {moves}
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares) {
  const lines = [
    [0, 1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for(let i=0; i<lines.length; i++){
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] ;
    }
  }

  return null;
}

function isFilled(squares){
  for(let i=0; i<squares.length; i++){
    if(squares[i]) ;
    else return null ;
  }
  return 1;
}

/*

handleClick(i) {
  this.props.onClick(i) ;
  setState({
    board: this.props.board,
    xIsNext: this.props.xIsNext
  })
}

renderSquare(i) {
    return (
    <Square
      value={this.props.board[i]}
      onClick={() => this.handleClick(i)} 
    />
    );
  
*/