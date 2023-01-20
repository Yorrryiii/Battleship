import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from './components/Board';

function App() {
  return (
    <Router>
      <div>
          <Board />
      </div>
    </Router>
  );
}

export default App;
