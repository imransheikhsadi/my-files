import React from 'react';
import './App.css';
import Container from './components/container/container-component';
import io from 'socket.io-client';



const socket = io.connect('https://10c3593a.ngrok.io');

function App() {
  return (
    <div className="App">
      <Container/>
    </div>
  );
}

export default App;
export {socket};
