import React from 'react';
import './App.css';
import Container from './components/container/container-component';
import io from 'socket.io-client';



const socket = io.connect('192.168.0.111:3001');

function App() {
  return (
    <div className="App">
      <Container/>
    </div>
  );
}

export default App;
export {socket};
