import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
       <div className="connection">
          <input className="name" type="text" placeholder="Name">
          <button className="connect">LogIn</button>
        </div>
      <div className="section-audio">
          Local audio: <audio id = "localAudio" controls autoplay></audio> 
          Remote audio: <audio id = "remoteAudio" controls autoplay></audio> 
      </div>
      {/* <div className="section-calling">
          <input type="text" className="remote_reciver" placeholder="Name You Want To Call ">
          <button className="callBtn">Call</button>
      </div> */}
    </div>
  );
}

export default App;
