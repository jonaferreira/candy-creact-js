import React, { useState } from 'react'

import './App.css'
import GameContainer from './components/GameContainer'

function App(): React.ReactElement {
  const [scoreDisplay, setScoreDisplay] = useState(0)
  return (
    <div className='App'>
      <GameContainer setScoreDisplay={setScoreDisplay} />
      <h1>{scoreDisplay}</h1>
    </div>
  )
}

export default App
