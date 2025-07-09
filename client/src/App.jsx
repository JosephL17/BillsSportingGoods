import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <h1>Bills Sporting Goods</h1>
        <p>Welcome to Bills Sporting Goods</p>
      </div>
    </>
  )
}

export default App
