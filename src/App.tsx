import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)

  const [mm, setMm] = useState(sessionLength)
  const [ss, setSs] = useState(0)

  enum Mode {
    break= "Break", 
    session= "Session"
  }
  const [mode, setMode] = useState<Mode>(Mode.session)

  const [isRunning, setIsRunning] = useState(false);

  // console.log(sessionLength)
  const increaseDecrease = (event: React.MouseEvent<HTMLButtonElement>) =>{
    const id = (event.target as HTMLButtonElement).id;
    

    if(id === "break-increment" && breakLength < 60){ 
      setBreakLength(breakLength + 1);
      
    }
    else if(id === "break-decrement" && breakLength > 1){
      setBreakLength(breakLength - 1);  
    }
    else if(id === "session-increment" && sessionLength < 60){ 
      setSessionLength(sessionLength + 1);
      let curVal:number = sessionLength + 1 
      setMm(curVal)
    }
    else if(id ==="session-decrement" && sessionLength > 1){
      setSessionLength(sessionLength - 1);
      let curVal:number = sessionLength - 1; 
      setMm(curVal)
    }
  }

  const startOrStop = () => {
    setIsRunning(!isRunning)
    if (!isRunning) {
      setMm(sessionLength); // Set mm to the current session length when starting the timer
    }
  }

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  

  useEffect(() => {
    if(isRunning){
      const timer = setTimeout(() => {
        setSs(ss-1)
        console.log(mode)

        if(ss == 0){
          setSs(59)
          setMm(mm - 1)
          if(mm == 0 && mode == Mode.session){
            setMode(Mode.break)
            setMm(breakLength)
            console.log(mode)
            setSs(0)
            playBeep(); 
          }
          else if(mm == 0 && mode == Mode.break){
            setMode(Mode.session) 
            console.log(mode)

            setMm(sessionLength)
            setSs(0)
            playBeep()
          }           
        }  
      },1000);
      return () => {clearTimeout(timer)}
    }
  });
  
  const playBeep = () => {
    const beepSound = document.getElementById("beep") as HTMLAudioElement;
    beepSound.play()
  }
  const stopBeep = () => {
    const beepSound = document.getElementById("beep") as HTMLAudioElement;
    beepSound.pause();
    beepSound.currentTime = 0;
  }
  
  const reset = () =>{
    setIsRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setMm(sessionLength)
    setSs(0)
    setMode(Mode.session)
    stopBeep()
  }
  
  

  //======DISABLE INCREASE AND DECREASE SESSION OR BREAK LENGTH
  return (
    <>
      <div id="container" className='text-center'>
        <h1>25 + 5 Clock</h1>
        <div>
          <div>
            <label id='break-label'>Break Length</label>
            <br />
            <button className="btn btn-secondary" id="break-decrement" onClick={(event) => increaseDecrease(event)}><i className="fa-solid fa-caret-down"></i></button>
            <label className='numDis' id='break-length'>{breakLength}</label>
            <button className='btn btn-primary' id="break-increment" onClick={(event) => increaseDecrease(event)}><i className="fa-solid fa-caret-up"></i></button>
          </div>
          <div>
            <label id='session-label'>Session Length</label>
            <br />
            <button className="btn btn-secondary" id="session-decrement" onClick={(event) => increaseDecrease(event)}><i className="fa-solid fa-caret-down"></i></button>
            <label className='numDis' id='session-length'>{sessionLength}</label>
            <button className='btn btn-primary' id="session-increment" onClick={(event) => increaseDecrease(event)}><i className="fa-solid fa-caret-up"></i></button>
          </div>
        </div>
        <div className='card countDown'>
          <div>
            <h3 id="timer-label">{mode}</h3>
            <label id="time-left">{`${formatTime(mm)}:${formatTime(ss)}`}</label>
          </div>
          <div id="buttons">
            <button className='btn btn-primary' id='start_stop' onClick={() => startOrStop()}><i className="fa-solid fa-play"></i><i className="fa-solid fa-pause"></i></button>
            <button className="btn btn-secondary" id='reset' onClick={reset}><i className="fa-solid fa-arrow-rotate-left"></i></button>
          </div>
        </div>
        <audio id="beep" src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav'></audio>
      </div>
    </>
  )
}

export default App
