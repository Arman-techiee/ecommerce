import React from 'react'
import {useState} from "react"

function PracticeState() {
    const [count, setCount] = useState(0);
    const [name] = useState("Arman")

    function increment () {
        setCount(count + 1);
    }
    function decrement () {
        setCount(count - 1);
    }
  return (
    <div>
        {count}, {name}
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
    </div>
  )
}

export default PracticeState