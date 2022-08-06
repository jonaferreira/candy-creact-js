import React, { useState } from 'react'

import './App.css'
import GameContainer from './components/GameContainer'

function App(): React.ReactElement {
  const [scoreDisplay, setScoreDisplay] = useState(0)
  return (
    <div className='App'>
      <h1>Scoring: {scoreDisplay}</h1>
      <GameContainer setScoreDisplay={setScoreDisplay} />
    </div>
  )
}

export default App
